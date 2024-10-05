"use client"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import AsteroidHazardEvaluation from '@/components/AsteroidHazardEvaluation'
import DidYouKnow from '@/components/Didyouknow'

const celestialBodies = {
  sun: {
    name: "Sun",
    radius: 2,
    color: "#FDB813",
    type: "star",
    description: "The Sun is the star at the center of our Solar System.",
    orbitRadius: 0,
    orbitPeriod: Infinity
  },
  planets: [
    { name: "Earth", eccentricity: 0.01671123, sma: 1.00000261, inclination: 0.00005, raan: 0, argPerihelion: 1.792, orbitRadius: 8, color: "#0077BE", orbitPeriod: 365.25, type: "planet", description: "Earth is the only known planet to support life and has one natural satellite, the Moon." },
  ],
  asteroids: [],
  comets: [],
  pha: [],
}

interface CelestialBodyProps {
  body: {
    name: string,
    radius: number,
    orbitRadius?: number,
    color: string,
    orbitPeriod?: number,
    type: string,
    description: string,
    tail?: boolean,
  },
  time: number,
  setSelectedBody: (body: CelestialBodyProps['body'] | null) => void
}

interface OrbitingBodyProps {
  body: {
    name: string,
    radius: number,
    orbitRadius?: number,
    color: string,
    orbitPeriod?: number,
    type: string,
    description: string,
    tail?: boolean,
  },
  time: number,
  setSelectedBody: (body: OrbitingBodyProps['body'] | null) => void,
  sma: number, e: number, inclination: number, raan: number, argPerihelion: number, orbitalPeriod: number, color: string
}

function CelestialBody({ body, time, setSelectedBody }: CelestialBodyProps) {
  const ref = useRef<THREE.Group>(null)
  const { radius, orbitRadius, color, orbitPeriod, tail } = body
  const angle = (time / (orbitPeriod ?? 1)) * Math.PI * 2;

  const position: [number, number, number] = [
    Math.cos(angle) * (orbitRadius ?? 0),
    0,
    Math.sin(angle) * (orbitRadius ?? 0),
  ];


  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(...position)
    }
  })

  return (
    <group ref={ref}>
      <mesh
        onClick={() => setSelectedBody(body)}
        onPointerOver={() => ref.current?.scale.set(1.1, 1.1, 1.1)} // Scale up on hover
        onPointerOut={() => ref.current?.scale.set(1, 1, 1)} // Scale back on hover out
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {tail && (
        <mesh position={[-radius * 2, 0, 0]}>
          <coneGeometry args={[radius / 2, radius * 4, 32]} />
          <meshStandardMaterial color={color} transparent opacity={0.5} />
        </mesh>
      )}
      <Html>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-white text-xs bg-black bg-opacity-50 px-1 rounded"
        >
          {body.name}
        </motion.div>
      </Html>
    </group>
  )
}

// Helper functions for Kepler's laws (eccentric anomaly, true anomaly conversions)
function eccentricAnomalyFromMeanAnomaly(M: number, e: number) {
  let E = M; // Initial guess
  let delta = 1;
  while (delta > 1e-6) {
    const newE = M + e * Math.sin(E);
    delta = Math.abs(newE - E);
    E = newE;
  }
  return E;
}

function trueAnomalyFromEccentricAnomaly(E: number, e: number) {
  return 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
}

function OrbitingBody({ sma, e, inclination, raan, argPerihelion, orbitalPeriod, color, speed }: 
  { sma: number, e: number, inclination: number, raan: number, argPerihelion: number, orbitalPeriod: number, color: string, speed: number }) {

    const meshRef = useRef<THREE.Mesh>(null);
    const [time, setTime] = useState(0);

    const a = sma * 5; // Semi-major axis
    const ecc = e;
    const inc = inclination;
    const RAAN = raan;
    const argPeriapsis = argPerihelion;

    const meanMotion = (2 * Math.PI) / orbitalPeriod;

    useFrame((state, delta) => {
      const deltaTime = delta * 100 * speed; // Now includes speed multiplier from the slider
      const newTime = time + deltaTime;
      setTime(newTime);

      const M = meanMotion * newTime;

      const E = eccentricAnomalyFromMeanAnomaly(M, ecc);
      const trueAnomaly = trueAnomalyFromEccentricAnomaly(E, ecc);
      const r = a * (1 - ecc * Math.cos(E));

      const x = r * Math.cos(trueAnomaly);
      const y = r * Math.sin(trueAnomaly);

      const cosRAAN = Math.cos(RAAN);
      const sinRAAN = Math.sin(RAAN);
      const cosInc = Math.cos(inc);
      const sinInc = Math.sin(inc);
      const cosArgPeri = Math.cos(argPeriapsis);
      const sinArgPeri = Math.sin(argPeriapsis);

      const X = x * (cosRAAN * cosArgPeri - sinRAAN * sinArgPeri * cosInc)
              - y * (cosRAAN * sinArgPeri + sinRAAN * cosArgPeri * cosInc);
      const Y = x * (sinRAAN * cosArgPeri + cosRAAN * sinArgPeri * cosInc)
              - y * (sinRAAN * sinArgPeri - cosRAAN * cosArgPeri * cosInc);
      const Z = x * (sinArgPeri * sinInc) + y * (cosArgPeri * sinInc);

      if (meshRef.current) {
        meshRef.current.position.set(X, Y, Z);
      }
    });

    return (
      <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-white text-xs bg-black bg-opacity-50 px-1 rounded"
        >
          {body.name}
        </motion.div>
      </Html>
    </group>
  );
}

