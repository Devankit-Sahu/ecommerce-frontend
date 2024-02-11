import React, { useEffect } from "react";
import { AllProducts } from "../components";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import { getAllProductsAction } from "../redux/api/product-api";

const HomePage = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  return (
    <>
      {/* <Banner /> */}
      <AllProducts products={products} />
    </>
  );
};

export default HomePage;
