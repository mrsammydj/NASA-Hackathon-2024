'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('app')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const controls = useAnimation()

  const teamMembers = [
    { name: "Samuel Baxter", role: "Full Stack Developer", image: "/placeholder.svg?height=100&width=100" },
    { name: "Muhammad Hassaan Shaukat", role: "Full Stack Developer", image: "/placeholder.svg?height=100&width=100" },
    { name: "Abrar Fairuj Raiyan", role: "Full Stack Developer", image: "/placeholder.svg?height=100&width=100" },
    { name: "Leck Kye-Cin", role: "Game Developer", image: "/placeholder.svg?height=100&width=100" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!ctx || !canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.1,
      speed: Math.random() * 0.05 + 0.01
    }))

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'app') {
      controls.start({
        rotate: [0, 360],
        transition: { duration: 20, repeat: Infinity, ease: "linear" }
      })
    } else {
      controls.stop()
    }
  }, [activeTab, controls])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1 
          className="text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Solar System Explorer
        </motion.h1>
        <motion.p 
          className="text-2xl text-center mb-12 text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Embark on a journey through our cosmic neighborhood
        </motion.p>

        <div className="flex justify-center mb-8">
          <Button 
            variant={activeTab === 'app' ? 'default' : 'outline'}
            onClick={() => setActiveTab('app')}
            className="mr-4 text-lg"
          >
            About the App
          </Button>
          <Button 
            variant={activeTab === 'team' ? 'default' : 'outline'}
            onClick={() => setActiveTab('team')}
            className="text-lg"
          >
            Our Team
          </Button>
        </div>

        {activeTab === 'app' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Card className="bg-gray-900 text-white border border-purple-500 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">About Solar System Explorer</CardTitle>
              </CardHeader>
              <CardContent className="text-lg">
                <motion.div
                  animate={controls}
                  className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] opacity-20 pointer-events-none"
                >
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="2"/>
                    <circle cx="30" cy="50" r="4" fill="#8B5CF6"/>
                    <circle cx="70" cy="50" r="8" fill="#EC4899"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <p className="mb-4">
                  Solar System Explorer is an interactive web application that allows users to explore and learn about the planets, moons, and other celestial bodies in our solar system. With stunning visualizations and detailed information, our app brings the wonders of space right to your screen.
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">✦</span>
                    Interactive 3D models of planets and moons
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">✦</span>
                    Real-time data updates from NASA and ESA
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">✦</span>
                    Educational content for all age groups
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">✦</span>
                    Virtual space missions and quizzes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 text-white border border-purple-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-center">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-purple-500" />
                    <p className="text-center text-gray-300">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}