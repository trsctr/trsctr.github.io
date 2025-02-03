import React from "react";
import { Canvas } from "@react-three/fiber";
import MorphingMesh from "./MorphingMesh";
import { PerspectiveCamera } from "@react-three/drei";

/**
 * MeshCanvas Component
 * 
 * Renders a canvas with a 3D mesh using React Three Fiber.
 * 
 * Components:
 * 1. **PerspectiveCamera**:
 *   - Sets up a perspective camera with default position.
 * 2. **MorphingMesh**:
 *  - Renders a 3D mesh with interactive morphing geometry.
 * 3. **Canvas**:
 *  - Wraps the camera and mesh components inside a React Three Fiber `<Canvas>` component.
 * 4. **Lighting**:
 * - Includes ambient and directional lighting for the scene.
 */
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