function Orbit({ a, e, i, omega, Omega }: { a: number, e: number, i: number, omega: number, Omega: number }) {
  const points = [];
  a = a * 5;

  for (let nu = 0; nu <= 2 * Math.PI; nu += 0.01) {
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));

    const x = r * (Math.cos(nu + omega) * Math.cos(Omega) - Math.sin(nu + omega) * Math.cos(i) * Math.sin(Omega));
    const y = r * (Math.cos(nu + omega) * Math.sin(Omega) + Math.sin(nu + omega) * Math.cos(i) * Math.cos(Omega));
    const z = r * Math.sin(nu + omega) * Math.sin(i);

    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line>
      <primitive object={geometry} />
      <lineBasicMaterial color="white" />
    </line>
  );
}

function Scene({ time, setSelectedBody, speed }: { time: number, setSelectedBody: (body: CelestialBodyProps['body'] | null) => void, speed: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      <Stars radius={100} depth={60} count={7000} factor={5} saturation={0} fade speed={2} />

      {/* Sun */}
      <mesh onClick={() => setSelectedBody(celestialBodies.sun)}>
        <sphereGeometry args={[celestialBodies.sun.radius, 32, 32]} />
        <meshStandardMaterial color={celestialBodies.sun.color} emissive={celestialBodies.sun.color} emissiveIntensity={1.5} />
      </mesh>

      {/* Planets */}
      {celestialBodies.planets.map((planet) => (
        <React.Fragment key={planet.name}>
          <OrbitingBody 
            sma={planet.sma} 
            e={planet.eccentricity} 
            inclination={planet?.inclination} 
            raan={planet?.raan} 
            argPerihelion={planet?.argPerihelion} 
            orbitalPeriod={planet.orbitPeriod} 
            color={planet?.color} 
            speed={speed} // Pass the speed to the OrbitingBody component
          />
          <Orbit e={planet.eccentricity} a={planet.sma} i={planet?.inclination} omega={planet?.raan} Omega={planet?.argPerihelion} />
        </React.Fragment>
      ))}
    </>
  )
}

function InfoPanel({ selectedBody }: { selectedBody: CelestialBodyProps['body'] | null }) {
  if (!selectedBody) return null

  return (
    <Card className="absolute left-4 top-4 w-64 bg-opacity-80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-yellow-400 font-bold">{selectedBody.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{selectedBody.description}</p>
        <p>Type: <span className="text-yellow-300">{selectedBody.type}</span></p>
        <p>Radius: {selectedBody.radius} units</p>
        <p>Orbit Radius: {selectedBody.orbitRadius} units</p>
        <p>Orbit Period: {selectedBody.orbitPeriod} Earth years</p>
      </CardContent>
    </Card>
  )
}

function InteractiveOrrery() {
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedBody, setSelectedBody] = useState<CelestialBodyProps['body'] | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (!paused) {
        setTime((prevTime) => prevTime + 0.01); // Base time increment remains the same.
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [paused]);

  return (
    <div className="w-full h-[600px] relative bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-lg">
      <Canvas camera={{ position: [0, 20, 20], fov: 60 }}>
        <Scene time={time} setSelectedBody={setSelectedBody} speed={speed} />
        <OrbitControls />
      </Canvas>

      <InfoPanel selectedBody={selectedBody} />

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-gray-800 bg-opacity-90 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <Button className="font-bold text-lg" onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </Button>
        <div className="flex-1 mx-4">
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.1}
            max={5}
            step={0.1}
          />
        </div>
        <div className="text-lg font-bold">Speed: {speed.toFixed(1)}x</div>
      </div>
    </div>
  )
}

export default function SpaceEducationOrrery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
<<<<<<< HEAD
=======


>>>>>>> 15fe0d758367ec1bca4a4922f36fdcdd126ac108
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Interactive Solar System</h2>
          <InteractiveOrrery />
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Asteroid Hazard Evaluation</h2>
          <AsteroidHazardEvaluation />
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Fascinating Facts</h2>
          <DidYouKnow />
        </section>
      </main>
    </div>
  )
}
