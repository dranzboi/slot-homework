const KEY = "session-id";

export function useSessionStorage() {
    return {
        get: () => localStorage.getItem(KEY),
        saveSession: val => localStorage.setItem(KEY, val),
        removeSession: () => localStorage.removeItem(KEY)
    }
}