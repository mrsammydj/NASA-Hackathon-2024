"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Star = ({ top, left, size }: { top: string; left: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{ top, left, width: size, height: size }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
  />
)

export default function SolarSystemEducation() {
  const [stars, setStars] = useState<JSX.Element[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => (
      <Star
        key={i}
        top={`${Math.random() * 100}%`}
        left={`${Math.random() * 100}%`}
        size={Math.random() * 2 + 1}
      />
    ))
    setStars(newStars)
  }, [])

  const planets = [
    { name: "Mercury", type: "Terrestrial", moons: 0, color: "bg-gray-400" },
    { name: "Venus", type: "Terrestrial", moons: 0, color: "bg-yellow-600" },
    { name: "Earth", type: "Terrestrial", moons: 1, color: "bg-blue-500" },
    { name: "Mars", type: "Terrestrial", moons: 2, color: "bg-red-500" },
    { name: "Jupiter", type: "Gas Giant", moons: 79, color: "bg-orange-300" },
    { name: "Saturn", type: "Gas Giant", moons: 82, color: "bg-yellow-300" },
    { name: "Uranus", type: "Ice Giant", moons: 27, color: "bg-teal-300" },
    { name: "Neptune", type: "Ice Giant", moons: 14, color: "bg-blue-300" },
  ]

  return (
    <section className="relative rounded-3xl border border-white min-h-screen w-full overflow-hidden bg-black py-16 text-white">
      {stars}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-4 text-center text-5xl font-extrabold tracking-tight text-yellow-300 sm:text-6xl md:text-7xl"
        >
          Explore Our Solar System
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 text-center text-2xl font-bold text-gray-300"
        >
          Embark on a journey through the wonders of our cosmic neighborhood
        </motion.p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {planets.map((planet, index) => (
            <motion.div
              key={planet.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-gray-800 p-6 shadow-lg"
            >
              <div
                className={`absolute inset-0 ${planet.color} opacity-20 transition-opacity group-hover:opacity-30`}
              />
              <div className="relative z-10">
                <div className="mb-4 h-16 w-16 rounded-full bg-white" />
                <h3 className="mb-2 text-3xl font-extrabold text-yellow-300">{planet.name}</h3>
                <p className="text-xl font-semibold text-gray-400">Type: {planet.type}</p>
                <p className="text-xl font-semibold text-gray-400">Moons: {planet.moons}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}