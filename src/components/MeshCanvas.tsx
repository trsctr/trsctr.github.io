import React from "react";
import { Canvas } from "@react-three/fiber";
import MorphingMesh from "./MorphingMesh";
import { PerspectiveCamera } from "@react-three/drei";

const MeshCanvas: React.FC = () => {
	return (
		<Canvas	gl={{ antialias: true, alpha: true }}>
			<PerspectiveCamera makeDefault position={[0, 0, 7]} />
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 5, 5]} intensity={1} />
			<MorphingMesh />
    	</Canvas>
	);
};

export default MeshCanvas;
