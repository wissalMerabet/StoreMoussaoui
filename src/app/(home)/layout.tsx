
import Footer from "@/components/sections/Footer"
import Navbar from "@/components/sections/Navbar"
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  
  return (
    <>
     <Suspense fallback={<div className="text-center py-10">Chargement de la page...</div>}>
      <Navbar />
      {children}
      <Footer />
      </Suspense>
      
    </>
  )
}

export default layout