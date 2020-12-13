import {useState, useEffect} from 'react';
import {IState} from '../types/index';


let globalState: any = {};
let listeners: Array<IListener> = [];
let actions: any = {};
//Find out what is the proper typings should be here
interface IListener {
    (argument: any): void
};

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
            listeners = listeners.filter((li: IListener) => li !== setState);
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