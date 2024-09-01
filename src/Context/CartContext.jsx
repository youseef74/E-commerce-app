/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(0);
  const [numberItems, setNumberItems] = useState(0);
  const [cartOwner, setCartOwner] = useState(0)

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  let cartInfo = useQuery({
    queryKey: ["cartProducts"],
    queryFn: getLoggedUserCart,
  });

  // let cartOnwerId = cartInfo?.data?.data?.data?.cartOwner;

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        setCartOwner(res?.data.data.cartOwner)
        return res;
      })
      .catch((res) => res);
  }

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers: headers })
      .then((res) => {
        setNumberItems(res.data.numOfCartItems);
        setCartId(res.data.cartId);
        return res;
      })
      .catch((res) => res);
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers: headers }
      )
      .then((res) => res)
      .catch((res) => res);
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((res) => res)
      .catch((res) => res);
  }

  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((res) => res)
      .catch((res) => res);
  }

  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((res) => res);
  }

  function getAllOrders() {
    if (cartOwner) {
      return axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`
        )
        .then((res) => res)
        .catch((res) => res);
    }
  }

  useEffect(() => {
    getAllOrders();
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProductQuantity,
        deleteCartItem,
        clearCart,
        cartInfo,
        checkout,
        cartId,
        getAllOrders,
        numberItems,
        setNumberItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
