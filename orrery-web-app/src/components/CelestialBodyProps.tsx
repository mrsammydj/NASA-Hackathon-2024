export interface CelestialBodyType {
    name: string;
    radius: number;
    orbitRadius?: number;
    color: string;
    orbitPeriod?: number;
    type: string;
    description: string;
    tail?: boolean;
  }
  
  export interface CelestialBodyProps {
    body: CelestialBodyType;
    time: number;
    setSelectedBody: (body: CelestialBodyType | null) => void;
  }
  