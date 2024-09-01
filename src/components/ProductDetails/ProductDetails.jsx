/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducrs, setRelatedProducrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  let { addProductToCart } = useContext(CartContext);

  let { id, category } = useParams();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter(
        (product) => product.category.name === category
      );
      setRelatedProducrs(related);
    });
  }

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  return (
    <>
      <div className="row items-center ">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img key={src} src={src} className="w-full" />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-4">
          <h3 className="font-semibold capitalize text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-700 my-4 ">{product?.description}</h4>
          <h4 className=" my-4">{product?.category.name}</h4>
          <div className="flex justify-between p-3 my-5">
            <span>{product?.price} EGP</span>
            <span>
              {product?.ratingsAverage}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button className="btn" onClick={() => addToCart(product.id)}>
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>

      <div className="row">
        {relatedProducrs.length > 0 ? (
          relatedProducrs.map((product) => (
            <div key={product.id} className="w-1/6">
              <div className="product my-2 p-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </Link>

                <button className="btn" onClick={() => addToCart(product.id)}>
                  {loading && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}
