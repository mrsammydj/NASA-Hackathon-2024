"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Menu, X, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Learn", path: "/learn" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed w-full z-50 px-4 py-4 md:py-6 transition-colors duration-300 ${
        scrolled ? "bg-black" : "bg-black bg-opacity-50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Rocket className="h-10 w-10 text-purple-500" />
          </motion.div>
          <span className="text-3xl font-extrabold text-white group-hover:text-purple-400 transition-colors">
            Space Orrery
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="relative group"
            >
              <motion.span
                className="text-xl font-bold text-white hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.name}
              </motion.span>
              {pathname === item.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-1 bg-purple-500"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-1 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"
                whileHover={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="p-2 md:hidden text-white hover:text-purple-400"
            >
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-black text-white p-0">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="flex flex-col h-full"
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">Menu</span>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="p-2 text-white hover:text-purple-400"
                        >
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                  <nav className="flex-grow">
                    {navItems.map((item, index) => (
                      <SheetClose asChild key={item.name}>
                        <Link href={item.path}>
                          <motion.div
                            className="block py-4 px-6 text-xl font-bold hover:bg-purple-900 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.name}
                          </motion.div>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <motion.div
                    className="p-4 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-center space-x-2 text-lg font-bold">
                      <Star className="h-6 w-6 text-yellow-400" />
                      <span>NASA Competition Entry</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}