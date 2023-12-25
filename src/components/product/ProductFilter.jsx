import { useState } from "react";
import Slider from "@mui/material/Slider";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const ProductFilter = ({ price, setPrice, categories, setCategories }) => {
  const category = useSelector((state) => state.allcat.categories);
  const [showFilter, setShowFilter] = useState(false);
  const [isOpenCat, setIsOpenCat] = useState(false);

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
    <>
      <span
        className="cursor-pointer absolute left-0 top-[2%] md:hidden"
        onClick={() => setShowFilter(true)}
      >
        <MenuOutlinedIcon />
      </span>
      <div
        className={`w-[24%] bg-white absolute z-50 ${
          showFilter ? " left-0" : " left-[-270px]"
        } md:relative md:left-0 transition-all ease-in duration-[.4]`}
      >
        <div className="w-full flex items-center justify-between my-3 py-2 border-b border-[#d3d0d0] px-4 md:px-0">
          <span className="p-2 text-gray-800 hover:text-gray-700 font-medium">
            Filters
          </span>
          <span
            className="cursor-pointer inline-block md:hidden"
            onClick={() => {
              setShowFilter(false);
            }}
          >
            <CloseIcon />
          </span>
        </div>

        {/* category filter */}
        <div className="w-full border-b border-[#b2b1b1] py-4 px-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-900">Category</h3>
            <div
              onClick={() => setIsOpenCat((prev) => !prev)}
              className="cursor-pointer"
            >
              {isOpenCat ? <MinimizeIcon /> : <AddIcon />}
            </div>
          </div>
          <div className={isOpenCat ? "block" : "hidden"}>
            {category.map((cat, catIndex) => (
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
            ))}
          </div>
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
    </>
  );
};

export default ProductFilter;
