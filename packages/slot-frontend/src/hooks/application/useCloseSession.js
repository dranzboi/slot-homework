import {useHttpApiLazy} from "../useHttpApiLazy";
import {useSession} from "../session/useSession";

export function useCloseSession() {
    const [session, {removeSession}] = useSession();
    
    const [{deleteSession}, context] = useHttpApiLazy();
 
    return [
        () => session?.id && deleteSession(session?.id).then(() => removeSession()),
        context
    ]    
}