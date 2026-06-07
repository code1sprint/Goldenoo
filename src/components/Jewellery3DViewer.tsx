/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Bounds, Environment } from '@react-three/drei';

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);

  return (
    <Bounds fit clip observe margin={1.35}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
  );
}

interface Jewellery3DViewerProps {
  modelUrl: string;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
}

function Scene({
  modelUrl,
  autoRotate,
  interactive,
}: {
  modelUrl: string;
  autoRotate: boolean;
  interactive: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <spotLight position={[6, 8, 4]} intensity={1.4} angle={0.35} penumbra={0.6} />
      <spotLight position={[-4, 4, -3]} intensity={0.7} color="#ffd700" />
      <pointLight position={[0, -1.5, 3]} intensity={0.35} color="#fff8e7" />

      <Suspense fallback={null}>
        <Model url={modelUrl} />
        <Environment preset="city" />
      </Suspense>

      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={1.5}
          maxDistance={7}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
        />
      )}
    </>
  );
}

export default function Jewellery3DViewer({
  modelUrl,
  className = '',
  autoRotate = true,
  interactive = true,
}: Jewellery3DViewerProps) {
  return (
    <div className={`relative bg-gradient-to-b from-zinc-900/80 to-zinc-950 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full touch-none"
      >
        <Scene modelUrl={modelUrl} autoRotate={autoRotate} interactive={interactive} />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-amber-gold/20 bg-zinc-950/70 px-2.5 py-1 text-[9px] font-bold text-amber-gold backdrop-blur-sm">
        بچرخانید · زوم
      </div>
    </div>
  );
}

export function preloadJewelleryModel(url: string) {
  useGLTF.preload(url);
}
