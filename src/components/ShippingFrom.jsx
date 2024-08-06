import Input from "./input/Input";

const ShippingFrom = ({ shippingInfo, handleInputChange }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-5 py-2">
        <div>
          <Input
            type="text"
            id="address1"
            name="address1"
            label="address1"
            value={shippingInfo.address1}
            onChange={handleInputChange}
            labelClassName="block text-sm font-medium leading-6 text-gray-900 capitalize"
            className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
          />
        </div>
        <div>
          <Input
            type="text"
            id="address2"
            name="address2"
            label="address2"
            value={shippingInfo.address2}
            onChange={handleInputChange}
            labelClassName="block text-sm font-medium leading-6 text-gray-900 capitalize"
            className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-5 py-2">
        <div>
          <Input
            type="text"
            id="city"
            name="city"
            label="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
            labelClassName="block text-sm font-medium leading-6 text-gray-900 capitalize"
            className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
          />
        </div>
        <div>
          <Input
            type="text"
            id="state"
            name="state"
            label="state"
            value={shippingInfo.state}
            onChange={handleInputChange}
            labelClassName="block text-sm font-medium leading-6 text-gray-900 capitalize"
            className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-5 py-2">
        <div>
          <Input
            type="text"
            id="country"
            name="country"
            label="country"
            value={shippingInfo.country}
            onChange={handleInputChange}
            labelClassName="block text-sm font-medium leading-6 text-gray-900 capitalize"
            className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
          />
        </div>
        <div>
          <Input
            type="text"
            id="pincode"
            name="pincode"
            label="pincode"
            value={shippingInfo.pincode}
            onChange={handleInputChange}
            labelClassName="block text-sm font-medium leading-6 text-gray-900 capitalize"
            className="bg-transparent rounded outline-none border border-[#d5d0d0] w-full px-2"
          />
        </div>
      </div>
    </>
  );
};

export default ShippingFrom;
