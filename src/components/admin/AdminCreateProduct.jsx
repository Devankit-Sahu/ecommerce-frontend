import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";

const AdminCreateProduct = () => {
  const categories = [];
  const [name, setProdName] = useState("");
  const [category, setProdcat] = useState("laptop");
  const [description, setProdDesc] = useState("");
  const [price, setProdPrice] = useState("");
  const [stock, setProdStock] = useState("");
  const [seller, setProdSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    //     const myForm = new FormData();

    //     myForm.set("name", name);
    //     myForm.set("category", category);
    //     myForm.set("description", description);
    //     myForm.set("price", price);
    //     myForm.set("stock", stock);
    //     myForm.set("seller", seller);
    //     images.forEach((image) => {
    //       myForm.append("images", image);
    //     });
    //     dispatch(createProductAdminAction(myForm));
  };

  const imageChangehandler = (e) => {
    //     const files = Array.from(e.target.files);
    //     setImagesPreview([]);
    //     setImages([]);
    //     files.forEach((file) => {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         setImagesPreview((old) => [...old, reader.result]);
    //         setImages((old) => [...old, reader.result]);
    //       };
    //       reader.readAsDataURL(file);
    //     });
  };
  //   useEffect(() => {
  //     if (isCreated) {
  //       navigate("/app/admin/products");
  //       toast.success(message);
  //       dispatch(productCreatedReset());
  //     }
  //   }, [isCreated, navigate, dispatch, message]);

  return (
    <>
      <Box className="bg-white p-5">
        <h2 className="text-2xl mb-6 font-bold text-[#8f9297] capitalize">
          create Product
        </h2>
        <form onSubmit={handlesubmit} noValidate encType="multipart/form-data">
          <div className="grid md:grid-cols-2 gap-x-5 py-2">
            <Input
              label="Product Name"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="text"
              name="productname"
              value={name}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full"
              onChange={(e) => setProdName(e.target.value)}
            />
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="productcat"
              >
                Product category
              </label>
              <select
                name="category"
                onChange={(e) => setProdcat(e.target.value)}
                className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full"
              >
                <option value="">Choose Category</option>
                {categories.map((cat) => (
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
                className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full"
                id="productdesc"
                name="description"
                value={description}
                onChange={(e) => setProdDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5 py-2">
            <Input
              label="Product Price"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="number"
              name="productprice"
              min={0}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full"
              value={price}
              onChange={(e) => setProdPrice(e.target.value)}
            />
            <Input
              label="Product Stock"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="number"
              name="productstock"
              min={0}
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full"
              value={stock}
              onChange={(e) => setProdStock(e.target.value)}
            />
            <Input
              label="Product Seller"
              labelClassName="block text-sm font-medium leading-6 text-gray-900"
              type="text"
              name="productseller"
              className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full"
              value={seller}
              onChange={(e) => setProdSeller(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-1 gap-x-3 py-2"></div>
          <div className="py-2">
            <Input
              type="file"
              name="avatar"
              accept="image/*"
              className="block py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-r file:from-green-500 file:to-green-300 file:border-none file:p-3 file:rounded-full file:text-black file:cursor-pointer"
              multiple
              onChange={imageChangehandler}
            />
          </div>
          <div className="flex justify-center gap-3 py-2">
            {imagesPreview.map((img, index) => (
              <div
                className=" w-40 h-40 p-4 border-[2px] rounded-xl border-[#eee]"
                key={index}
              >
                <img
                  src={img}
                  className="w-full h-full"
                  alt="product-preview"
                />
              </div>
            ))}
          </div>
          <Button variant="contained">create Product</Button>
        </form>
      </Box>
    </>
  );
};

export default AdminCreateProduct;
