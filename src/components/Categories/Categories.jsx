/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SubCategories from "../SubCategories/SubCategories";

export default function Categories() {
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState({
    id: 0,
    title: "",
  });
  const [displaySubCategories, setDisplaySubCategories] = useState(false);
  const subCategoriesRef = useRef(null);

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  function scrollDownToSubCategories() {
    if (subCategoriesRef.current) {
      subCategoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["categoriesInfo"],
    queryFn: getCategories,
    staleTime: 7000,
  });

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
        {data?.data.data.map((categoty) => (
          <div
            key={categoty._id}
            className="card-container border-2 grid-cols-3 rounded-lg my-2"
            onClick={() => {
              setDisplaySubCategories(true);
              setSelectedCategoryInfo({
                id: categoty._id,
                title: categoty.name,
              });
              scrollDownToSubCategories(); // Scroll down to subcategories
            }}
          >
            <div className="card">
              <div className="card-img">
                <img
                  src={categoty.image}
                  className="w-full h-[300px] object-cover object-center"
                  alt=""
                />
              </div>
              <div className="card-caption p-3">
                <h3 className="text-center text-3xl font-semibold text-emerald-600 capitalize">
                  {categoty.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      {displaySubCategories ? (
        <div ref={subCategoriesRef}>
          <SubCategories category={selectedCategoryInfo} />
        </div>
      ) : null}
    </>
  );
}
