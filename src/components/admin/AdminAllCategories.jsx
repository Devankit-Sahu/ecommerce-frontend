import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getCategoriesAdminAction,
} from "../../redux/api/admin-api";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { isDeletedReset } from "../../redux/features/admin/deleteCategorySlice";
import { addCategoryAction } from "../../redux/api/admin-api";
import Loader from "../Loader";
import { isCreatedReset } from "../../redux/features/admin/addCategorySlice";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminAllCategories = () => {
  const { categories, loading } = useSelector((state) => state.allcat);
  // const { message, isDeleted } = useSelector((state) => state.deleteCat);
  // const { error, isCreated } = useSelector((state) => state.addCat);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const deleteCatHandler = (id) => {
    // dispatch(deleteCategoryAction(id));
  };

  async function handlesubmit(e) {
    e.preventDefault();
    // dispatch(addCategoryAction({ categoryName, categoryImage }));
  }

  useEffect(() => {
    // if (isDeleted) {
    //   dispatch(isDeletedReset());
    //   toast.success(message);
    // }
    // if (error) {
    //   toast.error(error, { position: "top-right" });
    // }
    // if (isCreated) {
    //   toast.success("Category Added !!!", { position: "top-right" });
    //   dispatch(isCreatedReset());
    // }
    // navigate("/admin/category/all");
    dispatch(getCategoriesAdminAction());
  }, [dispatch]);

  return (
    <>
      {/* {loading ? (
        <div className="h-full max-w-7xl mx-auto">
          <Loader content={"loading all categories"} />
        </div>
      ) : ( */}
      <div className="w-full min-h-full px-10">
        <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#8f9297] border-b border-b-[#ced0d5] capitalize">
          category
        </h2>
        <div className="flex">
          <div className="w-[50%]">
            {categories.length > 0
              ? categories.map((cat, index) => (
                  <div
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-200 my-3 rounded w-[500px] gap-x-11 p-4 border border-gray-300"
                    key={index}
                  >
                    <p className="capitalize">{cat.categoryName}</p>
                    <button
                      onClick={() => deleteCatHandler(cat._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))
              : "No categories"}
          </div>
          <div className="w-[50%]">
            <form
              onSubmit={handlesubmit}
              noValidate
              encType="multipart/form-data"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="border border-gray-300 p-5 rounded-lg">
                  <div className="flex flex-col justify-center mb-3">
                    <label
                      className=" w-full font-semibold capitalize mb-2"
                      htmlFor="catname"
                    >
                      Add new category
                    </label>
                    <input
                      className="bg-transparent border-2 border-[#d5d0d0] rounded-xl h-9 focus:outline-purple-700 px-1"
                      type="text"
                      id="catname"
                      name="catname"
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar src={categoryImage} />
                    <input
                      id="categoryImage"
                      name="categoryImage"
                      type="file"
                      accept="image/*"
                      className="block w-full py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:border-none file:p-3 file:rounded-full file:text-white file:cursor-pointer"
                      onChange={categoryImageChange}
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <Button type="submit" variant="contained">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default AdminAllCategories;
