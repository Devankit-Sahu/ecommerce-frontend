import React from "react";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import MyTable from "../table/MyTable";
import { productColumns } from "../../data/data";
import { Delete, EditOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();
  const products = [
    {
      _id: 1,
      name: " Fold Over Collar Plain Blazers",
      stock: 10,
      price: 1000,
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const data = products?.map((product) => ({
    product_id: product._id,
    name: product.name,
    stock: product.stock,
    price: product.price,
    photo: product.url,
    action: (
      <Stack direction={"row"} alignItems={"center"}>
        <Link to={`/admin/product/edit/${product._id}`}>
          <EditOutlined />
        </Link>
        <Button>
          <Tooltip title="Delete">
            <Delete />
          </Tooltip>
        </Button>
      </Stack>
    ),
  }));

  return (
    <>
      {products?.length > 0 && (
        <Box className="bg-white p-5">
          <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
            Products
          </h2>
          <Box marginBottom={5}>
            <MyTable columns={productColumns} data={data} />
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/product/create")}
          >
            create new product
          </Button>
        </Box>
      )}
    </>
  );
};

export default AdminProducts;
