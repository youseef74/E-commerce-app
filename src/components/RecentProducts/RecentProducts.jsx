/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishListContext";

export default function RecentProducts() {
  let { data, isError, isLoading, error } = useProducts();
  let { addProductToCart, setNumberItems, numberItems } =
    useContext(CartContext);
  let { addProductToWishlist, wishlistInfo, getLoggedUserWishlist } =
    useContext(WishlistContext);

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fetch wishlist data when component mounts
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getLoggedUserWishlist();
        if (response.data?.status === "success") {
          const ids = response.data.data.map((item) => item.id);
          setWishlistIds(ids); // Set the wishlistIds state with fetched IDs
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
    fetchWishlist();
  }, [getLoggedUserWishlist]);

  async function addToCart(id) {
    setCurrentId(id);
    setCartLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      setNumberItems(numberItems + 1);
      toast.success(response.data.message);
      setCartLoading(false);
    } else {
      toast.error(response.data.message);
      setCartLoading(false);
    }
  }

  async function addToWishlist(id) {
    setCurrentId(id);
    setWishlistLoading(true);
    let response = await addProductToWishlist(id);

    if (response.data.status === "success") {
      setWishlistIds([...wishlistIds, id]); // Add new item to the wishlistIds state
      toast.success(response.data.message);
      setWishlistLoading(false);
    } else {
      toast.error(response.data.message);
      setWishlistLoading(false);
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
      <div className="py-5 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                <div className="flex justify-between items-center">
                  <h3 className="text-emerald-600 text-sm">
                    {product.category.name}
                  </h3>
                </div>
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

              <div className="button flex justify-between items-center mt-2 gap-2">
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
                <span
                  className="w-[35px] text-center"
                  onClick={() => addToWishlist(product.id)}
                >
                  {wishlistLoading && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i
                      id="heart"
                      className={`fas fa-solid fa-heart text-[22px] z-[9] ${
                        wishlistIds.includes(product.id)
                          ? "text-red-600 hover:text-red-700"
                          : "text-emerald-600 hover:text-emerald-700"
                      } cursor-pointer`}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
