// components/Hero3D.jsx
//
// Ab image plane ki jagah ek ASAL 3D model (.glb file) load kar rahe hain.
// Naye concepts:
// - useGLTF: drei ka hook jo .glb/.gltf file load karta hai
// - <primitive>: jab kisi complex loaded object (jaise poori model scene)
//   ko render karna ho, jisay hum khud <mesh> se nahi bana sakte
// - OrbitControls: mouse se drag karke model ko GHUMANE ki ability deta hai
//   (pehle wale "tilt" se zyada interactive — user khud control karta hai)

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

function ShoeModel() {
  const groupRef = useRef();

  // useGLTF file load karta hai aur "scene" (poori 3D object hierarchy) deta hai.
  // Path public folder se relative hai (Vite mein "public/models/..." use karo).
  const { scene } = useGLTF("/models/shoe-model.glb");

  // Halka sa idle rotation, taake model bilkul static na lage jab
  // user drag na kar raha ho
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={8} position={[0, -0.8, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 3], fov: 40 }} shadows>
      <ambientLight intensity={0.6} />
      <spotLight position={[3, 5, 3]} intensity={1.5} angle={0.4} penumbra={0.6} castShadow />

      <Suspense fallback={null}>
        <ShoeModel />
        {/* Environment — realistic reflections/lighting studio jaisa look deta hai */}
        <Environment preset="studio" />
        {/* ContactShadows — model ke neeche ek soft, realistic shadow "floor" pe */}
        <ContactShadows position={[0, -1, 0]} opacity={0.5} blur={2.5} far={2} />
      </Suspense>

      {/*
        OrbitControls — YE hi wo cheez hai jo "bohot interactive" feel degi.
        User mouse se drag karke model ko kisi bhi angle se dekh sakta hai.
        enableZoom={false} — scroll se zoom disable kiya (page scroll disturb na ho),
        autoRotate — jab user drag nahi kar raha, model khud aahista ghoomta rahega.
      */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}

// Preload — model ko background mein pehle se load karna shuru kar deta hai
useGLTF.preload("/models/shoe-model.glb");
