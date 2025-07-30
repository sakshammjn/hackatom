import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AtomicSceneProps {
  intensity?: number;
  particleCount?: number;
  className?: string;
}

export function AtomicScene({ intensity = 1, particleCount = 100, className = '' }: AtomicSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    nucleus: THREE.Mesh;
    electrons: THREE.Mesh[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create atomic nucleus (central glowing sphere)
    const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nucleusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.8
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Create electron orbits (rings)
    const electrons: THREE.Mesh[] = [];
    const electronGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    
    for (let i = 0; i < 3; i++) {
      const electronMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x10b981,
        transparent: true,
        opacity: 0.9
      });
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electrons.push(electron);
      scene.add(electron);
    }

    // Create particle field
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Random colors between blue and green
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.6);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Position camera
    camera.position.z = 5;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      nucleus,
      electrons,
      animationId: 0
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.01 * intensity;
      
      // Rotate nucleus
      sceneRef.current.nucleus.rotation.x += 0.01;
      sceneRef.current.nucleus.rotation.y += 0.01;

      // Animate electrons in orbital paths
      sceneRef.current.electrons.forEach((electron, i) => {
        const radius = (i + 1) * 1.2;
        const speed = (i + 1) * 0.02;
        const angle = time * speed;
        
        // Different orbital planes for each electron
        const tilt = (i * Math.PI) / 6;
        electron.position.x = Math.cos(angle) * radius;
        electron.position.y = Math.sin(angle) * radius * Math.cos(tilt);
        electron.position.z = Math.sin(angle) * radius * Math.sin(tilt);
      });

      // Animate particles
      const positions = sceneRef.current.particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.001;
      }
      sceneRef.current.particles.geometry.attributes.position.needsUpdate = true;

      // Rotate entire particle field
      sceneRef.current.particles.rotation.y += 0.002;

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !sceneRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [intensity, particleCount]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}