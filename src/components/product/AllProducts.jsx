import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "@mui/icons-material";

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
              <button className="w-8 h-8 flex items-center justify-center border-[1px] border-solid border-[rgb(239,239,239)] rounded hover:bg-[rgba(1,159,127,1)] text-[rgba(1,159,127,1)] hover:text-white transition-colors">
                <AddIcon fontSize="small" />
              </button>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default AllProducts;
