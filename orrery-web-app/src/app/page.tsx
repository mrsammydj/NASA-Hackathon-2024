"use client"

import React, { useRef, useState, useEffect, type Ref } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Stars, useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import AsteroidHazardEvaluation from '@/components/AsteroidHazardEvaluation'
import DidYouKnow from '@/components/Didyouknow'
import sunModel from '@/assets/models/sunModel.glb'
import mercuryModel from '@/assets/models/mercuryModel.glb'
import venusModel from '@/assets/models/venusModel.glb'
import earthModel from '@/assets/models/earthModel.glb'
import marsModel from '@/assets/models/marsModel.glb'
import jupiterModel from '@/assets/models/jupiterModel.glb'
import saturnModel from '@/assets/models/saturnModel.glb'
import uranusModel from '@/assets/models/uranusModel.glb'
import neptuneModel from '@/assets/models/neptuneModel.glb'
import SolarSystemEducation from '@/components/SolarSystemEducation'
import SpaceDebrisCleanup from '@/components/SpaceDebrisCleanup'

const celestialBodies = {
  sun: { 
    name: "Sun", 
    radius: 2, 
    color: "#FDB813", 
    type: "star", 
    description: "The Sun is the star at the center of our Solar System.", 
    orbitRadius: 0, 
    orbitPeriod: Infinity,
    model: sunModel,
    rotationPeriod: 25.38,
    scale: [0.3, 0.3, 0.3] as [number, number, number] // Reduced size to fit better
  },
  planets: [
    { 
      name: "Mercury", 
      eccentricity: 0.20563, 
      sma: 0.38709893 * 3.5, 
      inclination: 7.00487, 
      raan: 48.33167, 
      argPerihelion: 29.12478, 
      color: "#A5A5A5", 
      orbitPeriod: 87.969, 
      type: "planet", 
      description: "Mercury is the smallest planet in our Solar System and the closest to the Sun.",
      model: mercuryModel,
      rotationPeriod: 58.646,
      scale: [0.008, 0.008, 0.008] as [number, number, number]
    },
    { 
      name: "Venus", 
      eccentricity: 0.00677, 
      sma: 0.72333199 * 3.5, 
      inclination: 3.39471, 
      raan: 76.68069, 
      argPerihelion: 54.85229, 
      color: "#FFC649", 
      orbitPeriod: 224.701, 
      type: "planet", 
      description: "Venus is often called Earth's twin because of their similar size and mass.",
      model: venusModel,
      rotationPeriod: -243.025,
      scale: [0.02, 0.02, 0.02] as [number, number, number]
    },
    { 
      name: "Earth", 
      eccentricity: 0.01671123, 
      sma: 1.00000261 * 3.5, 
      inclination: 0.00005, 
      raan: -11.26064, 
      argPerihelion: 114.20783, 
      color: "#0077BE", 
      orbitPeriod: 365.25, 
      type: "planet", 
      description: "Earth is the only known planet to support life and has one natural satellite, the Moon.",
      model: earthModel,
      rotationPeriod: 1,
      scale: [0.017, 0.017, 0.017] as [number, number, number]
    },
    { 
      name: "Mars", 
      eccentricity: 0.09341233, 
      sma: 1.52366231 * 3.5, 
      inclination: 1.85061, 
      raan: 49.57854, 
      argPerihelion: 286.46230, 
      color: "#E27B58", 
      orbitPeriod: 686.980, 
      type: "planet", 
      description: "Mars is often called the Red Planet due to its reddish appearance.",
      model: marsModel,
      rotationPeriod: 1.03,
      scale: [0.011, 0.011, 0.011] as [number, number, number]
    },
    { 
      name: "Jupiter", 
      eccentricity: 0.04839266, 
      sma: 5.20336301 * 3.5, 
      inclination: 1.30530, 
      raan: 100.55615, 
      argPerihelion: 274.25744, 
      color: "#F5D76E", 
      orbitPeriod: 4332.59, 
      type: "planet", 
      description: "Jupiter is the largest planet in our Solar System.",
      model: jupiterModel,
      rotationPeriod: 0.41,
      scale: [0.023, 0.023, 0.023] as [number, number, number]
    },
    { 
      name: "Saturn", 
      eccentricity: 0.05415060, 
      sma: 9.53707032 * 3.5, 
      inclination: 2.48446, 
      raan: 113.71504, 
      argPerihelion: 338.71695, 
      color: "#F6E3A3", 
      orbitPeriod: 10759.22, 
      type: "planet", 
      description: "Saturn is known for its prominent ring system.",
      model: saturnModel,
      rotationPeriod: 0.45,
      scale: [0.019, 0.019, 0.019] as [number, number, number]
    },
    { 
      name: "Uranus", 
      eccentricity: 0.04716771, 
      sma: 19.19126393 * 3.5, 
      inclination: 0.76986, 
      raan: 74.22988, 
      argPerihelion: 96.73436, 
      color: "#A3E4D7", 
      orbitPeriod: 30688.5, 
      type: "planet", 
      description: "Uranus is the third-largest planet in our Solar System.",
      model: uranusModel,
      rotationPeriod: -0.72,
      scale: [0.08, 0.08, 0.008] as [number, number, number]
    },
    { 
      name: "Neptune", 
      eccentricity: 0.00858587, 
      sma: 30.06896348 * 3.5, 
      inclination: 1.76917, 
      raan: 131.72169, 
      argPerihelion: 273.24966, 
      color: "#5DADE2", 
      orbitPeriod: 60195, 
      type: "planet", 
      description: "Neptune is the eighth and farthest-known Solar planet from the Sun.",
      model: neptuneModel,
      rotationPeriod: 0.67,
      scale: [0.078, 0.078, 0.078] as [number, number, number]
    },
  ],
  asteroids: [
    { 
      name: "Ceres", 
      eccentricity: 0.0758,
      sma: 2.7676 * 3.5,
      inclination: 10.5934,
      raan: 80.3277,
      argPerihelion: 73.5968,
      color: "#8B8989", 
      orbitPeriod: 1681.63, 
      type: "asteroid", 
      description: "Ceres is the largest object in the asteroid belt between Mars and Jupiter.",
      rotationPeriod: 0.3781,
      scale: [0.0002, 0.0002, 0.0002] as [number, number, number]
    },
    { 
      name: "Vesta", 
      eccentricity: 0.0895,
      sma: 2.3615 * 3.5,
      inclination: 7.1400,
      raan: 103.8430,
      argPerihelion: 151.1990,
      color: "#A0522D", 
      orbitPeriod: 1325.75, 
      type: "asteroid", 
      description: "Vesta is one of the largest asteroids in the Solar System.",
      rotationPeriod: 0.2226,
      scale: [0.01, 0.01, 0.01] as [number, number, number]
    },
  ],
  comets: [
    { 
      name: "Halley's Comet", 
      eccentricity: 0.96714,
      sma: 17.8341 * 3.5,
      inclination: 162.262,
      raan: 58.42,
      argPerihelion: 111.33,
      color: "#87CEEB", 
      orbitPeriod: 27510.75, 
      type: "comet", 
      description: "Halley's Comet is a short-period comet visible from Earth every 75-76 years.",
      tail: true,
      rotationPeriod: 0,
      scale: [0.01, 0.01, 0.01] as [number, number, number]
    },
  ],
  pha: [
    { 
      name: "Apophis", 
      eccentricity: 0.1915,
      sma: 0.9224 * 3.5,
      inclination: 3.3311,
      raan: 204.0455,
      argPerihelion: 126.4010,
      color: "#FF4500", 
      orbitPeriod: 323.56, 
      type: "pha", 
      description: "Apophis is a near-Earth asteroid that caused a brief period of concern in December 2004.",
      rotationPeriod: 0.001,
      scale: [0.005, 0.005, 0.005] as [number, number, number]
    },
  ],
};

