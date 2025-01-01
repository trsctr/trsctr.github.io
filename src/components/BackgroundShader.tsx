import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 }  from 'three';
import { useMemo, useRef } from 'react';
import vertexShader from '@/shaders/BackgroundVertex.glsl';
import fragmentShader from '@/shaders/BackgroundFragment.glsl';

const BackgroundShader = () => {
    const materialRef = useRef<ShaderMaterial | null>(null);
    const random = Math.random();
    
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

  export default BackgroundShader;