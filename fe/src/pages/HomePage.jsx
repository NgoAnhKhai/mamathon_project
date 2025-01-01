import * as THREE from 'three';
import {useEffect} from 'react';
import { createCamera } from '/features/camera.js';
import { createCity } from '../../features/city';

const HomePage = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const { camera, handleMouseDown, handleMouseUp, handleMouseMove } = createCamera();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const city = createCity(8);
    city.initialize(scene);
    
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('mousedown', handleMouseDown, false);
    window.addEventListener('mouseup', handleMouseUp, false);
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('contextmenu', (event) => event.preventDefault(), false);
  }, []);

  return null;
};

export default HomePage;