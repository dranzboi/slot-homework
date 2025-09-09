import useAxios from 'axios-hooks'
import {Config} from "../Config";

export function useHttpApiLazy() {
    //TODO move to common layer, later
    const [context, execute] = useAxios(
        {},
        { manual: true }
    );
    
    const makeUrl = url =>  [Config.apiUrl, url].join('')
    
    return [
        {
            //TODO move to separate immediately(not lazy) call hook 
            findSession: id => execute({
                url: makeUrl(`/session/${id}`),
                method: 'Get'
            }).then(r => r?.data),
        
            createSession: (data= {}) => execute({
                url: makeUrl('/session'),
                method: 'POST',
                data
            }).then(r => r?.data),
            
            deleteSession: id => execute({
                url: makeUrl(`/session/${id}`),
                method: 'DELETE'
            }),
    
            roll: (data= {}) => execute({
                url: makeUrl(`/roll`),
                method: 'PUT',
                data
            }).then(r => r?.data),
        },

        context
    ];
}