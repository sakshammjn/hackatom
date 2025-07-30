import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AnimatedLogoProps {
  size?: number;
  interactive?: boolean;
  className?: string;
}

export function AnimatedLogo({ size = 400, interactive = true, className = '' }: AnimatedLogoProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    logoGroup: THREE.Group;
    particles: THREE.Points;
    rings: THREE.Mesh[];
    centralAtom: THREE.Mesh;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create main logo group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Central atom (glowing sphere)
    const centralGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const centralMaterial = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.9
    });
    const centralAtom = new THREE.Mesh(centralGeometry, centralMaterial);
    logoGroup.add(centralAtom);

    // Central glow effect
    const glowGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    logoGroup.add(glow);

    // Orbital rings
    const rings: THREE.Mesh[] = [];
    const ringRadii = [1.2, 1.8, 2.4];
    const ringColors = [0x10b981, 0x3b82f6, 0xf59e0b];

    ringRadii.forEach((radius, index) => {
      const ringGeometry = new THREE.TorusGeometry(radius, 0.02, 8, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: ringColors[index],
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      
      // Random rotation for each ring
      ring.rotation.x = (Math.random() - 0.5) * Math.PI;
      ring.rotation.y = (Math.random() - 0.5) * Math.PI;
      ring.rotation.z = (Math.random() - 0.5) * Math.PI;
      
      rings.push(ring);
      logoGroup.add(ring);
    });

    // Orbiting electrons
    const electronGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const electrons: THREE.Mesh[] = [];

    ringRadii.forEach((radius, ringIndex) => {
      const electronsPerRing = ringIndex + 2;
      
      for (let i = 0; i < electronsPerRing; i++) {
        const electronMaterial = new THREE.MeshBasicMaterial({
          color: ringColors[ringIndex],
          transparent: true,
          opacity: 0.9
        });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        
        electron.userData = {
          ringIndex,
          radius,
          angle: (i / electronsPerRing) * Math.PI * 2,
          speed: 0.02 / (ringIndex + 1),
          originalRadius: radius
        };
        
        electrons.push(electron);
        logoGroup.add(electron);
      }
    });

    // Particle field around logo
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a sphere around the logo
      const radius = 4 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(-1 + 2 * Math.random());
      
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      // Color particles with isotope theme colors
      const colors = [
        new THREE.Color(0x4f46e5), // Blue
        new THREE.Color(0x10b981), // Emerald
        new THREE.Color(0x3b82f6), // Blue
        new THREE.Color(0xf59e0b)  // Amber
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Position camera
    camera.position.z = 6;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      logoGroup,
      particles,
      rings,
      centralAtom,
      animationId: 0
    };

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    if (interactive) {
      renderer.domElement.addEventListener('mousemove', handleMouseMove);
      renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
      renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.016;
      
      // Rotate central atom
      sceneRef.current.centralAtom.rotation.x += 0.01;
      sceneRef.current.centralAtom.rotation.y += 0.01;

      // Animate orbital rings
      sceneRef.current.rings.forEach((ring, index) => {
        ring.rotation.x += 0.005 * (index + 1);
        ring.rotation.y += 0.003 * (index + 1);
        ring.rotation.z += 0.007 * (index + 1);
      });

      // Animate electrons
      logoGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.userData.ringIndex !== undefined) {
          const { ringIndex, radius, angle, speed } = child.userData;
          const currentAngle = angle + time * speed;
          
          // Add some wobble for more dynamic movement
          const wobble = Math.sin(time * 2 + ringIndex) * 0.1;
          const currentRadius = radius + wobble;
          
          child.position.x = Math.cos(currentAngle) * currentRadius;
          child.position.y = Math.sin(currentAngle) * currentRadius * Math.cos(ringIndex * 0.5);
          child.position.z = Math.sin(currentAngle) * currentRadius * Math.sin(ringIndex * 0.5);
        }
      });

      // Animate background particles
      const positions = sceneRef.current.particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.002;
        positions[i * 3] += Math.cos(time + i * 0.15) * 0.001;
      }
      sceneRef.current.particles.geometry.attributes.position.needsUpdate = true;
      sceneRef.current.particles.rotation.y += 0.001;

      // Interactive camera movement
      if (interactive) {
        const targetX = mouseX * 0.5;
        const targetY = mouseY * 0.5;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }

      // Scale effect on hover
      const targetScale = hovered ? 1.2 : 1;
      sceneRef.current.logoGroup.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.05
      );

      // Glow intensity on hover
      const glowIntensity = hovered ? 0.5 : 0.3;
      logoGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material.blending === THREE.AdditiveBlending) {
          child.material.opacity += (glowIntensity - child.material.opacity) * 0.05;
        }
      });

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !sceneRef.current) return;
      
      sceneRef.current.camera.aspect = 1;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(size, size);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [size, interactive, hovered]);

  return (
    <div className={`inline-block ${className}`}>
      <div ref={mountRef} style={{ width: size, height: size }} />
    </div>
  );
}