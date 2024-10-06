"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Info, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const Star = ({ top, left, size }: { top: string; left: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{ top, left, width: size, height: size }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
  />
)

export default function AsteroidHazardEvaluation() {
  const [stars, setStars] = useState<JSX.Element[]>([])
  const [hazardLevel, setHazardLevel] = useState(0)
  const [asteroidData, setAsteroidData] = useState({
    size: 1,
    velocity: 10,
    distance: 1,
    composition: 1,
  })

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

  useEffect(() => {
    const newHazardLevel = calculateHazardLevel()
    setHazardLevel(newHazardLevel)
  }, [asteroidData])

  const handleSliderChange = (name: string, value: number[]) => {
    setAsteroidData({ ...asteroidData, [name]: value[0] })
  }

  const calculateHazardLevel = () => {
    const { size, velocity, distance, composition } = asteroidData
    const hazard = ((size * velocity) / distance) * composition
    return Math.min(Math.round(hazard * 2), 100) // Cap at 100
  }

  const getHazardCategory = (level: number) => {
    if (level < 33) return { category: "Low", color: "text-green-400" }
    if (level < 66) return { category: "Moderate", color: "text-yellow-400" }
    return { category: "High", color: "text-red-400" }
  }

  return (
    <section className="relative rounded-3xl border border-white min-h-screen w-full overflow-hidden bg-black py-16 text-white">
      {stars}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-4 text-center text-6xl font-extrabold tracking-tight text-yellow-300 sm:text-7xl md:text-8xl"
        >
          Asteroid Threat Analyzer
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 text-center text-3xl font-bold text-gray-300"
        >
          Evaluate the potential danger of an approaching asteroid
        </motion.p>

        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="rounded-lg bg-gray-800 p-8 shadow-lg"
          >
            <h3 className="mb-8 text-4xl font-bold text-yellow-300">Asteroid Parameters</h3>
            <div className="space-y-8">
              {[
                { name: "size", label: "Size (km)", min: 0.1, max: 10, step: 0.1 },
                { name: "velocity", label: "Velocity (km/s)", min: 1, max: 50, step: 1 },
                { name: "distance", label: "Distance (million km)", min: 0.1, max: 10, step: 0.1 },
                { name: "composition", label: "Composition Factor", min: 1, max: 3, step: 0.1 },
              ].map((param) => (
                <div key={param.name}>
                  <Label htmlFor={param.name} className="mb-2 block text-2xl font-semibold">
                    {param.label}: {asteroidData[param.name as keyof typeof asteroidData].toFixed(1)}
                  </Label>
                  <Slider
                    id={param.name}
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={[asteroidData[param.name as keyof typeof asteroidData]]}
                    onValueChange={(value) => handleSliderChange(param.name, value)}
                    className="py-4"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="rounded-lg bg-gray-800 p-8 shadow-lg"
          >
            <h3 className="mb-8 text-4xl font-bold text-yellow-300">Threat Assessment</h3>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-3xl font-semibold">Danger Level:</span>
              <span className={`text-5xl font-bold ${getHazardCategory(hazardLevel).color}`}>
                {getHazardCategory(hazardLevel).category}
              </span>
            </div>
            <Progress value={hazardLevel} className="h-8" />
            <p className="mt-4 text-center text-4xl font-bold">{hazardLevel}%</p>
            <div className="mt-8">
              <h4 className="mb-4 text-2xl font-semibold text-yellow-300">Interpretation</h4>
              <ul className="list-inside list-disc space-y-4 text-xl">
                <li>
                  <span className="font-semibold text-green-400">Low (0-32%):</span> Minimal threat, routine monitoring
                </li>
                <li>
                  <span className="font-semibold text-yellow-400">Moderate (33-65%):</span> Potential danger, increased
                  observation required
                </li>
                <li>
                  <span className="font-semibold text-red-400">High (66-100%):</span> Significant threat, immediate
                  action may be necessary
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="rounded-lg bg-gray-800 p-8 shadow-lg"
        >
          <h3 className="mb-8 text-4xl font-bold text-yellow-300">Mitigation Strategies</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center rounded-md bg-gray-700 p-6 text-center">
              <Zap className="mb-4 h-16 w-16 text-blue-400" />
              <h4 className="mb-2 text-2xl font-semibold">Kinetic Impact</h4>
              <p className="text-xl text-gray-300">Deflect the asteroid by colliding a spacecraft into it</p>
            </div>
            <div className="flex flex-col items-center rounded-md bg-gray-700 p-6 text-center">
              <Info className="mb-4 h-16 w-16 text-green-400" />
              <h4 className="mb-2 text-2xl font-semibold">Gravity Tractor</h4>
              <p className="text-xl text-gray-300">Use a spacecraft's gravity to slowly alter the asteroid's path</p>
            </div>
            <div className="flex flex-col items-center rounded-md bg-gray-700 p-6 text-center">
              <AlertTriangle className="mb-4 h-16 w-16 text-red-400" />
              <h4 className="mb-2 text-2xl font-semibold">Nuclear Explosion</h4>
              <p className="text-xl text-gray-300">Last resort: use nuclear devices to break up or deflect the asteroid</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}