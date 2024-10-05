import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Scene from './Scene';
import InfoPanel from './InfoPanel';

function Orrery() {
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedBody, setSelectedBody] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (!paused) {
        setTime((prevTime) => prevTime + 0.01 * speed);
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed, paused]);

  return (
    <div className="w-full h-[600px] relative bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-lg">
      <Canvas camera={{ position: [0, 20, 20], fov: 60 }}>
        <Scene time={time} setSelectedBody={setSelectedBody} />
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
  );
}

export default Orrery;
