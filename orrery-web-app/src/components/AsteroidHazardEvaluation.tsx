"use client"
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { motion } from 'framer-motion'

function AsteroidHazardEvaluation() {
  const [asteroidData, setAsteroidData] = useState({
    size: 100, // meters
    velocity: 20, // km/s
    distance: 1000000, // km
  })
  const [hazardLevel, setHazardLevel] = useState("")

  useEffect(() => {
    // Simple hazard evaluation logic
    const { size, velocity, distance } = asteroidData
    const impact = (size * velocity * velocity) / (2 * distance)
    
    if (impact > 1000) setHazardLevel("Extreme")
    else if (impact > 100) setHazardLevel("High")
    else if (impact > 10) setHazardLevel("Moderate")
    else setHazardLevel("Low")
  }, [asteroidData])

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-red-900 to-orange-900 text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Asteroid Hazard Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label htmlFor="size" className="block text-lg font-medium">Size (meters)</label>
            <Slider
              id="size"
              min={1}
              max={1000}
              step={1}
              value={[asteroidData.size]}
              onValueChange={(value: any[]) => setAsteroidData({...asteroidData, size: value[0]})}
              className="mt-2"
            />
            <span className="block mt-1 text-right">{asteroidData.size} m</span>
          </div>
          <div>
            <label htmlFor="velocity" className="block text-lg font-medium">Velocity (km/s)</label>
            <Slider
              id="velocity"
              min={1}
              max={100}
              step={1}
              value={[asteroidData.velocity]}
              onValueChange={(value: any[]) => setAsteroidData({...asteroidData, velocity: value[0]})}
              className="mt-2"
            />
            <span className="block mt-1 text-right">{asteroidData.velocity} km/s</span>
          </div>
          <div>
            <label htmlFor="distance" className="block text-lg font-medium">Distance from Earth (km)</label>
            <Slider
              id="distance"
              min={100000}
              max={10000000}
              step={100000}
              value={[asteroidData.distance]}
              onValueChange={(value: any[]) => setAsteroidData({...asteroidData, distance: value[0]})}
              className="mt-2"
            />
            <span className="block mt-1 text-right">{asteroidData.distance.toLocaleString()} km</span>
          </div>
          <motion.div 
            className="mt-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold">Hazard Level: 
              <span className={`ml-2 font-bold ${
                hazardLevel === 'Low' ? 'text-green-400' : 
                hazardLevel === 'Moderate' ? 'text-yellow-400' : 
                hazardLevel === 'High' ? 'text-orange-400' : 
                'text-red-400'
              }`}>
                {hazardLevel}
              </span>
            </h3>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AsteroidHazardEvaluation
