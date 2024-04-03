import React, { useState } from "react";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import Input from "../input/Input";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  //   const dispatch = useDispatch();
  // const navigate = useNavigate();

  const categoryImageChange = (e) => {
    if (e.target.name === "categoryImage") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCategoryImage(reader.result);
        }
      };
    }
  };

  const deleteCatHandler = (id) => {};

  async function handlesubmit(e) {
    e.preventDefault();
  }
  const categories = [{ _id: 1, categoryName: "Mobile" }];
  return (
    <Box className="bg-white p-5">
      <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
        category
      </h2>
      <Box marginBottom={5}>
        {categories.length > 0 &&
          categories.map((cat, index) => (
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
      <form onSubmit={handlesubmit} noValidate encType="multipart/form-data">
        <Input
          label={"add category"}
          labelClassName={
            "block text-xl font-medium leading-6 text-gray-900 mb-5"
          }
          type={"text"}
          id={"catname"}
          name={"catname"}
          className={
            "border-[1.5px] border-[#bebebe] mb-5 rounded-md px-2 py-1"
          }
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AdminCategories;
