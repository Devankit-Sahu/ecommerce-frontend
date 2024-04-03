import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div key={product._id} className="group relative">
          <Link to={`/product/${product._id}`}>
            <div className="w-full h-80 overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75">
              <img
                src={product?.images[0]?.url}
                alt="product-preview"
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <h3 className="text-sm text-gray-700">{product.name}</h3>
              <p className="text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProductList;
