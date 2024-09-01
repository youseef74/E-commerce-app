/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import slide4 from "../../assets/images/grocery-banner.png";
import slide5 from "../../assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Increased autoplay speed for better readability
  };

  return (
    <div className="container mx-auto px-4 mt-3">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4 w-full">
          <Slider {...settings}>
            <img
              src={slide1}
              className="w-full h-[200px] md:h-[400px] object-cover"
              alt="Slide 1"
            />
            <img
              src={slide3}
              className="w-full h-[200px] md:h-[400px] object-cover"
              alt="Slide 3"
            />
            <img
              src={slide5}
              className="w-full h-[200px] md:h-[400px] object-cover"
              alt="Slide 5"
            />
          </Slider>
        </div>
        <div className="md:w-1/4 w-full flex flex-col gap-4">
          <img
            src={slide2}
            className="w-full h-[150px] md:h-[200px] object-cover"
            alt="Slide 2"
          />
          <img
            src={slide4}
            className="w-full h-[150px] md:h-[200px] object-cover"
            alt="Slide 4"
          />
        </div>
      </div>
    </div>
  );
}
