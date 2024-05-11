import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import Input from "../input/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesByAdminQuery,
} from "../../redux/api/category-api";
import toast from "react-hot-toast";

const AdminCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const { data, refetch } = useGetCategoriesByAdminQuery();
  const [addCategoryMutation, { error, isError }] = useAddCategoryMutation();
  const [deleteCategoryMutation, { error: cerror, isError: isCError }] =
    useDeleteCategoryMutation();

  const deleteCatHandler = async (categoryId) => {
    const { data } = await deleteCategoryMutation(categoryId);
    toast.success(data?.message);
    refetch();
  };

  async function handlesubmit(e) {
    e.preventDefault();
    if (!categoryName) return;
    const { data } = await addCategoryMutation({ categoryName });
    toast.success(data?.message);
    setCategoryName("");
    refetch();
  }

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || "Internal Server Error");
    if (isCError) toast.error(cerror?.data?.message || "Internal Server Error");
  }, [isError, cerror]);

  return (
    <Box className="bg-white p-5">
      <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
        category
      </h2>
      <Box marginBottom={5}>
        {data?.allCategories?.length > 0 &&
          data?.allCategories?.map((cat, index) => (
            <Stack
              direction={"row"}
              key={index}
              className="hover:bg-slate-100 w-fit p-2"
            >
              <p className="capitalize">{cat.categoryName}</p>
              <button
                onClick={() => deleteCatHandler(cat._id)}
                className="text-red-600 hover:text-red-500 ml-10"
              >
                <Tooltip title="Delete">
                  <DeleteIcon />
                </Tooltip>
              </button>
            </Stack>
          ))}
      </Box>
      <form
        className="flex flex-col w-80"
        onSubmit={handlesubmit}
        noValidate
        encType="multipart/form-data"
      >
        <h1 className="block text-xl font-medium leading-6 text-gray-900 mb-5 capitalize">
          add category
        </h1>
        <Input
          type={"text"}
          id={"catname"}
          name={"catname"}
          className={
            "border-[1.5px] border-[#bebebe] mb-5 rounded-md px-2 py-1 w-full"
          }
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <Button className="w-full" type="submit" variant="contained">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AdminCategories;
