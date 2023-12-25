import React, { useEffect } from "react";
import { AllProducts } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allCategoriesAction } from "../redux/features/admin/categoryActions";
const HomePage = () => {
  const { categories } = useSelector((state) => state.allcat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategoriesAction());
  }, [dispatch]);

  return (
    <>
      <div className="flex max-w-7xl mx-auto justify-evenly items-center bg-[#f0f0f0] my-10">
        {categories?.map((cat, idx) => (
          <Link to={`/products/${cat.categoryName}`} key={idx}>
            <div className="py-5 cursor-pointer">
              <div className="w-[4rem]">
                <img
                  className="w-full h-full object-cover mix-blend-darken"
                  src={cat.categoryImage.url}
                  alt=""
                />
              </div>
              <p className="mt-2 capitalize text-black font-semibold tracking-[1px]">
                {cat.categoryName}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <AllProducts />
    </>
  );
};

export default HomePage;
