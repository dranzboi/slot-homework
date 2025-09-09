import React from "react";
import {useRollSymbols} from "../hooks/useRollSymbols";


export function Symbols(props) {
    const {
        isRolling = false,
        roll = {}
    } = props;
    
    const symbols = useRollSymbols(isRolling, roll);
    
    return (
        <div className="symbols">
            <div className="row">
                {symbols.map((symbol, i) => (
                    <div className="col"
                        key={i + 'key'}>
                        {symbol}
                    </div>
                ))}
            </div>
        </div>
    );
}