export interface IProduct{
    id: number | string;
    title: string;
    price:number;
    description: string;
    inCart?: boolean;
}

export interface ICart{
    id: number | string;
    title: string;
    price:number;
    description: string;
    quantity:number;
}

export interface IState{
    products: IProduct[] | [];
    cart: ICart[] | [];
}
