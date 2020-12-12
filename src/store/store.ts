import {useState, useEffect} from 'react';
import {IState} from '../types/index';


let globalState:any = {};
let listeners: any = [];
let actions:any = {};

export const useStore = () => {
    const [,setState] = useState(globalState);
    const dispatch = (actionIdentifier: string, payload: object) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};

        for(const listener of listeners){
            listener(globalState);
        }
    };

    useEffect(() => {
        listeners.push(setState);

        return () => {
            listeners = listeners.filter((li: any) => li !== setState);
        };
    }, [setState]);

    return [globalState, dispatch];
}

export const initStore = (userActions: object, initialState: IState) => {
    if(initialState){
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions,...userActions};
}