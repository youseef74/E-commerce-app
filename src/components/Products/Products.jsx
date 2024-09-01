/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products() {
  let { data, isError, isLoading, error } = useProducts();
  let { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      {/* <div className="py-5 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.data.data.map((product) => (
          <div key={product.id} className="col-span-1">
            <div className="product my-2 p-3 border rounded-lg shadow-sm h-[365px]">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  className="w-full h-40 object-cover mb-3"
                  alt={product.title}
                />
                <h3 className="text-emerald-600 text-sm">
                  {product.category.name}
                </h3>
                <h3 className="font-semibold text-lg mb-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm font-medium">
                    {product.price} EGP
                  </span>
                  <span className="flex items-center">
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-400 ml-1"></i>
                  </span>
                </div>
              </Link>

              <button
                onClick={() => addToCart(product.id)}
                className="btn w-full bg-emerald-600 text-white py-2 mt-2 rounded-lg hover:bg-emerald-700 transition duration-150"
              >
                {loading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div> */}

      <RecentProducts />
    </>
  );
}
