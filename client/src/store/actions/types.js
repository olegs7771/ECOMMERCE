//GET COOKIES IN REDUX
export const SET_COOKIE = 'SET_COOKIE';

//LOADING
export const LOADING = 'LOADING';
export const LOADING_ITEM_CATEGORY = 'LOADING_ITEM_CATEGORY';
export const LOADING_FORM_PRODUCT = 'LOADING_FORM_PRODUCT';
export const LOADING_PRODUCTS = 'LOADING_PRODUCTS';
export const LOADING_PRODUCT_CART = 'LOADING_PRODUCTS_CART';

// DRAWER
export const DRAWER_OPEN = 'DRAWER_OPEN';

//API MESSAGES
export const GET_API_MESSAGE = 'GET_API_MESSAGE';
export const GET_API_MESSAGE_CATEGORY = 'GET_API_MESSAGE_CATEGORY';

export const CLEAR_API_MESSAGE = 'CLEAR_API_MESSAGE';
// API ERRORS
export const GET_API_ERRORS = 'GET_API_ERRORS';
export const GET_API_ERROR_MESSAGE = 'GET_API_ERROR_MESSAGE';

export const CLEAR_API_ERROR = 'CLEAR_API_ERROR';

// Auth
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_OUT_USER = 'CLEAR_OUT_USER';

//CATEGORY
export const GET_CATEGORIES_LIST = 'GET_CATEGORIES_LIST';
export const GET_CATEGORY = 'GET_CATEGORY';

//SUB CATEGORY
export const GET_SUB_LIST = 'GET_SUB_LIST'; //by categoryId
export const GET_SUB_ALL = 'GET_SUB_ALL'; //get all existing for quantity

//PRODUCT
export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_PRODUCT_OBJECT = 'GET_PRODUCT_OBJECT';
export const GET_PRODUCT_ALL = 'GET_PRODUCT_ALL'; //get all existing for quantity
export const GET_PRODUCTS_FROM_CART = 'GET_PRODUCTS_FROM_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
