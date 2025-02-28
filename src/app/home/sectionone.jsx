"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProgressiveForm from "@/components/progressiveform/progressiveform";

function Sectionone() {
  const [start, setStart] = useState(false);
 
  return (
    <>
      {!start ? (
        <header className="relative h-screen">
          <Image
            src="/assets/header image/alvaro-reyes-qWwpHwip31M-unsplash.jpg"
            layout="fill"
            objectFit="cover"
            alt="Background Image"
            className="absolute z-0 w-full h-full bg-center"
          />

          <div className="flex h-screen justify-center items-center flex-col">
            <div className="w-full h-screen bg-cover bg-center">
              <div className="w-full h-full flex flex-col justify-center items-center backdrop-brightness-50">
                <h2 className="text-3xl text-white">Management App</h2>
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setStart(true)} 
                >
                  Begin your journey
                </button>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <ProgressiveForm />
      )}
    </>
  );
}

export default Sectionone;