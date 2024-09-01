/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories", err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Slider {...settings} className="my-3">
        {categories.map((category) => (
          <div key={category._id} className="px-2">
            <img
              src={category.image}
              className="w-full h-[150px] md:h-[200px] object-cover rounded-lg"
              alt={category.name}
            />
            <h4 className="text-center mt-2 text-sm md:text-base font-medium">
              {category.name}
            </h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
