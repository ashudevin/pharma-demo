import { combineReducers } from 'redux';
import { getProductsReducer, getProductDetailsReducer } from '../redux/reducers/productReducers';
import cartReducer from './cartReducer';

// Basic reducer function
const initialState = {
  products: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  cart: cartReducer
});

export default rootReducer; 