import {useSession} from "../hooks/session/useSession";
import {useEffect, useState} from "react";

export function Balance(props) {
    const {
        isRolling = false
    } = props;
    
    const [session] = useSession();
    const [balance, setBalance] = useState(session.balance);
    
    useEffect(() => {
        if (!isRolling || !session?.id) {
            setBalance(session?.balance);
        }
    }, [isRolling, session?.id])
    
    return (
        <div className="balance">
            Balance: {balance}
        </div>
    )
}