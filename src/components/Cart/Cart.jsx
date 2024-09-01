/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCart,
    cartInfo,
    numberItems,
    setNumberItems,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForRemove, setIsLoadingForRemove] = useState(false);
  const [isLoadingForClearCart, setIsLoadingForClearCart] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  let cartIsLoading = cartInfo.isLoading;

  async function getCartItem() {
    setIsLoading(true);
    let response = await getLoggedUserCart();
    if (response.data?.status === "success") {
      setCartDetails(response.data.data);
      setIsLoading(false);
    }
  }

  async function updateProduct(id, count) {
    setCurrentId(id);
    setIsLoading(true);
    if (count === 0) {
      deleteItem(id);
      setIsLoading(false);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
        toast.success("product updated successfully");
        setIsLoading(false);
      } else {
        toast.error("error");
        setIsLoading(false);
      }
    }
  }

  async function deleteItem(id) {
    setCurrentId(id);
    setIsLoadingForRemove(true);
    let response = await deleteCartItem(id);
    if (response.data.status === "success") {
      setNumberItems(numberItems - 1);
      setCartDetails(response.data.data);
      setIsLoadingForRemove(true);
    } else {
      toast.error("error");
      setIsLoadingForRemove(true);
    }
  }

  async function clearAllCartItem() {
    setIsLoadingForClearCart(true);
    let response = await clearCart();
    if (response.data.message === "success") {
      setCartDetails(null);
      setIsLoadingForClearCart(false);
    } else {
      toast.error("error");
      setIsLoadingForClearCart(false);
    }
  }

  useEffect(() => {
    getCartItem();
  }, [isLoadingForClearCart]);

  if (cartIsLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
            Total Price: {cartDetails?.totalCartPrice}
          </h2>
          <div className="shadow-md sm:rounded-lg my-6">
            {cartDetails?.products.map((product) => (
              <div
                key={product.product.id}
                className="bg-white border-b hover:bg-gray-50 p-4 grid grid-cols-3 md:grid-cols-5 gap-4 items-center"
              >
                <div className="col-span-1 flex justify-center md:justify-start">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </div>
                <div className="col-span-1 text-center md:text-left font-semibold text-gray-900">
                  {product.product.title.split(" ").slice(0, 2).join(" ")}
                </div>
                <div className="col-span-1 flex justify-center md:justify-start items-center">
                  <button
                    onClick={() =>
                      updateProduct(product.product.id, product.count - 1)
                    }
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                    type="button"
                  >
                    <span className="sr-only">Decrease Quantity</span>
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    {isLoading && currentId === product.product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <span className="w-[4px] text-center">
                        {product.count}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      updateProduct(product.product.id, product.count + 1)
                    }
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                    type="button"
                  >
                    <span className="sr-only">Increase Quantity</span>
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <div className="col-span-1 text-center md:text-left font-semibold text-gray-900">
                  {product.price} EGP
                </div>
                <div className="col-span-1 text-center md:text-left">
                  <button
                    onClick={() => deleteItem(product.product.id)}
                    className="w-full bg-[#FF4D4D] text-white py-2 rounded-lg hover:bg-red-600 transition duration-150"
                  >
                    {isLoadingForRemove && currentId === product.product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center w-full p-4 space-x-10">
              <button
                onClick={() => clearAllCartItem()}
                className="text-xl border border-emerald-500 p-3 rounded-lg text-gray-700"
              >
                {isLoading && isLoadingForClearCart ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Clear Your Cart"
                )}
              </button>
              <Link to={"/checkout"}>
                <button className="text-xl w-[156px] border border-emerald-500 p-3 rounded-lg text-gray-700">
                  {isLoading && isLoadingForClearCart ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-red-800 font-bold text-center my-8">
          There are no products to show
        </h1>
      )}
    </>
  );
}