interface CelestialBodyProps {
  body: {
    name: string,
    radius?: number,
    orbitRadius?: number,
    color: string,
    orbitPeriod?: number,
    type: string,
    description: string,
    tail?: boolean,
    model?: string,
    scale?: [number, number, number],
    eccentricity?: number,
    sma?: number,
    inclination?: number,
    raan?: number,
    argPerihelion?: number,
    rotationPeriod?: number,
  },
  time: number,
  setSelectedBody: (body: CelestialBodyProps['body'] | null) => void,
  paused: boolean,
  speed: number,
}

function CelestialBody({ body, time, setSelectedBody, paused, speed }: CelestialBodyProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { sma, eccentricity, inclination, raan, argPerihelion, orbitPeriod, model, scale, name, rotationPeriod, color, type } = body;

  const isSun = name === "Sun";

  const a = (sma || 1) * 5; // Semi-major axis
  const ecc = eccentricity || 0; // Eccentricity
  const inc = (inclination || 0) * Math.PI / 180; // Inclination
  const RAAN = (raan || 0) * Math.PI / 180; // Right Ascension of Ascending Node
  const argPeriapsis = (argPerihelion || 0) * Math.PI / 180; // Argument of Periapsis
  const orbitalPeriod = orbitPeriod || 365.25; // Orbital Period

  const meanMotion = (2 * Math.PI) / orbitalPeriod; // Mean motion
  const rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 24 * 60 * 60) : 0.01; // Rotation speed

  useFrame(() => {
    if (paused) return;

    if (!isSun && ref.current) {
      // Use time and speed to calculate mean anomaly
      const M = meanMotion * time * speed; // Time evolution according to speed
      const E = eccentricAnomalyFromMeanAnomaly(M, ecc); // Eccentric anomaly
      const trueAnomaly = trueAnomalyFromEccentricAnomaly(E, ecc); // True anomaly

      // Radius calculation from eccentric anomaly
      const r = a * (1 - ecc * Math.cos(E));

      // Position in the orbital plane
      const xOrbital = r * Math.cos(trueAnomaly);
      const yOrbital = r * Math.sin(trueAnomaly);

      // Apply rotation for argument of periapsis
      const x1 = xOrbital * Math.cos(-argPeriapsis) - yOrbital * Math.sin(-argPeriapsis);
      const y1 = xOrbital * Math.sin(-argPeriapsis) + yOrbital * Math.cos(-argPeriapsis);

      // Apply inclination rotation
      const y2 = y1 * Math.cos(-inc);
      const z2 = y1 * Math.sin(-inc);

      // Apply rotation for RAAN
      const x = x1 * Math.cos(-RAAN) - y2 * Math.sin(-RAAN);
      const y = x1 * Math.sin(-RAAN) + y2 * Math.cos(-RAAN);
      const z = z2;

      // Set the calculated position
      ref.current.position.set(x, y, z);
    }

    // Apply rotation to the planet itself
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed * speed * 50; // Rotate the planet based on speed
    }
  });

  const handleHover = (hover: boolean) => {
    setHovered(hover);
  };

  useEffect(() => {
    if (ref.current) {
      const baseScale = scale ? scale[0] : 1;
      const targetScale = hovered ? baseScale * 1.1 : baseScale;
      ref.current.scale.setScalar(targetScale);
    }
  }, [hovered, scale]);

  const renderBody = () => {
    if (model) {
      const { scene } = useGLTF(model);

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.metalness = isSun ? 0.1 : 0.5;
            child.material.roughness = isSun ? 0.2 : 0.7;
            if (isSun) {
              child.material.emissive = new THREE.Color(color);
              child.material.emissiveIntensity = 1;
            } else {
              child.material.emissiveIntensity = 0.1;
            }
          }
        }
      });

      return <primitive object={scene} />;
    } else {
      // Adjust the sphere size and material for better visibility
      const sphereRadius = type === "planet" ? 0.5 : 0.2; // Smaller radius for non-planets
      return (
        <mesh>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSun ? 1 : 0.5}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      );
    }
  };

  return (
    <group
      ref={ref}
      scale={scale}
      onClick={() => setSelectedBody(body)}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
      position={isSun ? [0, 0, 0] : undefined}
    >
      {renderBody()}
      {body.tail && (
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.1, 1, 32]} />
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
  );
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

