import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 }  from 'three';
import { useMemo, useRef, memo } from 'react';
import vertexShader from '@/shaders/BackgroundVertex.glsl';
import fragmentShader from '@/shaders/BackgroundFragment.glsl';

const BackgroundShader = () => {
    const materialRef = useRef<ShaderMaterial | null>(null);
    const random = Math.random();
    
	// Initialize and Memoize shader uniforms to avoid re-setting them on every re-render
    const uniforms = useMemo(() => ({
    	uTime: { value: 0 },
    	uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    	uRandom : { value: random }
    }), [random]);

    useFrame((_, delta) => {
    	if (materialRef.current) {
        	materialRef.current.uniforms.uTime.value += delta;
    }
    });

    return (
    	<mesh position={[0, 0, -1]}>
			<planeGeometry args={[2, 2]} />
			<shaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				depthWrite={false}
				depthTest={false}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
    	</mesh>
    );
};


/*
 * BackgroundCanvas Component
 * 
 * Renders a full-screen, animated background using custom GLSL shaders with React Three Fiber.
 * 
 * Components:
 * 1. **BackgroundShader**:
 *    - Renders a plane geometry with a custom shader material.
 *    - **Shader Uniforms**:
 *      - `uTime`: Continuously updated every frame to drive time-based animations.
 *      - `uResolution`: Captures current window dimensions for responsive shader scaling.
 *      - `uRandom`: Generates a random value at component mount for introducing variation in effects.
 *    - **Animation**:
 *      - The `uTime` uniform is incremented on each frame using `useFrame` for real-time animation.
 * 
 * 2. **BackgroundCanvas**:
 *    - Wraps `BackgroundShader` inside a React Three Fiber `<Canvas>` component.
 *    - Applies reduced opacity for subtlety (`opacity-30`), allowing other UI elements to stand out.
 * 
 * Performance:
 * - `memo` is used to prevent unnecessary re-renders of the canvas for optimal performance.
 * - Depth writing and testing are disabled to ensure the background doesn't interfere with other 3D elements.
 * 
 */
const BackgroundCanvas = memo(() => (
	<Canvas className="w-full h-full opacity-30">
    	<BackgroundShader />
    </Canvas>
));

export default BackgroundCanvas;