import {App} from "./App";
import {SessionProvider} from "../provider/SessionProvider";

export function Root() {
    return <SessionProvider>
        <App />
    </SessionProvider>;
}