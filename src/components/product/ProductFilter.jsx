import Slider from "@mui/material/Slider";
import { Close as CloseIcon } from "@mui/icons-material";

const ProductFilter = ({
  price,
  setPrice,
  categories,
  setCategories,
  allCategories,
  closeHandler = () => {},
}) => {
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
      <div className="flex items-center justify-between border-b-[1px] border-solid border-b-slate-200">
        <h2 className="text-gray-800 hover:text-gray-700 font-medium">
          Filters
        </h2>
        <span
          className="bg-gray-300 rounded-full p-1 flex items-center justify-center md:hidden"
          onClick={closeHandler}
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </span>
      </div>
      <div>
        <h3 className="font-medium text-gray-900 border-b-[1px] border-solid border-b-slate-200 py-2">
          Category
        </h3>
        <ul className="w-full">
          {allCategories?.map((cat) => (
            <li key={cat._id} className="flex items-center gap-3 px-2 py-2">
              <input
                type="checkbox"
                name={cat?.categoryName}
                id={cat?.categoryName}
                value={cat?.categoryName}
                onChange={handleCategoryChange}
              />
              <label htmlFor={cat?.categoryName}>{cat?.categoryName}</label>
            </li>
          ))}
        </ul>
      </div>
      {/* price filter */}
      <div className="w-full px-1 py-4">
        <h3 className="font-medium text-gray-900 mb-4 border-b-[1px] border-solid border-b-slate-200">
          Price
        </h3>
        <div className="w-[80%] mx-auto pl-2">
          <Slider
            aria-labelledby="range-slider"
            onChange={priceHandler}
            valueLabelDisplay="auto"
            value={price}
            color="secondary"
            min={0}
            max={300000}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
