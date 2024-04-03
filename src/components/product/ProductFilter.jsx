import Slider from "@mui/material/Slider";

const ProductFilter = ({
  price,
  setPrice,
  categories,
  setCategories,
  allCategories,
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
      <h2 className="p-2 text-gray-800 hover:text-gray-700 font-medium">
        Filters
      </h2>
      <div className="w-full border-b border-[#b2b1b1] px-2">
        <h3 className="font-medium text-gray-900 border-b-[1px] border-solid border-b-[rgb(204,204,204)] py-2">
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
