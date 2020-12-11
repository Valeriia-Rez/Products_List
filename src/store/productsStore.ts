import {initStore} from './store';



const configureStore = () => {
    const actions = {
        FETCH_PRODUCTS: (curState:any, productsList: any) => {
            return {...curState, products: productsList}
        },
       
     }
    initStore(actions, {products: []});
}

export default configureStore;