import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAdminAction } from "../../redux/features/admin/productAdminActions";
import { SingleProductDetail } from "../../redux/features/product/productDetailAction";
import { updateProductReset } from "../../redux/features/admin/updateProductSlice";
import { toast } from "react-hot-toast";
import Loader from "../Loader";
import { Input, MyButton } from "../";

const AdminUpdateProduct = () => {
  const { product, loading } = useSelector((state) => state.productDetail);
  const { isUpdated } = useSelector((state) => state.updateProduct);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setProdName] = useState("");
  const [category, setProdCat] = useState("");
  const [description, setProdDesc] = useState("");
  const [price, setProdPrice] = useState("");
  const [stock, setProdStock] = useState("");
  const [seller, setProdSeller] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handlesubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("category", category);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("seller", seller);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProductAdminAction({ id, myForm }));
  };

  const imageChangehandler = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagesPreview((old) => [...old, reader.result]);
        setImages((old) => [...old, reader.result]);
      };
      reader.readAsDataURL(f);
    });
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(SingleProductDetail(id));
    } else {
      setProdName(product.name);
      setProdCat(product.category);
      setProdDesc(product.description);
      setProdPrice(product.price);
      setProdStock(product.stock);
      setProdSeller(product.seller);
      setOldImages(product.images);
    }
    if (isUpdated) {
      navigate("/admin/products");
      toast.success("Product updated");
      dispatch(updateProductReset());
    }
  }, [dispatch, product, isUpdated, id, navigate]);

  return (
    <>
      {loading ? (
        <div className="h-[90vh] flex items-center justify-center">
          <Loader content={"Loading"} />
        </div>
      ) : (
        <div className="h-full max-w-7xl mx-auto">
          <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#8f9297]">
            Update
          </h2>
          <div className="pb-10">
            <form
              onSubmit={handlesubmit}
              noValidate
              encType="multipart/form-data"
            >
              <div>
                <div className="grid md:grid-cols-2 gap-x-3 h-20 mb-8">
                  <Input
                    label="Product Name"
                    type="text"
                    name="productname"
                    value={name}
                    className="bg-transparent border-2 border-[#d5d0d0] rounded-xl h-9 px-1"
                    onChange={(e) => setProdName(e.target.value)}
                  />
                  <div className="flex flex-col">
                    <label
                      className="block text-sm font-medium leading-6 text-gray-900"
                      htmlFor="productcat"
                    >
                      Product category
                    </label>
                    <select
                      name="category"
                      value={category}
                      onChange={(e) => setProdCat(e.target.value)}
                      className="placeholder:text-gray-600 block w-full rounded-xl text-gray-900 bg-transparent border-2 border-[#d5d0d0] h-9 px-1"
                    >
                      <option value="laptop">Laptop</option>
                      <option value="mobile">Mobile</option>
                      <option value="t-shirt">T-shirt</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-1 mb-8">
                  <div className="flex flex-col">
                    <label
                      className="block text-sm font-medium leading-6 text-gray-900"
                      htmlFor="productdesc"
                    >
                      Product Description
                    </label>
                    <textarea
                      rows="7"
                      className=" border-2 border-[#d5d0d0] rounded-xl p-4 focus:outline-purple-400"
                      id="productdesc"
                      name="description"
                      value={description}
                      onChange={(e) => setProdDesc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-x-3 h-20 mb-8">
                  <Input
                    label="Product Price"
                    type="number"
                    name="productprice"
                    value={price}
                    className="bg-transparent border-2 border-[#d5d0d0] rounded-xl h-9 px-1"
                    onChange={(e) => setProdPrice(e.target.value)}
                  />
                  <Input
                    label="Product Stock"
                    type="number"
                    name="productstock"
                    value={stock}
                    className="bg-transparent border-2 border-[#d5d0d0] rounded-xl h-9 px-1"
                    onChange={(e) => setProdStock(e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-1 mb-8">
                  <Input
                    label="Product Seller"
                    type="text"
                    name="productseller"
                    value={seller}
                    className="bg-transparent border-2 border-[#d5d0d0] rounded-xl h-9 px-1"
                    onChange={(e) => setProdSeller(e.target.value)}
                  />
                </div>
                <div className="mb-8">
                  <Input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="block w-full py-1.5 sm:leading-6 file:w-full file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:border-none file:p-3 file:rounded-full file:text-white file:cursor-pointer"
                    multiple
                    onChange={imageChangehandler}
                  />
                </div>
                <div className="flex justify-center gap-3 mb-8">
                  {oldImages &&
                    oldImages.map((img, index) => (
                      <div
                        className=" w-40 h-40 p-4 border-[2px] rounded-xl border-[#eee]"
                        key={index}
                      >
                        <img
                          src={img.url}
                          className="w-full h-full"
                          alt="product"
                        />
                      </div>
                    ))}
                </div>
                <div className="flex justify-center gap-3 mb-8">
                  {imagesPreview.map((img, index) => (
                    <div
                      className=" w-40 h-40 p-4 border-[2px] rounded-xl border-[#eee]"
                      key={index}
                    >
                      <img
                        src={img}
                        className="w-full h-full"
                        alt="product"
                      />
                    </div>
                  ))}
                </div>
                <MyButton
                  type="submit"
                  content="Update"
                  className="bg-green-500 hover:bg-green-400 active:scale-[.9] font-serif py-2 px-4 rounded"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUpdateProduct;
