"use client"

import { useRef, useMemo } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Github, Rocket, Star } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Text } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    meshRef.current.rotation.y += 0.01
  })

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef}>
      <MeshDistortMaterial
        color="#4B0082"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.5}
      />
    </Sphere>
  )
}

function RotatingPlanet() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    meshRef.current.rotation.y += 0.005
  })

  return (
    <Sphere args={[0.5, 32, 32]} ref={meshRef} position={[2, 1, 0]}>
      <meshStandardMaterial color="#1E90FF" metalness={0.5} roughness={0.7} />
    </Sphere>
  )
}

function Particles({ count = 1000 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] += Math.sin(time + i * 0.1) * 0.01
      positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.01
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#FFFFFF" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <Text
      ref={textRef}
      position={[-2, 2, 0]}
      fontSize={0.5}
      color="#FFD700"
      anchorX="center"
      anchorY="middle"
    >
      Space Orrery
    </Text>
  )
}

export default function Footer() {
  return (
    <div className="bg-black text-white py-16 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <RotatingPlanet />
          <Particles />
          <AnimatedText />
        </Canvas>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              <Rocket className="mr-3 h-10 w-10" />
              Space Orrery
            </h3>
            <p className="text-lg text-gray-300 font-medium leading-relaxed">
              Embark on a cosmic journey through our interactive 3D orrery. 
              Proudly submitted to the NASA competition, bringing the universe to your screen.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl font-bold">Explore Our Universe</h4>
            <ul className="space-y-4 text-lg">
              {["Home", "About", "Explore", "Learn", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="hover:text-blue-400 transition-colors font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl font-bold">Join Our Cosmic Community</h4>
            <div className="flex space-x-6">
              {[Facebook, Instagram, Twitter, Github].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="hover:text-blue-400 transition-colors transform hover:scale-110 hover:rotate-12" 
                  aria-label={Icon.name}
                >
                  <Icon className="h-8 w-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg text-gray-300 font-medium">
            © {new Date().getFullYear()} Space Orrery. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 animate-bounce">
            <Star className="h-6 w-6 text-yellow-400 mr-2" />
            <span className="text-lg text-gray-300 font-bold">NASA Competition Entry</span>
          </div>
        </div>
      </div>
    </div>
  )
}