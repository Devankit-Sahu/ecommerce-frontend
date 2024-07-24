import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AllProducts = ({ products = [] }) => {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, index) => (
        <Box
          key={index}
          className="bg-white cursor-pointer transform border border-[rgba(229,231,235,1)] transition-all duration-200 hover:translate-y-0.5 hover:shadow"
        >
          <Link to={`/product/${product._id}`}>
            <Box className="h-48">
              <img
                loading="lazy"
                src={product?.images[0]?.url}
                alt=""
                className="w-full h-full object-contain"
              />
            </Box>
          </Link>
          <Stack padding={3}>
            <h3 className="cursor-pointer truncate text-xs text-[rgba(107,114,128,1)] md:text-sm">
              {product.name}
            </h3>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginTop={2}
            >
              <h4>₹ {product.price}</h4>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default AllProducts;
