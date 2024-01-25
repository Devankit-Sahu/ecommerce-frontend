import { useState } from "react";
import Slider from "@mui/material/Slider";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const ProductFilter = ({ price, setPrice, categories, setCategories }) => {
  //   const category = useSelector((state) => state.allcat.categories);

  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    if (event.target.checked) {
      setCategories([...categories, categoryName]);
    } else {
      setCategories(categories.filter((category) => category !== categoryName));
    }
  };

  return (
    <div className="w-full">
      <h2 className="p-2 text-gray-800 hover:text-gray-700 font-medium">
        Filters
      </h2>
      {/* category filter */}
      <div className="w-full border-b border-[#b2b1b1] px-2">
        <h3 className="font-medium text-gray-900 border-b-[1px] border-solid border-b-[rgb(204,204,204)] py-2">
          Category
        </h3>
        <ul className="w-full">
          <li className="flex items-center gap-3 px-2 py-2 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
            <input type="checkbox" name="" id="mens" />
            <label htmlFor="mens">Mens</label>
          </li>
          <li className="flex items-center gap-3 px-2 py-2 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
            <input type="checkbox" name="" id="womens" />
            <label htmlFor="womens">Womens</label>
          </li>
          <li className="flex items-center gap-3 px-2 py-2 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
            <input type="checkbox" name="" id="kids" />
            <label htmlFor="kids">Kids</label>
          </li>
          <li className="flex items-center gap-3 px-2 py-2 hover:bg-[rgb(255,187,56)] transition-all duration-300 ease-in-out">
            <input type="checkbox" name="" id="watches" />
            <label htmlFor="watches">Watches</label>
          </li>
        </ul>

        {/* {category.map((cat, catIndex) => (
              <div
                key={catIndex}
                className="flex items-center my-3 cursor-pointer"
              >
                <input
                  onChange={handleCategoryChange}
                  id={`filter-${cat.categoryName}-${catIndex}`}
                  name={`${cat.categoryName}`}
                  value={`${cat.categoryName}`}
                  checked={categories.includes(cat.categoryName)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`filter-${cat.categoryName}-${catIndex}`}
                  className="ml-3 text-base text-gray-700 capitalize"
                >
                  {cat.categoryName}
                </label>
              </div>
            ))} */}
      </div>

      {/* price filter */}
      <div className="w-full border-b border-[#b2b1b1] px-1 py-4">
        <h3 className="font-medium text-gray-900 mb-4">Price</h3>
        <div className="w-[80%] mx-auto pl-2">
          <Slider
            aria-labelledby="range-slider"
            onChange={priceHandler}
            valueLabelDisplay="auto"
            value={price}
            color="secondary"
            min={0}
            max={30000}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
