import allProductsReducer from "./product/allProductsSlice";
import authReducer from "./auth/authSlice";
import productDetailReducer from "./product/productDetailSlice";
import allProductsAdminReducer from "./admin/allProductsAdminSlice";
import createProductReducer from "./admin/createProductSlice";
import updateProductAdminReducer from "./admin/updateProductSlice";
import allUsersReducer from "./admin/allUsersSlice";
import cartReducer from "./cart/cartSlice";
import favouritesReducer from "./favourites/favouritesSlice";
import deleteProductReducer from "./admin/deleteProductSlice";
import updateProfileReducer from "./profile/updateProfileSlice";
import addCategoryReducer from "./admin/addCategorySlice";
import allCategoriesReducer from "./admin/allCategoriesSlice";
import userDetailsReducer from "./admin/userDetailsSlice";
import deleteCategoryReducer from "./admin/deleteCategorySlice";

export {
  allProductsReducer,
  allCategoriesReducer,
  authReducer,
  productDetailReducer,
  allProductsAdminReducer,
  createProductReducer,
  updateProductAdminReducer,
  updateProfileReducer,
  allUsersReducer,
  cartReducer,
  favouritesReducer,
  deleteCategoryReducer,
  deleteProductReducer,
  addCategoryReducer,
  userDetailsReducer,
};
