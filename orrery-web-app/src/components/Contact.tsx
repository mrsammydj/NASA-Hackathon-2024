'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function SpaceBackground() {
  const mesh = useRef<THREE.Mesh>(null)
  const texture = useTexture('/assets/3d/texture_earth.jpg')

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x -= delta * 0.05

      mesh.current.rotation.y -= delta * 0.05
    }
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[30, 64, 64]} />
      <meshStandardMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
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
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <SpaceBackground />
        <Environment preset="night" />
        <ambientLight intensity={0.1} />
      </Canvas>
      <ContactForm />
    </div>
  )
}