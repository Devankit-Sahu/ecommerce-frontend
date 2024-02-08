import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Loader,
  ProductList,
  ProductFilter,
  PaginationComp,
} from "../components";
import {
  getAllCategoriesAction,
  getAllProductsWithQueryAction,
} from "../redux/api/product-api";
import { useParams } from "react-router-dom";

const Shop = () => {
  const {
    loading,
    products,
    totalPages,
    productPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.productsWithQuery);
  const { allCategories } = useSelector((state) => state.allCategory);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState([0, 300000]);
  const dispatch = useDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllProductsWithQueryAction({ key, price, categories, page }));
  }, [dispatch, categories, key, price, page]);

  return (
    <div className="container mx-auto px-2 2xl:px-40">
      <div className="grid grid-cols-1 md:grid-cols-200 lg:grid-cols-300 gap-5">
        <div className="hidden md:block">
          <ProductFilter
            price={price}
            setPrice={setPrice}
            categories={categories}
            allCategories={allCategories}
            setCategories={setCategories}
          />
        </div>
        <div className="mt-5 ">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <ProductList products={products} />
          </div>
          {/* pagination */}
          <PaginationComp
            page={page}
            filteredProductsCount={filteredProductsCount}
            productPerPage={productPerPage}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
