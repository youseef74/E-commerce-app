/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import logo from "../../assets/logo.svg";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { numberItems } = useContext(CartContext);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-slate-200 fixed w-full z-20 top-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Fresh Cart Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`md:flex items-center w-full md:w-auto md:justify-between md:gap-60 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          {userLogin !== null && (
            <div className="mx-auto">
              <ul className="flex flex-col gap-2 md:flex-row md:space-x-8 p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:bg-slate-200 md:border-0">
                <li>
                  <NavLink
                    to=""
                    className="block text-gray-900 rounded hover:bg-gray-10"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cart" className="block text-gray-900 rounded">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to="wishlist" className="block text-gray-900 rounded">
                    Wish list
                  </NavLink>
                </li>
                <li>
                  <NavLink to="products" className="block text-gray-900 rounded">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className="block text-gray-900 rounded"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="brands" className="block text-gray-900 rounded">
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          <div className="flex items-center space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
            {userLogin !== null ? (
              <>
                <Link to="cart" className="relative">
                  <div className="fas fa-cart-plus text-[25px]">
                    <span className="bg-emerald-600 absolute top-[-12px] right-[-16px] size-5 rounded-md flex items-center justify-center text-white p-3 text-[17px]">
                      {numberItems}
                    </span>
                  </div>
                </Link>
                <span onClick={signOut} className="text-sm cursor-pointer">
                  SignOut
                </span>
              </>
            ) : (
              <>
                <Link to="login" className="text-sm">
                  Login
                </Link>
                <Link to="register" className="text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
