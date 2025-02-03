import React, { useRef, useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute, Color, BufferAttribute, InterleavedBufferAttribute, MathUtils,  Mesh, DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";

// Helper function to generate random vertices
const generateVertices = (points: number = 55, size: number = 4): number[] => {
	const vertices: number[] = [];
	for (let i = 0; i < points; i++) {
		const x = Math.random() * size - size * 0.5;
		const y = Math.random() * size - size * 0.5;
		const z = Math.random() * size - size * 0.5;
		vertices.push(x, y, z);
	}
	return vertices;
};

// Helper function to generate colors based on vertices
const generateColors = (vertices: number[], colormod: number = 1): number[] => {
	const colors: number[] = [];
	for (let i = 0; i < vertices.length; i += 3) {
		const x = vertices[i];
		const y = vertices[i + 1];
		const z = vertices[i + 2];
		const distance = Math.sqrt(x * x + y * y + z * z);
		const color = new Color();
		const hue = distance * colormod % 1;
		color.setHSL(hue, 1, 0.5);
		colors.push(color.r, color.g, color.b);
	}
	return colors;
};

// Helper function to interpolate mesh attributes
const interpolateAttributes = (attr: BufferAttribute | InterleavedBufferAttribute, target: number[], delta: number) => {
	for (let i = 0; i < attr.count * 3; i++) {
		attr.array[i] = MathUtils.lerp(attr.array[i] as number, target[i], 2 * delta);
	}
	attr.needsUpdate = true;
};

// Helper function to rotate a mesh
const rotateMesh = (mesh: Mesh | null, delta: number) => {
	if (mesh) {
		mesh.rotation.y += 0.05 * delta;
		mesh.rotation.x += 0.05 * delta;
	}
};

// MorphingMesh component
const MorphingMesh: React.FC = () => {
	const solidMeshRef = useRef<Mesh>(null);
	const wireframeMeshRef = useRef<Mesh>(null);

	// Use refs instead of state for tracking morphing progress and targets
	const morphProgressRef = useRef(0);
	const morphTargetRef = useRef<number[] | null>(null);
	const targetColorsRef = useRef<number[]>([]);

	// Memoizing the initial vertices and colors
	const initialVertices = useMemo(() => generateVertices(), []);
	const initialColors = useMemo(() => generateColors(initialVertices), [initialVertices]);

	// Create the geometry with position and color attributes
	const geometry = useMemo(() => {
		const geo = new BufferGeometry();
		geo.setAttribute("position", new Float32BufferAttribute(initialVertices, 3));
		geo.setAttribute("color", new Float32BufferAttribute(initialColors, 3));
		return geo;
	}, [initialVertices, initialColors]);

	// handleClick generates new random geometry and colors
	// and sets the morph target to the new geometry
	// click position is use as modifier for color generation
	const handleClick = (event: any) => {
		const { point } = event;
		const colormod = Math.abs(point.x + point.y - point.z) * Math.random();
		const newVertices = generateVertices();
		const newColors = generateColors(newVertices, colormod);
		morphTargetRef.current = newVertices;
		targetColorsRef.current = newColors;
		morphProgressRef.current = 0;
	};

	useFrame((_, delta) => {
		if (solidMeshRef.current && wireframeMeshRef.current) {
		
			if (morphTargetRef.current) {
				const positionAttr = solidMeshRef.current.geometry.attributes.position;
				const colorAttr = solidMeshRef.current.geometry.attributes.color;

				interpolateAttributes(positionAttr, morphTargetRef.current, delta);
				interpolateAttributes(colorAttr, targetColorsRef.current, delta);

				morphProgressRef.current += delta;
				if (morphProgressRef.current >= 1) {
					morphProgressRef.current = 1;
					morphTargetRef.current = null;
					targetColorsRef.current = [];
				}

				solidMeshRef.current.geometry.computeVertexNormals();
				wireframeMeshRef.current!.geometry = solidMeshRef.current.geometry;
			}

			rotateMesh(solidMeshRef.current, delta);
			rotateMesh(wireframeMeshRef.current, delta);
		}
	});

	return (
		<>
			{/* Solid Mesh */}
			<mesh ref={solidMeshRef} geometry={geometry} onClick={handleClick}>
				<meshBasicMaterial vertexColors transparent opacity={0.3} side={DoubleSide} />
			</mesh>

			{/* Wireframe Mesh */}
			<mesh ref={wireframeMeshRef} geometry={geometry}>
				<meshBasicMaterial vertexColors depthWrite={false} opacity={.2} transparent side={DoubleSide} wireframe />
			</mesh>
		</>
	);
};

export default MorphingMesh;
