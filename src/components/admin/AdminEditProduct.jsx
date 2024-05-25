import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import { Box, Button, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductByAdminMutation,
  useProductDetailsByAdminQuery,
} from "../../redux/api/product-api";
import toast from "react-hot-toast";
import { useGetCategoriesByAdminQuery } from "../../redux/api/category-api";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 1,
    backgroundColor: "red",
    color: "white",
    height: "25px",
    width: "25px",
    borderRadius: "15px",
  },
}));

const AdminEditProduct = () => {
  const { productId } = useParams();
  const { data, isLoading } = useProductDetailsByAdminQuery(productId);
  const { data: categories } = useGetCategoriesByAdminQuery();
  const [editProductMutate, { isError, error, isLoading: loading, isSuccess }] =
    useEditProductByAdminMutation();
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    seller: "",
  });
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const imageChangehandler = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagesPreview((old) => [...old, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, category, description, price, stock, seller } = productData;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("category", category);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("stock", stock);
    formData.set("seller", seller);
    images.forEach((image) => {
      formData.append("images", image);
    });

    const { data } = await editProductMutate({ productId, formData });
    toast.success(data?.message);
  };

  useEffect(() => {
    if (!isLoading && data && data.product) {
      const product = data.product;
      setProductData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        stock: product.stock,
        seller: product.seller,
      });
      setOldImages(product.images.map((image) => image.url) || []);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || "Internal Server Error");

    if (isSuccess) navigate("/admin/products");
  }, [isError, isSuccess]);

  return (
    <Box className="bg-white p-5">
      <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
        edit Product
      </h2>
      <form onSubmit={handlesubmit} noValidate encType="multipart/form-data">
        <div className="grid md:grid-cols-2 gap-x-5 py-3">
          <div>
            <Input
              label="Product Name"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="text"
              name="name"
              value={productData.name}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="productcat"
            >
              Product category
            </label>
            <select
              name="category"
              onChange={changeHandler}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
            >
              <option value={productData.category}>
                {productData.category}
              </option>
              {categories?.allCategories?.map((cat) => (
                <option value={cat.categoryName} key={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 py-2">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="productdesc"
            >
              Product Description
            </label>
            <textarea
              rows="5"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
              id="productdesc"
              name="description"
              value={productData.description}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-5 py-3">
          <div>
            <Input
              label="Product Price"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="number"
              name="price"
              min={0}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
              value={productData.price}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Input
              label="Product Stock"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="number"
              name="stock"
              min={0}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
              value={productData.stock}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Input
              label="Product Seller"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="text"
              name="seller"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
              value={productData.seller}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="flex gap-3 py-3">
          {oldImages.map((img, index) => (
            <StyledBadge
              badgeContent={<CloseIcon sx={{ fontSize: "15px" }} />}
              key={index}
            >
              <div className=" w-40 h-40 p-4 border-[2px] rounded-xl border-[#eee]">
                <img
                  src={img}
                  className="w-full h-full"
                  alt="product-preview"
                />
              </div>
            </StyledBadge>
          ))}
        </div>
        <div className="py-3">
          <Input
            type="file"
            name="image"
            accept="image/*"
            className="block py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-r file:from-green-500 file:to-green-300 file:border-none file:p-3 file:rounded-full file:text-black file:cursor-pointer"
            multiple
            onChange={imageChangehandler}
          />
        </div>
        <div className="flex gap-3 py-3">
          {imagesPreview?.map((img, index) => (
            <div
              className=" w-40 h-40 p-4 border-[2px] rounded-xl border-[#eee]"
              key={index}
            >
              <img src={img} className="w-full h-full" alt="product-preview" />
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading ? true : false}
        >
          {loading ? "Loading" : "update Product"}
        </Button>
      </form>
    </Box>
  );
};

export default AdminEditProduct;
