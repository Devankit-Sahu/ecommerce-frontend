import { configureStore } from "@reduxjs/toolkit";
import {
  allProductsReducer,
  allProductsWithQueryReducer,
  authReducer,
  allProductsAdminReducer,
  allUsersReducer,
  allCategoriesAdminReducer,
  productDetailReducer,
  allCategoriesReducer,
  // createProductReducer,
  // updateProductAdminReducer,
  // deleteProductReducer,
  // favouritesReducer,
  // updateProfileReducer,
  // addCategoryReducer,
  // userDetailsReducer,
  // deleteCategoryReducer,
} from "./features";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // auth reducer
    products: allProductsReducer, // all products reducer
    productsWithQuery: allProductsWithQueryReducer, // all products with query reducer
    productDetail: productDetailReducer, // product detail reducer
    allCategory:allCategoriesReducer,
    cart: cartReducer, // cart reducer
    allcat: allCategoriesAdminReducer, // all categories reducer (admin)
    adminProducts: allProductsAdminReducer, // all products reducer(admin)
    allUsersAdmin: allUsersReducer, // all users reducer(admin)
    // userDetailsAdmin: userDetailsReducer, // update user role reducer(admin)
    // newProduct: createProductReducer, // add product reducer(admin)
    // updateProduct: updateProductAdminReducer, // update product reducer(admin)
    // deleteProduct: deleteProductReducer, // delete product reducer(admin)
    // favourites: favouritesReducer, // favourites reducer
    // updateProfile: updateProfileReducer, // all prducts reducer
    // addCat: addCategoryReducer, // all prducts reducer

    // deleteCat: deleteCategoryReducer, // delete category reducer(admin)
  },
});

export default store;
