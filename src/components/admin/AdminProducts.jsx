import { useState } from "react";
import { Box, Button, Stack, Tooltip, Skeleton } from "@mui/material";
import MyTable from "../table/MyTable";
import { productColumns } from "../../constants/constants";
import { Delete, EditOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteProductByAdminMutation,
  useGetProductsByAdminQuery,
} from "../../redux/api/product-api";
import toast from "react-hot-toast";
import CustomDialog from "../dialog/CustomDialog";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsByAdminQuery();
  const [deleteProductMutation] = useDeleteProductByAdminMutation();
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleClickOpen = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const tableData = data?.products?.map((product) => ({
    product_id: product._id,
    name: product.name,
    stock: product.stock,
    price: "₹" + product.price,
    photo: product.images[0].url,
    action: (
      <Stack direction={"row"} alignItems={"center"}>
        <Link to={`/admin/product/edit/${product._id}`}>
          <Tooltip title="Edit" placement="left">
            <EditOutlined />
          </Tooltip>
        </Link>
        <Button onClick={() => handleClickOpen(product._id)}>
          <Tooltip title="Delete" placement="right">
            <Delete />
          </Tooltip>
        </Button>
      </Stack>
    ),
  }));

  const deleteProductHandler = (productId) => {
    if (!productId) return;
    const toastId = toast.loading("product is deleting!!!");
    deleteProductMutation(productId)
      .unwrap()
      .then((res) => toast.success(res.message, { id: toastId }))
      .catch((error) =>
        toast.success(error?.data?.message || "Internal Server Error", {
          id: toastId,
        })
      );
  };

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
              sx={{ fontSize: "10px" }}
            >
              create new product
            </Button>
          </Stack>
          <Box marginBottom={5}>
            <MyTable columns={productColumns} data={tableData} />
          </Box>
        </Box>
      )}
      <CustomDialog
        open={open}
        handleClose={handleClose}
        dialogTitle={"Are you sure do want to delete this product?"}
        deleteProductHandler={() => deleteProductHandler(selectedProductId)}
      />
    </>
  );
};

export default AdminProducts;
