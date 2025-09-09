import React, {useState} from "react";
import {Symbols} from "./Symbols";
import {ErrorView} from "./ErrorView";
import '../style/index.css';
import {useStartSession} from "../hooks/application/useStartSession";
import {useRoll} from "../hooks/application/useRoll";
import {useCloseSession} from "../hooks/application/useCloseSession";
import {Balance} from "./Balance";
import {useSession} from "../hooks/session/useSession";

export function App() {
    const [session] = useSession();
    
    const [error, setError] = useState();
    const [createSession, createSessionReq] = useStartSession();
    const [roll, rollReq] = useRoll();
    const [closeSession, closeSessionReq] = useCloseSession();
    
    const startGame = async () => {
        try {
            setError();
            await createSession()
        } catch (e) {
            setError(e);
        }
    };
    const rollSlot = async () => {
        if (session.balance <= 0) {
            return setError("Not enough credits for roll");
        }
        
        try {
            setError();
            
            await roll();
        } catch (e) {
            setError(e);
        }
    };
    const endGame = async () => {
        try {
            setError();
            await closeSession();
        } catch (e) {
            setError(e);
        }
    };
    
    const isRolling = rollReq?.loading;
    // const isLoading = createSessionReq?.loading || rollReq?.loading || closeSessionReq?.loading;
    
    const isStartGameVisible = !session?.id;
    const isRollVisible = !!session?.id;
    const isEndGameVisible = isRollVisible;
    const isButtonDisabled = isRolling;
    
    return (
        <div className="app">
            <Balance isRolling={isRolling} />

            <Symbols roll={rollReq?.data} 
                     isRolling={isRolling} />

            <div className="app-buttons-holder">
                {isStartGameVisible && (
                    <button onClick={startGame}
                            disabled={isButtonDisabled}>Start game</button>
                )}

                {isRollVisible && (
                    <button onClick={rollSlot}
                            disabled={isButtonDisabled}>Roll</button>
                )}

                {isEndGameVisible && (
                    <button onClick={endGame}
                            disabled={isButtonDisabled}>Close game</button>
                )}
            </div>

            <div className="app-info">
                <div>{session?.id}</div>

                {!!error && <ErrorView e={error} />}
            </div>
        </div>
      );
}