import { cursorTo } from 'readline';
import {initStore} from './store';



const configureStore = () => {
    const actions = {
        SET_PRODUCTS: (curState:any, productsList: any) => {
            return {...curState, products: productsList}
        },
        SET_PRODUCT: (curState:any, product:any) => {
            return {...curState, products: [...curState.products,product]}
        },
        EDIT_PRODUCT: (curState:any, editedProduct:any) => {
            const updatedProducts = curState.products.map((product: any) => {
                if (product.id === editedProduct.id) {
                  product.title = editedProduct.title;
                  product.price = editedProduct.price;
                  product.description = editedProduct.description;
                }
                return product;
              });
              return {...curState, products: updatedProducts}
        },
        DELETE_PRODUCT: (curState: any, deletedProductId: string ) => {
            const updatedProducts = curState.products.filter((product: any) => {
                return product.id !== deletedProductId;
              });
              return {...curState, products: updatedProducts}
        },
        ADD_TO_CART: (curState:any, cartList:any) => {
            return {...curState, cart: cartList}
        },
        REMOVE_FROM_CART: (curState:any, id: string) => {
            const updatedProducts = curState.cart.filter((product: any) => {
                return product.id !== id;
              });
              return {...curState, cart: updatedProducts}
        }
     }
    initStore(actions, {products: [], cart:[]});
}

export default configureStore;