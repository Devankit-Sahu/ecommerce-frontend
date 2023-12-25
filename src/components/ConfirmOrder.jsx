import React from "react";
import Header from "./layout/Header";

const ConfirmOrder = () => {
  return (
    <Header>
      <div className="max-w-[1200px] mx-auto h-[90vh] bg-red-100">
        <div className="grid grid-cols-4">
          <div className=" col-span-3">
            <div>
              <h2>Shipping Info</h2>
              <div>
                <div>
                  <p>
                    Name : <span>Rahul</span>
                  </p>
                </div>
                <div>
                  <p>
                    Mobile no. : <span>+91 3243 223 322</span>
                  </p>
                </div>
                <div>
                  <p>
                    Address : <span>Alwar</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2>Your Items</h2>
            </div>
          </div>
          <div className="">Box 1</div>
        </div>
      </div>
    </Header>
  );
};

export default ConfirmOrder;
