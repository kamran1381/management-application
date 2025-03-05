"use client";

import React from "react";
import Sidebar from "@/components/userpanel/sidebar";

function Account() {
  const userData = {
    name: "Lachin",
    gender: "Female",
    Email: "lachin@gmail.com",
  };

  return (
    <div className="bg-[#000000] flex w-full min-h-screen">
      <div className="sm:w-3/4 w-full flex flex-col lg:flex-row lg:space-x-3 lg:space-x-reverse px-1 space-y-3 lg:space-y-0">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>
        <div className="lg:w-4/5 flex items-center justify-center pr-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Details</h2>

            <div className="text-gray-700">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Email:</strong> {userData.Email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
