import React, { memo } from "react";
import { Box, Skeleton } from "@mui/material";
import AllProducts from "../components/product/AllProducts";
import { useGetProductsUsingProductTypeQuery } from "../redux/api/product-api";

const HomePage = () => {
  const { data: topDeals, isLoading: loadingTopDeals } =
    useGetProductsUsingProductTypeQuery({
      productType: "top deals",
    });
  const { data: featuredProducts, isLoading: loadingFeaturedProducts } =
    useGetProductsUsingProductTypeQuery({ productType: "featured products" });

  return (
    <section className="home min-h-[calc(100vh - 80px)] bg-slate-100 pt-4 pb-5">
      <Box className="px-10 2xl:px-20">
        <Box marginBottom={5}>
          <ProductSection
            title="top deals"
            loading={loadingTopDeals}
            products={topDeals?.products}
          />
        </Box>
        <Box marginBottom={5}>
          <ProductSection
            title="featured products"
            loading={loadingFeaturedProducts}
            products={featuredProducts?.products}
          />
        </Box>
      </Box>
    </section>
  );
};

export default HomePage;

const ProductSection = memo(({ title, loading, products }) => (
  <>
    {loading ? (
      <Box width={"100%"}>
        <Skeleton variant="rectangular" height={50} width={150} />
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 w-full">
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((s, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              animation="wave"
              height={308}
              width={"100%"}
            />
          ))}
        </Box>
      </Box>
    ) : (
      <Box width={"100%"} className="h-fit">
        <h1 className="capitalize mb-5 text-xl sm:text-3xl font-semibold">
          {title}
        </h1>
        <AllProducts products={products} />
      </Box>
    )}
  </>
));
