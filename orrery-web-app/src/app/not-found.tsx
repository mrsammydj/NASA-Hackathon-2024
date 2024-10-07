"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-yellow-300 mb-4">
          Oops! This Page is Under Construction
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          We&apos;re working hard to bring you something amazing. Please check back later!
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}