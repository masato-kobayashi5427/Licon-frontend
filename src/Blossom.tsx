import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type PetalProps = {
  position: [x: number, y: number, z: number];
  speed: number;
  radius: number;
  color: string;
};

function Petal({ position, speed, radius, color }: PetalProps): JSX.Element {
  const mesh = useRef<THREE.Mesh>(null!);
  const direction = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();

  useFrame((state, delta) => {
    const { width, height } = state.viewport;
    mesh.current.position.addScaledVector(direction, speed * delta);
    if (mesh.current.position.x > width / 3 || mesh.current.position.x < -width / 3) {
      direction.setX(-direction.x);
    }
    if (mesh.current.position.y > height / 3 || mesh.current.position.y < -height / 3) {
      direction.setY(-direction.y);
    }
    if (mesh.current.position.z > 20 || mesh.current.position.z < -30) {
      direction.setZ(-direction.z);
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={[radius, radius, radius]}
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Blossom(): JSX.Element {
  const petals = new Array(50).fill(null).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 5;
    const height = -10 - Math.random() * 20;
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);
    const y = Math.random() * 5;
    const color = `hsl(${Math.random() * 50 + 320}, 50%, 50%)`;
    return <Petal key={i} position={[x, y, z]} speed={1 + Math.random() * 2} radius={0.1 + Math.random()} color={color} />;
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {petals}
    </>
  );
}

export default Blossom;