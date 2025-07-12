"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 bg-gradient-to-b ">
      <div
        className={`transition-all duration-700 ease-out transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <div className="text-center">
          <h1 className="text-9xl font-thin text-neutral-900">404</h1>
          <div className="h-px w-16 bg-neutral-300 mx-auto my-6" />
          <h2 className="text-xl font-light text-neutral-700 mb-6">Page not found</h2>
          <p className="text-neutral-500 max-w-md mx-auto mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-flex items-center text-md font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[40vh] rounded-full border border-neutral-100" />
      </div>
    </div>
  )
}