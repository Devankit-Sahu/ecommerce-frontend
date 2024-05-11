import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../redux/api/order-api";
import { Stack, Step, StepLabel, Stepper } from "@mui/material";

const steps = ["order confirmed", "shipping", "to deliver"];

const OrderDetails = () => {
  const { id } = useParams();
  const { data } = useGetOrderDetailsQuery(id);

  return (
    <section className="w-full">
      <div className="container mx-auto px-10 2xl:px">
        {data?.order && (
          <>
            <h1 className="font-bold text-base sm:text-xl my-2">
              Order Id :
              <span className="text-red-700 font-semibold ml-1">
                {data?.order?._id}
              </span>
            </h1>
            <h4 className="my-2">
              Date : {new Date(data?.order?.createdAt).toLocaleDateString()}
            </h4>
            <div className="w-full my-10">
              <Stepper activeStep={0} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        textTransform: "uppercase",
                        color: "black",
                        fontWeight: 900,
                      }}
                    >
                      {label}
                      <p className="text-xs sm:text-sm">
                        {new Date(data?.order?.createdAt).toLocaleString()}
                      </p>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="border border-solid border-slate-300 bg-slate-100 rounded-lg my-5">
              <h2 className="border-b border-solid border-slate-300 p-2 font-bold capitalize text-xl">
                order items
              </h2>
              {data?.order?.orderItems?.map((item) => (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  padding={2}
                  key={item._id}
                >
                  <img src={item.image} alt="" className="w-20 h-20" />
                  <h3>{item.name}</h3>
                  <h3>{item.quantity}</h3>
                  <h3>₹ {item.price}</h3>
                </Stack>
              ))}
            </div>
            <div className="border border-solid border-slate-300 bg-slate-100 rounded-lg my-10">
              <h2 className="border-b border-solid border-slate-300 p-2 font-bold capitalize text-xl">
                order summary
              </h2>
              <h1 className="p-2">
                total price :
                <span className="ml-1">₹ {data?.order?.totalPrice}</span>
              </h1>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
