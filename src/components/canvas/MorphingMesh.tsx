import React, { useRef, useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute, Color, BufferAttribute, InterleavedBufferAttribute, MathUtils,  Mesh, DoubleSide } from "three";
import { useFrame , ThreeEvent } from "@react-three/fiber";

/**
 * generateVertices
 * 
 * Generates an array of random vertices within a given size.
 * 
 * Parameters:
 * - `points` (number): Number of vertices to generate (default: 55).
 * - `size` (number): Size of the bounding box for vertices, determines size of the object (default: 4).
 * 
 * Returns:
 * - An array of random vertices.
 */

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


/**
 * generateColors
 * 
 * Generates an array of colors based on the distance of vertices from the origin.
 * 
 * Parameters:
 * - `vertices` (number[]): Array of vertices to generate colors for.
 * - `colormod` (number): Color modifier to adjust the hue of generated colors (default: 1).
 * 
 * Returns:
 * - An array of colors corresponding to the vertices.
 */
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

/**
 * interpolateAttributes
 * 
 * Interpolates mesh attributes towards a target value.
 * 
 * Parameters:
 * - `attr` (BufferAttribute | InterleavedBufferAttribute): Attribute to interpolate.
 * - `target` (number[]): Target values to interpolate towards.
 * - `delta` (number): Interpolation factor (0 to 1).
 */
const interpolateAttributes = (attr: BufferAttribute | InterleavedBufferAttribute, target: number[], delta: number) => {
	for (let i = 0; i < attr.count * 3; i++) {
		attr.array[i] = MathUtils.lerp(attr.array[i] as number, target[i], 2 * delta);
	}
	attr.needsUpdate = true;
};

/**
 * rotateMesh
 * 
 * Rotates a mesh around the x and y axes.
 * 
 * Parameters:
 * - `mesh` (Mesh | null): Mesh to rotate.
 * - `delta` (number): Rotation speed.
 */
const rotateMesh = (mesh: Mesh | null, delta: number) => {
	if (mesh) {
		mesh.rotation.y += 0.05 * delta;
		mesh.rotation.x += 0.05 * delta;
	}
};


/**
 * MorphingMesh Component
 * 
 * A 3D mesh component with interactive morphing geometry and dynamic vertex coloring.
 * 
 * Features:
 * - **Randomized Geometry & Colors**:
 *   - Generates a random mesh with custom vertices and colors.
 *   - Click events trigger morphing to a new random geometry.
 *   - Vertex colors are influenced by click position and distance from vertices.
 * 
 * - **Mesh Structure**:
 *   - Solid mesh with vertex colors and adjustable transparency.
 *   - Wireframe mesh overlay with matching vertex colors and transparency.
 *   - Both meshes share the same geometry for synchronized morphing.
 * 
 * - **Animation & Interaction**:
 *   - Smooth morphing animation using linear interpolation (LERP).
 *   - Mesh continuously rotates for visual effect.
 *   - Click events initiate both geometry morphing and color transitions.
 * 
 * - **Performance Optimizations**:
 *   - Uses React refs for efficient state management, preventing unnecessary re-renders.
 *	 - Memoizes initial vertices and colors to avoid recalculating on every render.
 *   - Leverages `useFrame` from `@react-three/fiber` for per-frame updates without impacting component performance.
 * 
 * Dependencies:
 * - `@react-three/fiber` for 3D rendering and frame updates.
 * 
 */
const MorphingMesh: React.FC = () => {
	const solidMeshRef = useRef<Mesh>(null);
	const wireframeMeshRef = useRef<Mesh>(null);

	// Use refs instead of state for tracking morphing progress and targets to avoid unnecessary re-renders
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
	const handleClick = (event: ThreeEvent<MouseEvent>) => {
		const { point } = event;
		const colormod = Math.abs(point.x + point.y - point.z) * Math.random();
		const newVertices = generateVertices();
		const newColors = generateColors(newVertices, colormod);
		morphTargetRef.current = newVertices;
		targetColorsRef.current = newColors;
		morphProgressRef.current = 0;
	};

	useFrame((_, delta) => {
		// Check if the meshes are initialized
		if (solidMeshRef.current && wireframeMeshRef.current) {
			
			// If a morph target is set, interpolate the attributes
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

			// Rotate the meshes
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
