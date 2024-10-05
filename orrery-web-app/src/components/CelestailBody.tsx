import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { CelestialBodyProps } from './CelestialBodyProps';

export default function CelestialBody({ body, time, setSelectedBody }: CelestialBodyProps) {
  const ref = useRef<THREE.Group>(null);
  const { radius, orbitRadius, color, orbitPeriod, tail } = body;
  const angle = (time / (orbitPeriod ?? 1)) * Math.PI * 2;

  const position: [number, number, number] = [
    Math.cos(angle) * (orbitRadius ?? 0),
    0,
    Math.sin(angle) * (orbitRadius ?? 0),
  ];

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(...position);
    }
  });

  return (
    <group ref={ref}>
      <mesh
        onClick={() => setSelectedBody(body)}
        onPointerOver={() => ref.current?.scale.set(1.1, 1.1, 1.1)}
        onPointerOut={() => ref.current?.scale.set(1, 1, 1)}
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
  );
}
