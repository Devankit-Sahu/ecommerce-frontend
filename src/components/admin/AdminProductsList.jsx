import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdminAction } from "../../redux/api/admin-api";
import Loader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { MyTable, MyButton } from "..";
import { productColumns } from "../../constants/constant";

const AdminProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, products } = useSelector((state) => state.adminProducts);
  // const { isDeleted } = useSelector((state) => state.deleteProduct);

  // const deleteProductHandler = (id) => {
  //   dispatch(deleteProductAdminAction({ id }));
  // };

  const data = products?.map((product) => ({
    id: product._id,
    name: product.name,
    stock: product.stock,
    price: product.price,
    // action: (
    //   <div className="flex gap-x-3 flex-1">
    //     <Link to={`/app/admin/product/edit/${product._id}`}>
    //       <MyButton
    //         type="submit"
    //         className="bg-[#2dadcf] hover:bg-[#56b0c8] p-2 rounded-md text-white active:scale-[.9] shadow-3xl"
    //         content="Edit"
    //       />
    //     </Link>
    //     <MyButton
    //       // onClick={() => deleteProductHandler(product._id)}
    //       className="bg-red-600 hover:bg-[#da2b2b] p-2 rounded-md text-white active:scale-[.9] shadow-3xl"
    //       type="submit"
    //       content="Delete"
    //     />
    //   </div>
    // ),
  }));

  useEffect(() => {
    // if (isDeleted) {
    //   navigate("/admin/products");
    //   toast.success("Product deleted");
    //   dispatch(deleteProductReset());
    // }
    dispatch(getAllProductsAdminAction());
  }, [dispatch]);

  return (
    // <>
    //   {loading ? (
    //     <div className="h-[90vh] flex items-center justify-center">
    //       <Loader content={"Fetching products... Please wait...."} />
    //     </div>
    //   ) : (

    //   )}
    // </>
    <>
      {products?.length !== 0 ? (
        <div className="w-full px-10">
          <h2 className="text-2xl pt-6 pb-1 mb-10 font-bold text-[#8f9297] border-b border-b-[#ced0d5] capitalize">
            Products
          </h2>
          <MyTable columns={productColumns} data={data} />
        </div>
      ) : (
        <div className="h-[90vh] flex flex-col justify-center items-center">
          <p className="text-2xl font-bold mb-6">
            No products yet... please add some products
          </p>
          <div onClick={() => navigate("/app/admin/product/add")}>
            <AddBoxIcon
              sx={{
                color: "green",
                fontSize: "90px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductsList;
