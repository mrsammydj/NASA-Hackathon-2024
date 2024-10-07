"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollHeader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const visualizationHeight = document.querySelector('.h-screen')?.clientHeight;
      if (visualizationHeight) {
        setVisible(window.scrollY > visualizationHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 bg-black text-white py-6 px-4 z-50"
        >
          <nav className="container mx-auto">
            <ul className="flex justify-end space-x-8">
              {["Home", "About", "Explore", "Learn", "Contact"].map((item) => (
                <li key={item} className="relative">
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-xl font-bold hover:text-pink-500 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default ScrollHeader;