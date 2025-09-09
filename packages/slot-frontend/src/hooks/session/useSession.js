import {useContext} from "react";
import {SessionContext} from "../../provider/SessionContext";

export const useSession = () => useContext(SessionContext);