import * as actionTypes from "../constants/productConstants";
import productsData from "../../Data/allProductsData";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    // Use static data instead of API call
    const data = productsData;

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    // Find product from static data
    const product = productsData.find(p => p.id === id);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: product,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};
