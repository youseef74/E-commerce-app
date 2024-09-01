/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from "react";
import Style from "./WishList.module.css";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";

export default function WishList() {
  const { getLoggedUserWishlist, deleteWishlistItem, wishlistInfo } =
    useContext(WishlistContext);

  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForRemove, setIsLoadingForRemove] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const wishlistIsLoading = wishlistInfo.isLoading;
  let { addProductToCart, setNumberItems, numberItems } =
    useContext(CartContext);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const getWishlistItem = useCallback(async () => {
    setIsLoading(true);
    const response = await getLoggedUserWishlist();
    if (response.data?.status === "success") {
      setWishlistDetails(response.data.data);
    }
    setIsLoading(false);
  }, [getLoggedUserWishlist]);

  const deleteItem = useCallback(
    async (id) => {
      setCurrentId(id);
      setIsLoadingForRemove(true);
      const response = await deleteWishlistItem(id);
      if (response.data.status === "success") {
        setWishlistDetails((prevDetails) =>
          prevDetails.filter((item) => item.id !== id)
        );
      } else {
        toast.error("Error removing item");
      }
      setIsLoadingForRemove(false);
    },
    [deleteWishlistItem]
  );

  async function addToCart(id) {
    setCurrentId(id);
    setCartLoading(true);

    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setNumberItems(numberItems + 1);
      toast.success(response.data.message);

      // Remove the item from the wishlist
      await deleteWishlistItem(id);

      // Update the wishlist details state to remove the item
      setWishlistDetails((prevDetails) =>
        prevDetails.filter((item) => item.id !== id)
      );

      setCartLoading(false);
    } else {
      toast.error(response.data.message);
      setCartLoading(false);
    }
  }

  useEffect(() => {
    getWishlistItem();
  }, [getWishlistItem]);

  if (wishlistIsLoading || isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      {wishlistDetails?.length > 0 ? (
        <div className="shadow-md sm:rounded-lg my-6">
          {wishlistDetails.map((product) => (
            <div
              key={product.id}
              className="bg-white border-b hover:bg-gray-50 p-4 grid grid-cols-3 md:grid-cols-5 gap-4 items-center"
            >
              <div className="col-span-1 flex justify-center md:justify-start">
                <img
                  src={product.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={product.title || "Product Image"}
                />
              </div>
              <div className="col-span-1 text-center md:text-left font-semibold text-gray-900">
                {product.title?.split(" ").slice(0, 2).join(" ") || "No Title"}
              </div>
              <div className="col-span-1 text-center md:text-left font-semibold text-gray-900">
                {product.price} EGP
              </div>
              <div className="col-span-1 text-center md:text-left">
                <button
                  onClick={() => deleteItem(product.id)}
                  className="w-full bg-[#FF4D4D] text-white py-2 rounded-lg hover:bg-red-600 transition duration-150"
                >
                  {isLoadingForRemove && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
              <div className="col-span-1 text-center md:text-left">
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-150"
                >
                  {cartLoading && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-3xl text-red-800 font-bold text-center my-8">
          There are no products to show
        </h1>
      )}
    </>
  );
}
