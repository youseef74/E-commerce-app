/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Style from "./Footer.module.css";

export default function Footer() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-green-700 p-4 text-center">
        <h2 className="text-slate-200 font-bold text-lg">Footer</h2>
      </div>
    </>
  );
}
