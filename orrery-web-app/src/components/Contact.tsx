'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// SpaceBackground with realistic stars, black background, and twinkling effect
function SpaceBackground() {
  const starGeometry = useRef<THREE.BufferGeometry>(null)
  const starMaterial = useRef<THREE.PointsMaterial>(null)
  const stars = useRef<THREE.Points>(null)

  useEffect(() => {
    if (starGeometry.current) {
      const starVertices = []

      // Create a large number of stars with realistic random distribution
      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000
        const y = (Math.random() - 0.5) * 2000
        const z = (Math.random() - 0.5) * 2000
        starVertices.push(x, y, z)
      }

      starGeometry.current.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starVertices, 3)
      )
    }
  }, [])

  useFrame(({ clock }) => {
    // Twinkling effect
    if (starMaterial.current) {
      const time = clock.getElapsedTime()
      starMaterial.current.opacity = 0.8 + Math.sin(time * 2) * 0.2
    }

    // Rotate stars slowly
    if (stars.current) {
      stars.current.rotation.y += 0.0002 // Slowly rotate to give the feeling of drifting through space
    }
  })

  return (
    <points ref={stars}>
      <bufferGeometry ref={starGeometry} />
      <pointsMaterial ref={starMaterial} color="#ffffff" size={0.7} sizeAttenuation transparent opacity={0.9} />
    </points>
  )
}

// Animate the camera to add realism to space drift
function AnimatedCamera() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    camera.position.x = Math.sin(time * 0.1) * 2
    camera.position.y = Math.cos(time * 0.1) * 2
    camera.lookAt(0, 0, 0) // Keep looking at the center
  })

  return null
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the form data to your server
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-primary/20 rounded-lg backdrop-blur-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-primary-foreground text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-primary-foreground">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-primary-foreground">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/50"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-primary-foreground">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/50"
              placeholder="Your message"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: 'black' }}>
        <SpaceBackground />
        <AnimatedCamera />
        <ambientLight intensity={0.3} />
      </Canvas>
      <ContactForm />
    </div>
  )
}
