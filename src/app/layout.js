
import React from 'react'
import { Suspense } from 'react';
import "./globals.css";
import Navbar from './layouts/navbar';
;
// import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react';
export const metadata = {
  title: {
    default: "task managment app ",
    template: "task managment "
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
        
        <Suspense>
        <SessionProvider>
            <Navbar />
            {children}
            </SessionProvider>
        </Suspense>

        {/* <Toaster duration={5000} position='top-center' className={`${SansWeb.className} text-center flex justify-center items-center text-sm font-bold `} /> */}
      </body>
    </html>
  );
}

