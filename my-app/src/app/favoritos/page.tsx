/* eslint-disable @next/next/no-img-element */
"use client";

import Example from "@/components/Image";
import {useState} from "react";

function ImgPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState("");

  function handleClick(imgSrc: string) {
    setIsOpen(true);
    setSrc(imgSrc);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center items-center p-20 m-20 cursor-pointer">
      <img
        src="/images/Portada1.jpg"
        alt=""
        className="w-96"
        onClick={() => handleClick("/images/Portada1.jpg")}
      />
      <Example src={src} isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export default ImgPreview;
