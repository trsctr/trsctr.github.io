import React from "react";
import { Canvas } from "@react-three/fiber";
import MorphingMesh from "./MorphingMesh";
import { PerspectiveCamera, PerformanceMonitor } from "@react-three/drei";

const Scene: React.FC = () => {
  return (
    <Canvas
          gl={{ antialias: true, alpha: true }}
        >        <PerformanceMonitor
                  onDecline={() => console.log('Main canvas performance dropped')}
                  onIncline={() => console.log('Main canvas performance improved')}
                >
          <PerspectiveCamera makeDefault position={[0, 0, 7]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <MorphingMesh />
          </PerformanceMonitor>
    </Canvas>

  );
};

export default Scene;
