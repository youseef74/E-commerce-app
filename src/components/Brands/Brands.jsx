/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Style from "./Brands.module.css"; // Assuming you have this CSS module

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null); // State to track selected brand

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading, error, isError } = useQuery({
    queryKey: ["brandsInfo"],
    queryFn: getBrands,
    staleTime: 7000,
  });

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  const handleCloseModal = () => {
    setSelectedBrand(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "default-modal") {
      handleCloseModal();
    }
  };

  return (
    <>
      <h2 className="text-4xl font-semibold text-emerald-600 my-3 text-center">
        All Brands
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
        {data?.data.data.map((brand) => (
          <div
            key={brand._id}
            className="card-container border-2 rounded-lg my-2 cursor-pointer"
            onClick={() => setSelectedBrand(brand)} // Set selected brand when clicked
          >
            <div className="card">
              <div className="card-img">
                <img src={brand.image} className="w-full" alt={brand.name} />
              </div>
              <div className="card-caption p-3">
                <h3 className="text-center capitalize mb-3">{brand.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 bottom-0 z-[999] bg-[#7f7f7f6b] flex justify-center items-start w-full md:inset-0 max-h-full"
          onClick={handleOutsideClick}
        >
          <div className="relative p-2 max-w-2xl max-h-full bg-white rounded-lg shadow w-[95%] lg:w-[38%] mt-5">
            {/* Modal content */}
            <div className="relative">
              {/* Modal header */}
              <div className="flex items-center justify-between p-2 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedBrand.name}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleCloseModal} // Close modal on button click
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 flex flex-col md:flex-row justify-between mb-5">
                <div className="my-9">
                  <h3 className="text-3xl font-semibold text-emerald-600 capitalize">
                    {selectedBrand.name}
                  </h3>
                  <p className="mt-4">{selectedBrand.name}</p>
                </div>

                <div>
                  <img src={selectedBrand.image} className="w-[200px]" alt="" />
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="text-white bg-gray-500 hover:bg-gray-600 duration-[0.3s] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
