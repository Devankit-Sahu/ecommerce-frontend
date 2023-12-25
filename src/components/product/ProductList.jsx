import { Link } from "react-router-dom";
const ProductList = ({ product }) => {

  return (
    <Link to={`/product-detail/${product._id}`}>
      <div className="border border-gray-400 h-[250px] flex gap-x-2 p-4 mt-6 rounded-xl cursor-pointer hover:text-blue-400">
        <div className="flex-[.4] gap-5">
          <img
            src={product.images[0].url}
            alt="product-preview"
            className="h-full w-full rounded-xl object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="flex-[.4] px-4">
          <h2 className="font-semibold mb-2">{product.name}</h2>
          <p className="text-black">{product.description}</p>
        </div>
        <div className="flex-[.1]">
          <h1 className="text-black font-semibold text-xl">${product.price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
