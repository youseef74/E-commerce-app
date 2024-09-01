/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let productInfo = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    staleTime: 7000,
  });

  return productInfo;
}
