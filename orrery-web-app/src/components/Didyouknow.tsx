"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

export default function DidYouKnow() {
  const facts = [
    "The Sun accounts for 99.86% of the mass in the Solar System.",
    "One day on Venus is longer than its year.",
    "Jupiter has the shortest day of all the planets.",
    "The Great Red Spot on Jupiter is a storm that has lasted for hundreds of years.",
  ];

  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 5000); // Change the fact every 5 seconds

    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <Card className="w-full bg-opacity-80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-yellow-300 font-bold">Did You Know?</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFact}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg"
          >
            {facts[currentFact]}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
