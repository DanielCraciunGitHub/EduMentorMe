"use client"

import React, { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      if (window.scrollY) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility)

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      className={`fixed bottom-32 right-4 z-50 p-2 rounded-full bg-orange-500 text-white shadow-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp />
    </button>
  )
}

export default ScrollToTopButton
