import {useEffect, useRef, useState} from "react";
import {isValidIndex} from "../utils/array";
import {Config} from "../Config";
import {useSession} from "./session/useSession";

const SWAP_SYMBOL_TIME =  Config.symbolSwapTime > Config.symbolStopTime 
    ? Config.symbolStopTime 
    : Config.symbolSwapTime;

const SLOT_SIZE = Config.slotSize;

const symbols = ["c", "l", "o", "w"];
const winningMap = new Map([
    [10, symbols[0]],
    [20, symbols[1]],
    [30, symbols[2]],
    [40, symbols[3]]
])

const DEFAULT_STATE = Array(SLOT_SIZE).fill('x');

export function useRollSymbols(isRolling, roll) {
    const [session] = useSession();
    const [state, setState] = useState(DEFAULT_STATE);    
   
    const timer = useRef();
    const rollRef = useRef();
    
    rollRef.current = {
        isRolling,
        roll
    };

    useEffect(() => {
        if (isRolling && !timer.current) {
            clearInterval(timer.current);
            
            timer.current = setInterval(() => {
                setState(state => {
                    const {
                        isRolling,
                        roll: {
                            reward,
                            symbolReadiness
                        }
                    } = rollRef.current || {};
                    
                    const index = symbolReadiness - 1;
                    let list;
                    
                    //TODO move to async and separate function
                    while (true) {
                        list = Array.from({length: SLOT_SIZE}, () =>
                            symbols[Math.floor(Math.random() * symbols.length)]
                        );

                        if (!(list[0] === list[1] && list[1] === list[2])) {
                            break
                        }
                    }
                    
                    //TODO move to diff functions
                    if (isValidIndex(list, index)) {
                        for (let i = 0; i <= index; i++) {
                            list[i] = winningMap.has(reward) ? winningMap.get(reward) : state[i];
                        }
                    } 
                    
                    if (!isRolling) {
                        clearInterval(timer.current);
                        timer.current = undefined;
                    }
                    
                    return list;
                })
            }, SWAP_SYMBOL_TIME)
        }
    }, [isRolling])
    
    useEffect(() => {
        if (!session?.id) {
            setState(DEFAULT_STATE);
        }
    }, [session?.id])
    
    return state;
}