import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type BallProps = {
  position: [x: number, y: number, z: number];
  speed: number;
  radius: number;
  color: string;
};

function ThreeCanvas({ position, speed, radius, color }: BallProps): JSX.Element {
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
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default ThreeCanvas;