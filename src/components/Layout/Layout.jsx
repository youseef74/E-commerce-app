/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {

  const [counter, setCounter] = useState(0)

  return (
    <>
      <Navbar />

      <div className="container md:w-[80%] mx-auto my-6 py-10">
        <Outlet ></Outlet>
      </div>

      <Footer />
    </>
  )
}
