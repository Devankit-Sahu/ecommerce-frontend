import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favItems: localStorage.getItem("favItem")
    ? JSON.parse(localStorage.getItem("favItem"))
    : [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    addFavItems(state, action) {
      const item = action.payload;
      const isItemExist = state.favItems.find(
        (i) => i.favItemId === item.favItemId
      );
      if (isItemExist) {
        return {
          ...state,
          favItems: state.favItems.map((i) =>
            i.favItemId === isItemExist.favItemId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          favItems: [...state.favItems, item],
        };
      }
    },
    removeFavItems(state, action) {
      return {
        ...state,
        favItems: state.favItems.filter((i) => i.favItemId !== action.payload),
      };
    },
  },
});

export const { addFavItems, removeFavItems } = favouritesSlice.actions;
export default favouritesSlice.reducer;
