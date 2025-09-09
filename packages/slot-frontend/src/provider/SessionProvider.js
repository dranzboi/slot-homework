import {EMPTY_SESSION_STATE, SessionContext} from "./SessionContext";
import {useSessionStorage} from "../hooks/session/useSessionStorage";
import {useState} from "react";
import {useRestoreSession} from "../hooks/application/useRestoreSession";
import {Loader} from "../components/Loader";

export const SessionProvider = ({children}) => {
    const {get, saveSession, removeSession: deleteSession} = useSessionStorage();
    
    const [state, setState] = useState({
        id: get(),
        balance: 0,
    });
    
    const actions = {
        saveSession: (context) => {
            saveSession(context?.id);
            setState(context);
        },
        
        removeSession: () => {
            deleteSession();
            setState({...EMPTY_SESSION_STATE});
        }
    }
    
    const {loading} = useRestoreSession(get(), session => {
        actions.saveSession(session)
    });
    
    const isLoading = loading
    
    return (
        <SessionContext.Provider value={[state, actions]}>
            {isLoading ? <Loader /> : children}
        </SessionContext.Provider>
    );
};
