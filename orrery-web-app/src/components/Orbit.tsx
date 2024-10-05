import React from 'react';
import * as THREE from 'three';

interface OrbitProps {
  radius: number;
}

export default function Orbit({ radius }: OrbitProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.05, 64]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}
