export interface IProduct{
    id: string;
    title: string;
    price:number;
    description: string;
    inCart?: boolean;
}

export interface ICartItem{
    id: string;
    title: string;
    price:number;
    description: string;
    quantity:number;
}

export interface IState{
    products: IProduct[];
    cart: ICartItem[];
}
