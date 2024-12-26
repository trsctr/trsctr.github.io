import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

const BackgroundShader = () => {
    const materialRef = useRef<THREE.ShaderMaterial>();
    const random = Math.random();
    console.log(random)
    const uniforms = useMemo(() => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uRandom : { value: random }
    }), []);
  
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
          vertexShader={`
            void main() {
                gl_Position = vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec2 uResolution;
            uniform float uRandom;
  
            vec3 palette(float t) {
                vec3 a = vec3(0.0, 0.0, 0.0);
                vec3 b = vec3(0.0, .1, .1);
                vec3 c = vec3(uRandom, .1 ,.1);
                vec3 d = vec3(4.0, .1, .1);

                return a + b*cos( 6.28318*(c*t+d) );
            }


            void main() {
                vec2 uv = (gl_FragCoord.xy + uResolution.xy) / uResolution.y;
                uv.x += uTime*.001;
                uv.y -= uv.x*.1;
                vec2 uv0 = uv;
                vec3 finalcolor = vec3(0.0);
                
                for (float i =.0; i < 1.5; i += 0.1) {
                    uv -= fract(uv * i) - length(uv0 * i) - sin(uTime*.01);
                    float d = length(uv - uv0 + i) * uRandom;
                    d -= cos(i + uTime*.01);
                    uv -= sin(i * d);

                    vec3 col = palette(length(uv * uv0 - d) - uTime*.1 + uRandom);

                    d = smoothstep(0.0, .9, d); 
                    finalcolor += col * d;
                }

                gl_FragColor = vec4(finalcolor, 1.);
            }
          `}
        />
      </mesh>
    );
  };

  export default BackgroundShader;