import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CelestialBodyProps } from './CelestialBodyProps';

export default function InfoPanel({ selectedBody }: { selectedBody: CelestialBodyProps['body'] | null }) {
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
        <p>Orbit Radius: {selectedBody.orbitRadius} units</p>
        <p>Orbit Period: {selectedBody.orbitPeriod} Earth years</p>
      </CardContent>
    </Card>
  );
}
