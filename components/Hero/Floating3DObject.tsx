"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A6CF7" />
      
      {/* Main floating shape - Octahedron */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          color="#4A6CF7"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting smaller shapes */}
      <mesh position={[3, 0, 0]} rotation={[0, 0, 0]}>
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#FBB040" metalness={0.7} roughness={0.2} />
      </mesh>
      
      <mesh position={[-3, 0, 0]} rotation={[0, 0, 0]}>
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#4A6CF7" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

const Floating3DObject = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] opacity-80 lg:opacity-100 pointer-events-none z-0 hidden lg:block"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <FloatingShape />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  );
};

export default Floating3DObject;




