import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Canvas } from 'react-three-fiber';
import Cherry from "./images/cherry.jpeg";
import styled from 'styled-components';
import Blossom from "./Blossom";

const StyledCanvasWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: auto;
  background-image: url(${Cherry});
  background-size: cover;
`;


ReactDOM.render(
  <Router>
    <StyledCanvasWrapper>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Blossom />
      </Canvas>
    </StyledCanvasWrapper>
    <App />
  </Router>,
  document.getElementById('root')
);
