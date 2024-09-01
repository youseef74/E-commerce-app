/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  let wishlistInfo = useQuery({
    queryKey: ["wishlistProducts"],
    queryFn: getLoggedUserWishlist,
  });

  function addProductToWishlist(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((res) => res);
  }

  function getLoggedUserWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: headers,
      })
      .then((res) => res)
      .catch((res) => res);
  }

  function deleteWishlistItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: headers,
      })
      .then((res) => res)
      .catch((res) => res);
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getLoggedUserWishlist,
        deleteWishlistItem,
        wishlistInfo,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
