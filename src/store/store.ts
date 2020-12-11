import {useState, useEffect} from 'react';

interface IProduct{
    id: number;
    title: string;
    price:number;
    description: string;
    inCart: boolean;
}

interface ICart{
    id: number;
    title: string;
    price:number;
    description: string;
    quantity:number;
}
export interface IState{
    products: IProduct[] | [];
    cart: ICart | [];
}

let globalState: any = {};
let listeners:any = [];
let actions:any = {};

export const useStore = () => {
    const [,setState] = useState(globalState);
    const dispatch = (actionIdentifier:any, payload:any) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};

        for(const listener of listeners){
            listener(globalState);
        }
    };

    useEffect(() => {
        listeners.push(setState);

        return () => {
            listeners = listeners.filter((li:any) => li !== setState);
        };
    }, [setState]);

    return [globalState, dispatch];
}

export const initStore = (userActions:any, initialState: IState) => {
    if(initialState){
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions,...userActions};
}