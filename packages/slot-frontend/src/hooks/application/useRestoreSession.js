import {useHttpApiLazy} from "../useHttpApiLazy";
import {useEffect} from "react";
import {EMPTY_SESSION_STATE} from "../../provider/SessionContext";

export function useRestoreSession(id, callback = () => {}) {
    const [{findSession}, context] = useHttpApiLazy();
 
    useEffect(() => {
        if (id) {
            findSession(id).then(session => {
                callback(session)
            }).catch(error => {
                //remove wrong id
                callback({...EMPTY_SESSION_STATE});
            });
        }
    }, [id]);
    
    return context;
}