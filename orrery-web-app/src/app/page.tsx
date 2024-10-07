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
import spaceshipModel from '@/assets/models/spaceship.glb'
import SolarSystemEducation from '@/components/SolarSystemEducation'
import SpaceDebrisCleanup from '@/components/SpaceDebrisCleanup'
import cometsData from './cometsData.json'
import asteroidsData from './asteroidsData.json'
import phaData from './phaData.json'
import ScrollHeader from '@/components/ScrollHeader';

// eslint-disable-next-line prefer-const
let celestialBodies = {
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
      scale: [0.008, 0.008, 0.008] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.02, 0.02, 0.02] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.017, 0.017, 0.017] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.011, 0.011, 0.011] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.023, 0.023, 0.023] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.019, 0.019, 0.019] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.08, 0.08, 0.008] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
      scale: [0.078, 0.078, 0.078] as [number, number, number],
      epoch:+new Date('December 9, 2014')
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
    {"type": "comet", "name": "1P/Halley", "description": "", "tail": false, "rotationPeriod": 0, "sma": 17.832989055749998, "eccentricity": 0.9671429085, "inclination": 162.2626906, "raan": 58.42008098, "argPerihelion": 111.3324851, "orbitPeriod": 27491.8}
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
    color?: string,
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
    epoch?: number
  },
  time: number,
  setSelectedBody: (body: CelestialBodyProps['body'] | null) => void,
  paused: boolean,
  speed: number,
}