function Orbit({ a, e, i, omega, Omega }: { a: number, e: number, i: number, omega: number, Omega: number }) {
  const points = [];
  a = a * 5; // Semi-major axis adjustment

  for (let nu = 0; nu <= 2 * Math.PI; nu += 0.01) {
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));

    // Apply the series of transformations to plot the orbit
    const xOrbital = r * Math.cos(nu);
    const yOrbital = r * Math.sin(nu);

    const x1 = xOrbital * Math.cos(-Omega) - yOrbital * Math.sin(-Omega);
    const y1 = xOrbital * Math.sin(-Omega) + yOrbital * Math.cos(-Omega);

    const y2 = y1 * Math.cos(-i);
    const z2 = y1 * Math.sin(-i);

    const x = x1 * Math.cos(-omega) - y2 * Math.sin(-omega);
    const y = x1 * Math.sin(-omega) + y2 * Math.cos(-omega);
    const z = z2;

    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  );
}


function Player({ isCameraManual, orbitControlsRef } : { isCameraManual: boolean, orbitControlsRef: any }) {
  const cameraRef : Ref<any> = useRef()
  const playerRef : Ref<any> = useRef()
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(false);
  const [rotateRight, setRotateRight] = useState(false);
  const [cameraState, setCameraState] = useState(false)

  useEffect(() => {
    if (!cameraRef.current) return
    setCameraState(isCameraManual)
  }, [isCameraManual])

  // Keyboard events to set the movement directions
  useEffect(() => {
    const handleKeyDown = (e : any) => {
      switch (e.code) {
        case 'KeyW':
          setMoveForward(true);
          break;
        case 'KeyS':
          setMoveBackward(true);
          break;
        case 'KeyA':
          setRotateLeft(true);
          break;
        case 'KeyD':
          setRotateRight(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e : any) => {
      switch (e.code) {
        case 'KeyW':
          setMoveForward(false);
          break;
        case 'KeyS':
          setMoveBackward(false);
          break;
        case 'KeyA':
          setRotateLeft(false);
          break;
        case 'KeyD':
          setRotateRight(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!playerRef.current || !cameraRef.current || !orbitControlsRef.current) return;

    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(playerRef.current.quaternion);
    const rotationSpeed = 0.05;

    if (moveForward) direction.add(forward);
    if (moveBackward) direction.sub(forward);

    direction.normalize();
    playerRef.current.position.addScaledVector(direction, 0.1);

    if (rotateLeft) {
      playerRef.current.rotation.y += rotationSpeed;  // Rotate left (yaw)
    }
    if (rotateRight) {
      playerRef.current.rotation.y -= rotationSpeed;  // Rotate right (yaw)
    }

    if (cameraState) {
      const offset = new THREE.Vector3(0, 5, 10); // Camera offset from player (5 units up, 10 units back)
      const cameraPos = playerRef.current.position.clone().add(offset.applyQuaternion(playerRef.current.quaternion)); // Adjust camera position
  
      cameraRef.current.position.copy(cameraPos);
      cameraRef.current.lookAt(playerRef.current.position);
  
      orbitControlsRef.current.target.copy(playerRef.current.position);
      orbitControlsRef.current.update();
    }

  })

  return (
    <>
    <PerspectiveCamera ref={cameraRef} makeDefault={cameraState} manual={cameraState} fov={75} position={[10, 5, 10]} />
    <mesh ref={playerRef} position={[10, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'00ff00'} />
    </mesh>
    </>
    
  )
}

// Updated Scene function
function Scene({ time, setSelectedBody, paused, speed, isSpaceshipMode, orbitalRef }: 
  { time: number, setSelectedBody: (body: CelestialBodyProps['body'] | null) => void, paused: boolean, speed: number, isSpaceshipMode: boolean, orbitalRef: Ref<any> }) {

  const [cameraManual, setCameraManual] = useState(false);
  
  useEffect(() => {
    setCameraManual(isSpaceshipMode);
  }, [isSpaceshipMode]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 0]} intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />
      <Stars radius={200} depth={60} count={7000} factor={5} saturation={0} fade speed={2} />

      {/* Sun */}
      <CelestialBody body={celestialBodies.sun} time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed} />

      {/* Planets */}
      {celestialBodies.planets.map((planet) => (
        <React.Fragment key={planet.name}>
          <CelestialBody body={planet} time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed} />
          <Orbit 
            a={planet.sma} 
            e={planet.eccentricity} 
            i={planet.inclination * Math.PI / 180} 
            omega={planet.raan * Math.PI / 180} 
            Omega={planet.argPerihelion * Math.PI / 180} 
          />
        </React.Fragment>
      ))}

      {/* Asteroids, Comets, and PHAs */}
      {[...celestialBodies.asteroids, ...celestialBodies.comets, ...celestialBodies.pha].map((body) => (
        <React.Fragment key={body.name}>
          <CelestialBody body={body} time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed} />
          <Orbit 
            a={body.sma} 
            e={body.eccentricity} 
            i={body.inclination * Math.PI / 180} 
            omega={body.raan * Math.PI / 180} 
            Omega={body.argPerihelion * Math.PI / 180} 
          />
        </React.Fragment>
      ))}

      <Player isCameraManual={cameraManual} orbitControlsRef={orbitalRef} />
    </>
  );
}


