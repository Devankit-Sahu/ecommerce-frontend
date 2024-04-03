import React, { useState } from "react";
import Header from "./layout/Header";
import { Country, State } from "country-state-city";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PublicIcon from "@mui/icons-material/Public";
import BungalowIcon from "@mui/icons-material/Bungalow";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobno, setMobno] = useState("");
  const navigate = useNavigate();
  return (
    <Header>
      <div className=" max-w-[1200px] mx-auto h-[90vh]">
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center justify-center flex-col p-8 border border-[#0fe3d3] rounded-xl w-[30vw] bg-gradient-to-b from-green-400 to-green-200">
            <h2 className=" text-center text-gray-500 text-[1.6vmax] mb-3 pb-3 border-b border-gray-500">
              Shipping Info
            </h2>
            <div>
              <form action="">
                <div className="mb-5 flex items-center gap-2">
                  <HomeIcon className=" text-gray-600" />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-gray-500 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mb-5 flex items-center gap-2">
                  <LocationCityIcon className=" text-gray-600" />
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Your City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-gray-500 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mb-5 flex items-center gap-2">
                  <PublicIcon className=" text-gray-600" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-gray-500 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
                {country && (
                  <div className="mb-5 flex items-center gap-2">
                    <BungalowIcon className=" text-gray-600" />
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-gray-500 focus:outline-none px-2 sm:text-sm sm:leading-6"
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((s) => (
                          <option key={s.isoCode} value={s.isoCode}>
                            {s.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="mb-5 flex items-center gap-2">
                  <LocalPhoneIcon className=" text-gray-600" />
                  <input
                    id="mobno"
                    name="mobno"
                    type="number"
                    placeholder="Mobile no."
                    inputMode="tel"
                    value={mobno}
                    onChange={(e) => setMobno(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-gray-500 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mb-5 flex items-center gap-2">
                  <PinDropIcon className=" text-gray-600" />
                  <input
                    id="pincode"
                    name="pincode"
                    type="number"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-400 placeholder:text-gray-500 focus:outline-none px-2 sm:text-sm sm:leading-6"
                  />
                </div>

                <button
                  // disabled={product.stock > 0 ? false : true}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => navigate("/confirm-order")}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default CheckOut;
