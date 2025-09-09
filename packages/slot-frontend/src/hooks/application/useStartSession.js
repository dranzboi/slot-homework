import {useHttpApiLazy} from "../useHttpApiLazy";
import {useSession} from "../session/useSession";

export function useStartSession() {
    const [, {saveSession}] = useSession();
    const [{createSession}, context] = useHttpApiLazy();
 
    return [
        () => createSession().then((data) => saveSession(data)),
        context
    ]    
}