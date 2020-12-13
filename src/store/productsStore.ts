import {initStore} from './store';
import {ICartItem, IProduct, IProductList, IState} from '../types/index';


const configureStore = () => {
    const actions = {
        SET_PRODUCTS: (curState: IState, productsList: IProductList) => {
            return {...curState, products: productsList.products,totalProductsCount: productsList.totalProductsCount ||  curState.totalProductsCount }
        },
        SET_PRODUCT: (curState: IState, product: IProduct) => {
            return {...curState, products: [...curState.products,product]}
        },
        EDIT_PRODUCT: (curState: IState, editedProduct: IProduct) => {
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
        ADD_TO_CART: (curState: IState, cartList: ICartItem[]) => {
            return {...curState, cart: [...curState.cart, ...cartList]}
        },
        REMOVE_FROM_CART: (curState: IState, id: string) => {
            const updatedProducts = curState.cart.filter((product: ICartItem) => {
                return product.id !== id;
              });
              return {...curState, cart: updatedProducts}
        },
        INCREASE_QUANTITY: (curState: IState, id: string)=>{
            const updatedProducts = curState.cart.map((product: ICartItem) => {
                if (product.id === id) {
                   product.quantity += 1;
                  }
               return product;
              });

            return {...curState, cart: updatedProducts}
        },
        DEACREASE_QUANTITY: (curState: IState, id: string)=>{
            const updatedProducts = curState.cart.map((product: ICartItem) => {
                if (product.id === id){
                    product.quantity -= 1;
                };
                return product;
              });
            
            return {...curState, cart: updatedProducts}
        }
     }
    initStore(actions, {products: [], totalProductsCount: 0, cart:[]});
}

export default configureStore;