function CelestialBody({ body, time, setSelectedBody, paused, speed }: CelestialBodyProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { sma, eccentricity, inclination, raan, argPerihelion, orbitPeriod, model, scale, name, rotationPeriod, color, type, epoch } = body;

  const isSun = name === "Sun";


  const a = (sma || 1) * 5 * (type == "comet" ? 3.5 : 1); // Semi-major axis
  const ecc = eccentricity || 0; // Eccentricity
  const inc = (inclination || 0) * Math.PI / 180; // Inclination
  const RAAN = (raan || 0) * Math.PI / 180; // Right Ascension of Ascending Node
  const argPeriapsis = (argPerihelion || 0) * Math.PI / 180; // Argument of Periapsis
  const orbitalPeriod = orbitPeriod || 365.25; // Orbital Period

  const meanMotion = (2 * Math.PI) / orbitalPeriod;
  const rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 24 * 60 * 60) : 0.01;

  useFrame(() => {
    if (paused) return;

    if (!isSun && ref.current) {
      // Use time and speed to calculate mean anomaly
      const M = meanMotion * time * speed * 10; // Time evolution according to speed
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
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


function Orbit({ a, e, i, omega, Omega, type }: { a: number, e: number, i: number, omega: number, Omega: number, type?: string }) {
  const points = [];
  a = a * 5 * (type == "comet" ? 3.5 : 1);

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


function Player({ isCameraManual, orbitControlsRef }: { isCameraManual: boolean, orbitControlsRef: any }) {
  const cameraRef: Ref<any> = useRef()
  const playerRef: Ref<any> = useRef()
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
    const handleKeyDown = (e: any) => {
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

    const handleKeyUp = (e: any) => {
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

  useEffect(() => {
    if (playerRef?.current) {
      playerRef.current.position.set(0, 10, -2);
      playerRef.current.rotation.x = Math.PI / 2
      cameraRef.current.rotation.x = Math.PI / 2
    }
  }, []);

  useFrame(() => {
    if (!playerRef.current || !cameraRef.current || !orbitControlsRef.current) return;

    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3(-1, 0, 0).applyQuaternion(playerRef.current.quaternion);
    const rotationSpeed = 0.05;

    if (moveForward) direction.add(forward);
    if (moveBackward) direction.sub(forward);


    if (direction.length() > 0) {
      direction.normalize();
      playerRef.current.position.addScaledVector(direction, 0.1);
    }

    if (rotateLeft) {
      playerRef.current.rotation.y += rotationSpeed;  // Rotate left (yaw)
    }
    if (rotateRight) {
      playerRef.current.rotation.y -= rotationSpeed;  // Rotate right (yaw)
    }

    if (cameraState) {
      const cameraOffset = new THREE.Vector3(0, 0, 0); // Distance behind and above the spaceship
      const desiredCameraPos = playerRef.current.position.clone().add(cameraOffset.applyQuaternion(playerRef.current.quaternion));

      cameraRef.current.position.lerp(desiredCameraPos, 0.1); 

      cameraRef.current.lookAt(playerRef.current.position);


      orbitControlsRef.current.target.copy(playerRef.current.position);
      orbitControlsRef.current.update();
    }

  })
  
  function Spaceship() {
    const { scene } = useGLTF(spaceshipModel)
    return <primitive ref={playerRef} object={scene} />
  }

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault={cameraState} manual={cameraState} fov={75} position={[10, 20, 20]} />
      {cameraState ? <Spaceship /> : null} 
    </>

  )
}

// Updated Scene function
function Scene({ time, setSelectedBody, paused, speed, isSpaceshipMode, orbitalRef, orbitsVisible, starVisible }:
  { time: number, setSelectedBody: (body: CelestialBodyProps['body'] | null) => void, paused: boolean, speed: number, isSpaceshipMode: boolean, orbitalRef: Ref<any>, orbitsVisible: boolean, 
    starVisible: boolean
   }) {

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
      {starVisible ? <Stars radius={200} depth={60} count={7000} factor={5} saturation={0} fade speed={2} /> : null}

      {/* Sun */}
      <CelestialBody body={celestialBodies.sun} time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed} />

      {/* Planets */}
      {celestialBodies.planets.map((planet) => (
        <React.Fragment key={planet.name}>
          <CelestialBody body={planet} time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed}  />
          {orbitsVisible ? <Orbit
            a={planet.sma}
            e={planet.eccentricity}
            i={planet.inclination * Math.PI / 180}
            omega={planet.raan * Math.PI / 180}
            Omega={planet.argPerihelion * Math.PI / 180}
          /> : null}
        </React.Fragment>
      ))}

      {/* Asteroids, Comets, and PHAs */}
      {[...celestialBodies.asteroids, ...celestialBodies.comets, ...celestialBodies.pha].map((body) => (
        <React.Fragment key={body.name}>
          <CelestialBody body={body} time={time} setSelectedBody={setSelectedBody} paused={paused} speed={speed} />
          {orbitsVisible ? <Orbit
            a={body.sma}
            e={body.eccentricity}
            i={body.inclination * Math.PI / 180}
            omega={body.raan * Math.PI / 180}
            Omega={body.argPerihelion * Math.PI / 180}
            type={body.type}
          /> : null}
        </React.Fragment>
      ))}

      <Player isCameraManual={cameraManual} orbitControlsRef={orbitalRef} />
    </>
  );
}


function InfoPanel({ selectedBody }: { selectedBody: CelestialBodyProps['body'] | null }) {
  if (!selectedBody) return null;

  return (
    <Card className="absolute left-4 top-20 w-64 bg-opacity-80 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-yellow-400 font-bold">{selectedBody.name}</CardTitle>
      </CardHeader>
      <CardContent style={{overflow: 'auto'}}>
        <p>{selectedBody.description}</p>
        <p>Type: <span className="text-yellow-300">{selectedBody.type}</span></p>
        <p>Radius: {selectedBody?.radius} units</p>
        <p>Orbit Semi Major Axis: {selectedBody?.sma} AU</p>
        <p>Orbit Period: {selectedBody?.orbitPeriod} Earth years</p>
        <p>Orbit Eccentricity: {selectedBody?.eccentricity}</p>
      </CardContent>
    </Card>
  );
}

function SettingsPanel({ setOrbitVisibility, orbitsVisible, setStarVisibility, starsVisible } : {
  setOrbitVisibility: () => void, orbitsVisible : boolean, setStarVisibility : () => void, starsVisible : boolean
}) {
  const [comets, setComets] = useState<string[]>([])
  const [asteroids, setAsteroids] = useState<string[]>([])
  const [phas, setPhas] = useState<string[]>([])

  const handleComet = (comet : any) => {
    if (celestialBodies.comets.includes(comet)) {
      celestialBodies.comets = celestialBodies.comets.filter(el => el!== comet)
      setComets(prev => prev.filter(el => el !== comet.name))
    } else {
      celestialBodies.comets.push(comet)
      setComets(prev => [...prev, comet.name])
    }
  }

  const handleAst = (asteroid : any) => {
    if (celestialBodies.asteroids.includes(asteroid )) {
      celestialBodies.asteroids = celestialBodies.asteroids.filter(el => el!== asteroid )
      setAsteroids(prev => prev.filter(el => el !== asteroid.name))
    } else {
      celestialBodies.asteroids.push(asteroid )
      setAsteroids(prev => [...prev, asteroid.name])
    }
  }

  const handlePHA = (asteroid : any) => {
    if (celestialBodies.pha.includes(asteroid )) {
      celestialBodies.pha = celestialBodies.pha.filter(el => el!== asteroid )
      setPhas(prev => prev.filter(el => el !== asteroid.name))
    } else {
      celestialBodies.asteroids.push(asteroid )
      setPhas(prev => [...prev, asteroid.name])
    }
  }

  return (
    <Card className="absolute left-4 top-4 bg-opacity-50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-yellow-400 font-bold">Settings</CardTitle>
      </CardHeader>
      <CardContent style={{overflow: 'auto', height: 450, width: 300}}>
        <input type="checkbox" id="orbitVisibility" checked={orbitsVisible} onChange={setOrbitVisibility} />
        <label htmlFor="orbitVisibility" className="ml-2" >Show Orbits</label>
        <br />
        <input type="checkbox" id="starVisibility" checked={starsVisible} onChange={setStarVisibility} />
        <label htmlFor="starVisibility" className="ml-2" >Show Stars</label>
        <br /><br />
        <h2>Comets</h2>
        {cometsData.map(i => (
          <>
            <input type="checkbox"  onChange={() => handleComet(i)} checked={comets.includes(i.name)} />
            <label className="ml-2" >{i.name}</label>
            <br />
          </>
        ))}
        <br /><br />
        <h2>Asteroids</h2>
        {asteroidsData.map(i => (
          <>
            <input type="checkbox"  onChange={() => handleAst(i)} checked={asteroids.includes(i.name)} />
            <label className="ml-2" >{i.name}</label>
            <br />
          </>
        ))}
        <br /><br />
        <h2>PHAs</h2>
        {phaData.map(i => (
          <>
            <input type="checkbox"  onChange={() => handlePHA(i)} checked={phas.includes(i.name)} />
            <label className="ml-2" >{i.name}</label>
            <br />
          </>
        ))}
      </CardContent>
    </Card>
  );
}


function InteractiveOrrery() {
  const orbitControlsRef: Ref<any> = useRef()
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedBody, setSelectedBody] = useState<CelestialBodyProps['body'] | null>(null);
  const [paused, setPaused] = useState(false);
  const [isSpaceshipMode, setSpaceshipMode] = useState(false)
  const [isSettingsVisible, setSettingsVisible] = useState(false)
  const [orbitsVisible, setOrbitsVisible] = useState(true)
  const [starVisible, setStarVisible] = useState(true)

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
  }, [speed, paused]);

  return (
    
    <div className=" h-screen relative mb-2 mr-1 ml-1 mt-3 border border-black shadow-2xl">
      
      <Canvas camera={{ position: [0, 100, 100], fov: 45 }} className="bg-black">
        <Scene 
          time={time} 
          setSelectedBody={setSelectedBody} 
          paused={paused} 
          speed={speed} 
          isSpaceshipMode={isSpaceshipMode} 
          orbitalRef={orbitControlsRef}
          orbitsVisible={orbitsVisible} 
          starVisible={starVisible} 
        />
        <OrbitControls ref={orbitControlsRef} minDistance={10} maxDistance={500} />
      </Canvas>

      {/* Controls */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-4 z-20">
        <Button onClick={() => setSpaceshipMode(prev => !prev)}>Spaceship Mode</Button>
        <Button onClick={() => setSettingsVisible(prev => !prev)}>Settings</Button>
      </div>

      {isSettingsVisible &&
        <SettingsPanel
          orbitsVisible={orbitsVisible}
          setOrbitVisibility={() => setOrbitsVisible(prev => !prev)}
          starsVisible={starVisible}
          setStarVisibility={() => setStarVisible(prev => !prev)}
        />
      }

      {selectedBody && <InfoPanel selectedBody={selectedBody} />}

      {/* Responsive Bottom Control Panel */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row justify-between items-center bg-gray-800 bg-opacity-90 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-4 md:space-y-0 z-20">
        <Button className="font-bold text-lg" onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </Button>

        <div className="w-full md:flex-1 md:mx-4">
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.1}
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="text-lg font-bold w-full text-center md:text-left md:w-auto">
          Speed: {speed.toFixed(1)}x
        </div>
      </div>
    </div>
  );
}

export default function SpaceEducationOrrery() {
  useEffect(() => {
    const audio = document.querySelector("audio")
    if (audio) {
      audio.volume = 1
      audio.play()
    }
  }, [])

  return (
    <div className="text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Add the ScrollHeader component here */}
      <ScrollHeader />
     

      {/* Interactive Orrery Section */}
      <section className="h-screen w-full">
        <InteractiveOrrery />
      </section>

      {/* Foreground Content Sections */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Interactive Solar System</h2>
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

