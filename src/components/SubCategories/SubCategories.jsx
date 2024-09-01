/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SubCategories({ category }) {
  function getSubCategories() {
    if (!category.id) return null;
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${category.id}/subcategories`
    );
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["subCategoriesInfo", category.id],
    queryFn: getSubCategories,
    staleTime: 7000,
    enabled: !!category.id, // Only run query if categoryId exists
  });

  useEffect(() => {
    if (category.id) {
      refetch(); // Refetch data when categoryId changes
    }
  }, [category.id, refetch]);

  if (isError) {
    return <h3>{error.message}</h3>; // Use error.message to get the error text
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  const categoryInfo = data?.data.data || [];

  return (
    <>
      <h2 className="text-4xl font-semibold text-emerald-600 my-3 text-center">
        {category.title + " Subcategories"}
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 px-3 gap-4">
        {categoryInfo.length > 0 ? (
          categoryInfo.map((subCategory) => (
            <div
              key={subCategory._id}
              className="card border-2 rounded-lg text-center p-4"
            >
              <p className="text-2xl font-semibold">{subCategory.name}</p>
            </div>
          ))
        ) : null}
      </div>
    </>
  );
}