function InfoPanel({ selectedBody }: { selectedBody: CelestialBodyProps['body'] | null }) {
  if (!selectedBody) return null;

  return (
    <Card className="absolute left-4 top-4 w-64 bg-opacity-80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-yellow-400 font-bold">{selectedBody.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{selectedBody.description}</p>
        <p>Type: <span className="text-yellow-300">{selectedBody.type}</span></p>
        <p>Radius: {selectedBody.radius} units</p>
        <p>Orbit Radius: {selectedBody.sma} AU</p>
        <p>Orbit Period: {selectedBody.orbitPeriod} Earth years</p>
      </CardContent>
    </Card>
  );
}

function InteractiveOrrery() {
  const orbitControlsRef : Ref<any> = useRef()
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedBody, setSelectedBody] = useState<CelestialBodyProps['body'] | null>(null);
  const [paused, setPaused] = useState(false);
  const [isSpaceshipMode, setSpaceshipMode] = useState(false)

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (!paused) {
        setTime((prevTime) => prevTime + 0.01); // Base time increment remains the same.;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed, paused]);

  return (
    <div className="w-full h-[600px] relative bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-lg">
      <Canvas camera={{ position: [0, 100, 100], fov: 45 }}>
        <Scene time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed} isSpaceshipMode={isSpaceshipMode} orbitalRef={orbitControlsRef} />
        <OrbitControls ref={orbitControlsRef} minDistance={10} maxDistance={500} />
      </Canvas>
      

      <Button onClick={() => setSpaceshipMode(prev => !prev)}>Spaceship Mode</Button>
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
  );
}

export default function SpaceEducationOrrery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Interactive Solar System</h2>
          <InteractiveOrrery />
        </section>
        <section className="mb-12">
          <AsteroidHazardEvaluation />
        </section>
          
        <section className="mb-12 rounded-lg">
          <SolarSystemEducation />
        </section>
         
        <section className="mb-12 rounded-lg">
          <SpaceDebrisCleanup />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Fascinating Facts</h2>
          <DidYouKnow />
        </section>
      </main>
    </div>
  )
}