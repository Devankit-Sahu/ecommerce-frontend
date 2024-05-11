import React, { useEffect } from "react";
import { Box, Button, Stack, Tooltip, Skeleton } from "@mui/material";
import MyTable from "../table/MyTable";
import { productColumns } from "../../data/data";
import { Delete, EditOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteProductByAdminMutation,
  useGetProductsByAdminQuery,
} from "../../redux/api/product-api";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsByAdminQuery();
  const [deleteProductMutation, { isSuccess, isError, error }] =
    useDeleteProductByAdminMutation();

  const tableData = data?.products?.map((product) => ({
    product_id: product._id,
    name: product.name,
    stock: product.stock,
    price: product.price,
    photo: product.images[0].url,
    action: (
      <Stack direction={"row"} alignItems={"center"}>
        <Link to={`/admin/product/edit/${product._id}`}>
          <Tooltip title="Edit" placement="left">
            <EditOutlined />
          </Tooltip>
        </Link>
        <Button onClick={() => deleteProductHandler(product._id)}>
          <Tooltip title="Delete" placement="right">
            <Delete />
          </Tooltip>
        </Button>
      </Stack>
    ),
  }));
  let toastId;

  const deleteProductHandler = async (productId) => {
    if (!productId) return;
    toastId = toast.loading("product is deleting..");
    await deleteProductMutation(productId);
  };

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || "Internal Server Error");
    if (isSuccess) {
      toast.success("product deleted", { id: toastId });
    }
  }, [isError, isSuccess]);

  return isLoading ? (
    <Box>
      <Skeleton height={100} animation="pulse" />
      <Skeleton height={100} animation="pulse" />
      <Skeleton height={100} animation="pulse" />
    </Box>
  ) : (
    <>
      {data?.products?.length > 0 && (
        <Box className="bg-white p-5">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginBottom={3}
          >
            <h2 className="text-2xl font-bold text-[#8f9297] capitalize">
              Products
            </h2>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/product/create")}
            >
              create new product
            </Button>
          </Stack>
          <Box marginBottom={5}>
            <MyTable columns={productColumns} data={tableData} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AdminProducts;
