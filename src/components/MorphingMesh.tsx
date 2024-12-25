import React, { useRef, useState, useMemo } from "react";
import { Mesh, BufferGeometry, Float32BufferAttribute, Color } from "three";
import { useFrame } from "@react-three/fiber"; // This will allow us to animate
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
const generateColors = (vertices: number[], colormod: number = 2): number[] => {
  const colors: number[] = [];
  console.log(colormod)
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];
    const distance = Math.sqrt(x * x + y * y + z * z);
    const color = new Color();
    color.setHSL((distance / 10) * colormod, 1, 0.5);
    colors.push(color.r, color.g, color.b);
  }
  return colors;
};

const MorphingMesh: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const [morphTarget, setMorphTarget] = useState<number[] | null>(null);
  const [morphProgress, setMorphProgress] = useState(0);
  const [targetColors, setTargetColors] = useState<number[]>([]);

  // Memoizing the initial vertices and colors so they are not recalculated on each render
  const initialVertices = useMemo(() => generateVertices(), []);
  const initialColors = useMemo(() => generateColors(initialVertices), [initialVertices]);

  // Create the geometry with position and color attributes
  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(initialVertices, 3));
    geo.setAttribute("color", new Float32BufferAttribute(initialColors, 3));
    return geo;
  }, [initialVertices, initialColors]);

  const handleClick = () => {
      console.log("Morphing mesh...");
      const newVertices = generateVertices(); // Create new target vertices
      const newColors = generateColors(newVertices, Math.random()*50); // Generate colors for new vertices
      setMorphTarget(newVertices); // Set new morph target
      setTargetColors(newColors);
      setMorphProgress(0); // Reset progress
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (morphTarget) {
        const positionAttr = meshRef.current.geometry.attributes.position;
        const colorAttr = meshRef.current.geometry.attributes.color;

        if (positionAttr && colorAttr && morphProgress < 1) {
          // Smoothly interpolate vertices from current position to target
          for (let i = 0; i < positionAttr.count * 3; i++) {
            const current = positionAttr.array[i];
            const target = morphTarget[i];
            positionAttr.array[i] = THREE.MathUtils.lerp(current, target,  2 * delta); // Linear interpolation, scaled by delta time
          }

          // Smoothly interpolate colors from current colors to new target colors
          for (let i = 0; i < colorAttr.count * 3; i++) {
            const currentColor = colorAttr.array[i];
            const targetColor = targetColors[i];
            colorAttr.array[i] = THREE.MathUtils.lerp(currentColor, targetColor, 2 * delta); // Linear interpolation, scaled by delta time
          }

          positionAttr.needsUpdate = true; // Indicate that geometry needs updating
          colorAttr.needsUpdate = true; // Indicate that geometry needs updating for both position and color

          // Update progress and stop morphing once complete
          setMorphProgress((prev) => {
            const newProgress = prev + .5 * delta; // Multiply by delta to smooth across frame rate
            if (newProgress >= 1) {
              console.log("Morphing complete!");
              setMorphProgress(1);
              setMorphTarget(null); // Stop morphing when complete
              setTargetColors([]); // Clear target colors
            }
            return newProgress;
          });
        }
      }

      // Optionally recompute normals after modifying vertices
      meshRef.current.geometry.computeVertexNormals();

      // Rotate the mesh for effect
      meshRef.current.rotation.y += 0.05 * delta;
      meshRef.current.rotation.x += 0.05 * delta;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} onClick={handleClick}>
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default MorphingMesh;
