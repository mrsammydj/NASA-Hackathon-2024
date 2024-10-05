import React from 'react';
import { useFrame } from '@react-three/fiber';
import { CelestialBodyProps, CelestialBodyType } from './CelestialBodyProps'; // Define the interface in a separate file
import { Stars } from '@react-three/drei';
import CelestialBody from './CelestailBody';
import Orbit from './Orbit';

export default function Scene({ time, setSelectedBody }: { time: number, setSelectedBody: (body: CelestialBodyProps['body'] | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      <Stars radius={100} depth={60} count={7000} factor={5} saturation={0} fade speed={2} />

      {/* Sun */}
      <mesh onClick={() => setSelectedBody(CelestialBody.sun)}>
        <sphereGeometry args={[CelestialBody.sun.radius, 32, 32]} />
        <meshStandardMaterial color={CelestialBody.sun.color} emissive={CelestialBody.sun.color} emissiveIntensity={1.5} />
      </mesh>

      {/* Celestial bodies like planets, asteroids, etc. */}
      {CelestialBody.planets.map((planet: CelestialBodyType) => (
        <React.Fragment key={planet.name}>
          <CelestialBody body={planet} time={time} setSelectedBody={setSelectedBody} />
          <Orbit radius={planet.orbitRadius} />
        </React.Fragment>
      ))}
    </>
  );
}
