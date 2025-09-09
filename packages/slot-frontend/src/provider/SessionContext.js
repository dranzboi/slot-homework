import {createContext} from 'react';

export const EMPTY_SESSION_STATE =  {
    id: null,
    balance: 0
};

export const SessionContext = createContext([
    {...EMPTY_SESSION_STATE},
    
    {
        saveSession: (context) => {},
        removeSession: () => {},
    }
]);