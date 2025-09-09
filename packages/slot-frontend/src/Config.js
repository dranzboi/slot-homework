import {clamp} from "./utils/math";

export const Config = {
    apiUrl: process.env.REACT_APP_API_URL,
    symbolSwapTime: parseInt(process.env.REACT_APP_SYMBOL_SWAP_TIME),
    symbolStopTime: parseInt(process.env.REACT_APP_SYMBOL_STOP_TIME),
    slotSize: clamp(parseInt(process.env.REACT_APP_SLOT_SIZE), 1, 4)
}