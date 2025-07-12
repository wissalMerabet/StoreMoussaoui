
import Footer from "@/components/sections/Footer"
import Navbar from "@/components/sections/Navbar"
import React from "react"

interface Props {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      
    </>
  )
}

export default layout