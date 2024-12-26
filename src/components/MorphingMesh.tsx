import React, { useRef, useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute, Color } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

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

const MorphingMesh: React.FC = () => {
  const solidMeshRef = useRef<THREE.Mesh>(null);
  const wireframeMeshRef = useRef<THREE.Mesh>(null);

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

  const handleClick = (event: any) => {
    const { point } = event;
    const colormod = Math.abs(point.x + point.y - point.z) * Math.random();
    const newVertices = generateVertices();
    const newColors = generateColors(newVertices, colormod);
    morphTargetRef.current = newVertices;
    targetColorsRef.current = newColors;
    morphProgressRef.current = 0;
  };

  useFrame((state, delta) => {
    if (solidMeshRef.current && wireframeMeshRef.current) {
      if (morphTargetRef.current) {
        const positionAttr = solidMeshRef.current.geometry.attributes.position;
        const colorAttr = solidMeshRef.current.geometry.attributes.color;

        if (positionAttr && colorAttr && morphProgressRef.current < 1) {
          // Smoothly interpolate vertices from current position to target
          for (let i = 0; i < positionAttr.count * 3; i++) {
            const current = positionAttr.array[i];
            const target = morphTargetRef.current[i];
            positionAttr.array[i] = THREE.MathUtils.lerp(current, target, 2 * delta); // Linear interpolation, scaled by delta time
          }

          // Smoothly interpolate colors from current colors to new target colors
          for (let i = 0; i < colorAttr.count * 3; i++) {
            const currentColor = colorAttr.array[i];
            const targetColor = targetColorsRef.current[i];
            colorAttr.array[i] = THREE.MathUtils.lerp(currentColor, targetColor, 2 * delta); // Linear interpolation, scaled by delta time
          }

          positionAttr.needsUpdate = true; // Indicate that geometry needs updating
          colorAttr.needsUpdate = true; // Indicate that geometry needs updating for both position and color

          // Update progress and stop morphing once complete
          morphProgressRef.current += 0.5 * delta; // Multiply by delta to smooth across frame rate
          if (morphProgressRef.current >= 1) {
            console.log("Morphing complete!");
            morphProgressRef.current = 1;
            morphTargetRef.current = null; // Stop morphing when complete
            targetColorsRef.current = []; // Clear target colors
          }
        }
      }

      // Optionally recompute normals after modifying vertices
      solidMeshRef.current.geometry.computeVertexNormals();
      wireframeMeshRef.current.geometry = solidMeshRef.current.geometry; // Sync the geometries

      // Rotate the mesh for effect
      solidMeshRef.current.rotation.y += 0.05 * delta;
      solidMeshRef.current.rotation.x += 0.05 * delta;
      wireframeMeshRef.current.rotation.y += 0.05 * delta;
      wireframeMeshRef.current.rotation.x += 0.05 * delta;
    }
  });

  return (
    <>
      {/* Solid Mesh */}
      <mesh ref={solidMeshRef} geometry={geometry} onClick={handleClick}>
        <meshBasicMaterial vertexColors transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Wireframe Mesh */}
      <mesh ref={wireframeMeshRef} geometry={geometry}>
      <meshBasicMaterial vertexColors depthWrite={false} opacity={.2} transparent side={THREE.DoubleSide} wireframe />
      </mesh>
    </>
  );
};

export default MorphingMesh;
