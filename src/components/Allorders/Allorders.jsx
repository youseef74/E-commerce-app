/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Allorders() {
  let { getAllOrders } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  async function getAllOrdersItems() {
    setIsLoading(true);
    let res = await getAllOrders();
    setResponse(res);
    console.log(response);
    if (response?.status === 200) {
      console.log(response);
      console.log(response?.data); // Log the order data
      console.log(response?.data[0].id);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllOrdersItems();
  }, []);

  return (
    <>
      <h2 className="text-4xl font-semibold text-emerald-600 my-3 text-center">
        All Orders
      </h2>

      {/* <div className="card-container border-2 rounded-lg my-2 cursor-pointer p-4 shadow-lg">
        <h3 className="text-xl font-semibold text-emerald-600 mb-2">
          Order ID: {}
        </h3>
        <div className="mb-3">
          <h4 className="text-lg font-medium text-gray-700">Customer: {}</h4>
          <p className="text-gray-500">Email: {}</p>
          <p className="text-gray-500">Phone: {}</p>
        </div>
        <div className="mb-3">
          <p className="text-lg font-semibold text-gray-800">
            Total Price: ${}
          </p>
          <p className="text-sm text-gray-600">
            Status: {response?.data[0].isPaid ? "Paid" : "Not Paid"} |{" "}
            {response?.data[0].isDelivered ? "Delivered" : "Not Delivered"}
          </p>
        </div>
      </div> */}
    </>
  );
}
