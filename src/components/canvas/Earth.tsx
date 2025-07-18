import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loading";

const Earth = ({ scale }: { scale: number }) => {
  const earth = useGLTF("/other-models/planet/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={scale}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas = ({ scale = 2.5 }: { scale?: number }) => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
      }}
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth scale={scale} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
