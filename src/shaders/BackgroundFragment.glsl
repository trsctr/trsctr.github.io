uniform float uTime;
uniform vec2 uResolution;
uniform float uRandom;

#define TWO_PI 6.28318
const float MAX_ITERATIONS = 1.5;
const float UV_OFFSET = 0.001;
const float IT_STEP = 0.1;


// Function to generate a color palette based on sinusoidal variation of RGB channels based on input value
vec3 generateColorPalette(float value) {
    vec3 baseColor = vec3(0.0, 0.0, 0.0);  // Base color for the palette
    vec3 amplitude = vec3(0.0, 0.1, 0.1);   // Amplitude/range of oscillation for each color channel
    vec3 frequency = vec3(0.0, 0.1, 0.1);  // Frequency of oscillation for each color channel
    vec3 phaseShift = vec3(0.0, uRandom, uRandom);   // Phase shift to offset each channel's oscillation

    // Return the color based on oscillation
    return baseColor + amplitude * cos(TWO_PI * (frequency * value + phaseShift));
}

void main() {
    // Calculate UV coordinates based on fragment coordinates (gl_FragCoord) and resolution
    // We normalize the UVs by dividing by the resolution, and then modify them slightly for animation
    vec2 uv = (gl_FragCoord.xy + uResolution.xy) / uResolution.y;
    uv.x += uTime * UV_OFFSET;  // Modifying the x-coordinate of UV over time
    uv.y -= uv.x * 0.1;     // Modifying the y-coordinate of UV based on x for a slanted effect
    
    // Store the original UV coordinates to be referred to in the loop (this is the 'reference' UV)
    vec2 referenceUv = uv; 
    
    // Initialize the final color output
    vec3 finalcolor = vec3(0.0);
    
    // Time modifier, affecting oscillations or movement over time
    float timemod = uTime * 0.01;
    float sinTimemod = sin(timemod);  // Precompute sine of time for reuse
    float cosTimemod = cos(timemod);  // Precompute cosine of time for reuse
    
    // Loop to create dynamic visual effects
    for (float i = 0.0; i < MAX_ITERATIONS; i += IT_STEP) {  // Iterate with a step of 0.1
        // Distort UV coordinates for visual effects based on sine, fract, and length
        uv -= fract(uv * i) - length(referenceUv * i) - sinTimemod;
        
        // Calculate a distance metric based on the UV and reference UV, multiplied by randomness factor
        // This distance is used to modulate the effect
        float distMetric = length(uv - referenceUv + i) * uRandom; 
        
        distMetric -= cos(i + timemod);  // Apply additional cosine-based transformation for added dynamic effect
        
        // Modify UV based on the sine of the distance metric to introduce more distortion
        uv -= sin(i * distMetric);
        
        // Generate color from the current UV coordinates and time, and adjust the intensity based on the distance metric and random uniform
        vec3 col = generateColorPalette(length(uv * referenceUv - distMetric) - uTime + uRandom);
        
        // Smooth the distance metric to create softer transitions
        distMetric = smoothstep(0.0, 0.9, distMetric);
        
        // Accumulate the color, weighted by the smooth distance metric
        finalcolor += col * distMetric;
    }

    // Output the final computed color for this fragment
    gl_FragColor = vec4(finalcolor, 1.0);
}