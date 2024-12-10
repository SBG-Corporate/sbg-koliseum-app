'use client'

import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import PageBase from './PageBase';

export default function PageMap() {

  const [geojson, setGeojson] = React.useState<any>(null);
  const [provinces, setProvinces] = React.useState<{ shape: THREE.Shape; color: string }[]>([]);
  const createProvinceShapes = () => {
    if (!geojson || !geojson.features) return [];
    const shapes: { shape: THREE.Shape; color: string }[] = [];
    geojson.features.forEach((feature: any) => {
      if (feature.geometry.type === "MultiPolygon") {
        const shape = new THREE.Shape();
        feature.geometry.coordinates.forEach((ring: any, ringIndex: number) => {
          ring.forEach(([x, y]: [number, number], index: number) => {
            if (index === 0 && ringIndex === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
          });
        });
        shapes.push({ shape, color: `hsl(${Math.random() * 360}, 50%, 50%)` });
      }
    });
    return shapes;
  };

  useEffect(() => {
    fetch('/spain.geojson')
      .then((response) => response.json())
      .then((data) => {
        console.log("DEBUG: data.features: ", data.features);
        setGeojson(data)
        setProvinces(createProvinceShapes());
        console.log("DEBUG: provinces: ", provinces);
      });
  }, []);
  return (
    <PageBase>
      <Canvas className='border-2 border-solid border-red-800 h-full'
        style={{ height: '88vh' }}
      >
      <Suspense fallback={null}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <group position={[-5, -5, 0]}>
          {provinces.map((province, index) => (
            <mesh key={index}>
              <shapeBufferGeometry args={[province.shape]} />
              <meshBasicMaterial color={province.color} />
            </mesh>
          ))}
        </group>
      </Suspense>
    </Canvas>
    </PageBase>
  )
}
