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
        <ThreeCanvas />
      </Canvas>
    </div>
    <App />
  </Router>,
  document.getElementById('root')
);
