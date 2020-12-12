import {initStore} from './store';
import {ICart, IProduct, IState} from '../types/index';


const configureStore = () => {
    const actions = {
        SET_PRODUCTS: (curState: IState, productsList: IProduct[]) => {
            return {...curState, products: productsList}
        },
        SET_PRODUCT: (curState: IState, product: IProduct) => {
            return {...curState, products: [...curState.products,product]}
        },
        EDIT_PRODUCT: (curState: any, editedProduct: IProduct) => {
            const updatedProducts = curState.products.map((product: IProduct) => {
                if (product.id === editedProduct.id) {
                  product.title = editedProduct.title;
                  product.price = editedProduct.price;
                  product.description = editedProduct.description;
                }
                return product;
              });
              return {...curState, products: updatedProducts}
        },
        DELETE_PRODUCT: (curState: IState, deletedProductId: string ) => {
            const updatedProducts = curState.products.filter((product: IProduct) => {
                return product.id !== deletedProductId;
              });
              return {...curState, products: updatedProducts}
        },
        ADD_TO_CART: (curState: IState, cartList: ICart[]) => {
            return {...curState, cart: [...curState.cart, ...cartList]}
        },
        REMOVE_FROM_CART: (curState: IState, id: string | number) => {
            const updatedProducts = curState.cart.filter((product: ICart) => {
                return product.id !== id;
              });
              return {...curState, cart: updatedProducts}
        },
        INCREASE_QUANTITY: (curState: any, id: string | number)=>{
            const updatedProducts = curState.cart.map((product: ICart) => {
                if (product.id === id) {
                   product.quantity += 1;
                  }
               return product;
              });

            return {...curState, cart: updatedProducts}
        },
        DEACREASE_QUANTITY: (curState: any, id: string | number)=>{
            const updatedProducts = curState.cart.map((product: ICart) => {
                if (product.id === id){
                    product.quantity -= 1;
                };
                return product;
              });
            
            return {...curState, cart: updatedProducts}
        }
     }
    initStore(actions, {products: [], cart:[]});
}

export default configureStore;