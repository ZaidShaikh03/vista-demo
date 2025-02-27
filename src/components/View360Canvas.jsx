import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function View360Canvas({ selectedImage, defaultAngle, resetTrigger }) {
  const [fade, setFade] = useState(false); // State for fade effect

  const SphereComponent = ({ image }) => {
    const texture = useLoader(THREE.TextureLoader, image);

    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    const geometry = new THREE.SphereGeometry(500, 120, 80);
    geometry.scale(-1, 1, 1);
    return (
      <mesh geometry={geometry}>
        <meshBasicMaterial
          map={texture}
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
    );
  };

  const CustomOrbitControls = ({ defaultAngle, resetTrigger }) => {
    const controlsRef = useRef(null);
    const cameraRef = useRef(null);
    useEffect(() => {
      if (controlsRef.current) {
        controlsRef.current.reset();
        controlsRef.current.setAzimuthalAngle(-defaultAngle);
        controlsRef.current.setPolarAngle(1.5707963267948966);
        controlsRef.current.update();
      }
    }, [defaultAngle, resetTrigger]);
    useFrame(() => {
      if (controlsRef.current) {
        const azimuthalAngle = controlsRef.current.getAzimuthalAngle();
        // const polarAngle = controlsRef.current.getPolarAngle()
        console.log("Azimuthal Angle:", azimuthalAngle);
        // console.log("Polar Angle:", polarAngle * 100);
      }
    });

    return (
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        rotateSpeed={-1}
        dampingFactor={0.1}
      />
    );
  };

  return (
    <>
      <Canvas
        className={`canvas-div ${fade ? "fade-out" : "fade-in"}`}
        camera={{
          // far: 500/0,
          fov: 90,
        }}
      >
        <ambientLight intensity={Math.PI / 2} />

        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <SphereComponent image={selectedImage} defaultAngle={defaultAngle} />
        </Suspense>
        <CustomOrbitControls
          defaultAngle={defaultAngle}
          resetTrigger={resetTrigger}
        />
      </Canvas>
    </>
  );
}

export default View360Canvas;
