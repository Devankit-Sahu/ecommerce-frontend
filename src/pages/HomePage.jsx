import React, { useEffect } from "react";
import { AllProducts, Categories } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allCategoriesAction } from "../redux/features/admin/categoryActions";
import Banner from "../components/Banner";

const HomePage = () => {
  // const { categories } = useSelector((state) => state.allcat);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(allCategoriesAction());
  // }, [dispatch]);

  return (
    <>
      <Banner />
      <AllProducts />
    </>
  );
};

export default HomePage;
