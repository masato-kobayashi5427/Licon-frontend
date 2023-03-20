import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Canvas } from 'react-three-fiber';
import ThreeCanvas from "./ThreeCanvas";

ReactDOM.render(
  <Router>
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'auto' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ThreeCanvas position={[0, 0, 0]} speed={5} radius={1} color={'red'}/>
        <ThreeCanvas position={[1, 0, 0]} speed={5} radius={1} color={'orange'}/>
        <ThreeCanvas position={[0, 1, 0]} speed={5} radius={1} color={'yellow'}/>
        <ThreeCanvas position={[0, 0, 1]} speed={5} radius={1} color={'green'}/>
        <ThreeCanvas position={[1, 1, 1]} speed={5} radius={1} color={'blue'}/>
        <ThreeCanvas position={[1, 1, 1]} speed={5} radius={1} color={'#165e83'}/>
        <ThreeCanvas position={[1, 1, 1]} speed={5} radius={1} color={'purple'}/>
      </Canvas>
    </div>
    <App />
  </Router>,
  document.getElementById('root')
);
