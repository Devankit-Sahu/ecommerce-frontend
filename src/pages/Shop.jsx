import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Loader,
  ProductGrid,
  ProductList,
  NoResultFound,
  ProductFilter,
  PaginationComp,
} from "../components";
import TocIcon from "@mui/icons-material/Toc";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { getAllProductsAction } from "../redux/features/product/allProductsAction";
import { useParams } from "react-router-dom";

const Shop = () => {
  const {
    loading,
    products,
    totalPage,
    productPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [showList, setShowList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState([0, 200000]);

  const dispatch = useDispatch();
  const { key, category } = useParams();
  useEffect(() => {
    if (category) {
      categories.push(category);
    }
    dispatch(getAllProductsAction({ key, price, categories, page }));
  }, [dispatch, key, price, categories, page]);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="flex justify-between relative">
            {/* Filter component */}
            <ProductFilter
              price={price}
              setPrice={setPrice}
              categories={categories}
              setCategories={setCategories}
            />

            {loading ? (
              <div className="w-[75%] flex justify-center">
                <Loader content={"Fetching products please wait"} />
              </div>
            ) : (
              <>
                {filteredProductsCount !== 0 ? (
                  <div className="w-full md:w-[75%] ">
                    <div className="w-full px-10 flex items-center justify-end py-3 border-b border-[#d3d0d0]">
                      <div>
                        <button
                          type="button"
                          className={`p-2 text-gray-500 border border-violet-400 ml-3 ${
                            showGrid && " bg-[#1976d2] text-white"
                          }`}
                          onClick={() => {
                            setShowGrid(true);
                            setShowList(false);
                          }}
                        >
                          <span className="sr-only">View grid</span>
                          <GridViewOutlinedIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          className={`p-2 text-gray-500 border border-violet-400 ml-3 ${
                            showList && " bg-[#1976d2] text-white"
                          }`}
                          onClick={() => {
                            setShowGrid(false);
                            setShowList(true);
                          }}
                        >
                          <span className="sr-only">View list</span>
                          <TocIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-white">
                      <div className="mx-10">
                        <div
                          className={`${
                            showGrid ? "grid" : "hidden"
                          } mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8`}
                        >
                          {products.map((product, index) => (
                            <div key={index}>
                              <ProductGrid product={product} />
                            </div>
                          ))}
                        </div>
                        <div
                          className={`${
                            showList ? "grid grid-cols-1" : "hidden"
                          } mt-6`}
                        >
                          {products.map((product, index) => (
                            <div key={index}>
                              <ProductList product={product} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* pagination component */}
                    <PaginationComp
                      page={page}
                      filteredProductsCount={filteredProductsCount}
                      productPerPage={productPerPage}
                      totalPage={totalPage}
                      setPage={setPage}
                    />
                  </div>
                ) : (
                  <div className="md:col-span-3">
                    <NoResultFound />
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Shop;
