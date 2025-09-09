import {useHttpApiLazy} from "../useHttpApiLazy";
import {useSession} from "../session/useSession";
import {useRef, useState} from "react";
import {Config} from "../../Config";

const STOP_TIME = Config.symbolStopTime;
const SLOT_SIZE = Config.slotSize;

export function useRoll() {
    const [state, setState] = useState({
        isRolling: false,
        symbolReadiness: 0
    });
    const timer = useRef();
    
    const [{id: sessionId}, {saveSession}] = useSession();
    const [{roll}, context] = useHttpApiLazy();
    
    return [
        async () => {
            if (!sessionId) {
                return;
            }
            
            try {
                clearInterval(timer.current);
             
                setState({
                    isRolling: true,
                    symbolReadiness: 0
                });
                    
                const res = await roll({sessionId}).then((res) => {
                    saveSession({id: sessionId, balance: res.balance});

                    return res
                }).catch(e => {
                    if (e.status === 400) {
                        //cause translation
                        throw new Error("Not enough credits for roll");
                    }
                });

                timer.current = setInterval(() => {
                    setState((state) => {
                        const symbolReadiness = state.symbolReadiness + 1;
                        const shouldStop = symbolReadiness >= SLOT_SIZE;

                        shouldStop && clearInterval(timer.current);
                        
                        return {
                            isRolling: !shouldStop,
                            symbolReadiness,
                        };                        
                    })
                }, STOP_TIME);
                
                return res;
            } catch (e) {
                clearInterval(timer.current);
                
                setState({
                    isRolling: false,
                    symbolReadiness: 0
                });
                
                throw e;
            }
        },
        {
            ...context,
            
            data: {
                ...context?.data,
                symbolReadiness: state?.symbolReadiness
            },
            
            loading: state?.isRolling || context?.loading
        }
    ]    
}