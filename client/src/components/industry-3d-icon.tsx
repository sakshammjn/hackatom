import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Industry3DIconProps {
  industry: 'healthcare' | 'agriculture' | 'manufacturing' | 'space';
  size?: number;
  animate?: boolean;
  className?: string;
}

const INDUSTRY_CONFIGS = {
  healthcare: {
    primaryColor: 0xff6b6b,
    secondaryColor: 0xff8e8e,
    shapes: 'medical',
    particles: 30
  },
  agriculture: {
    primaryColor: 0x10b981,
    secondaryColor: 0x34d399,
    shapes: 'organic',
    particles: 40
  },
  manufacturing: {
    primaryColor: 0x3b82f6,
    secondaryColor: 0x60a5fa,
    shapes: 'geometric',
    particles: 25
  },
  space: {
    primaryColor: 0xa855f7,
    secondaryColor: 0xc084fc,
    shapes: 'stellar',
    particles: 50
  }
};

export function Industry3DIcon({ industry, size = 80, animate = true, className = '' }: Industry3DIconProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mainGroup: THREE.Group;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const config = INDUSTRY_CONFIGS[industry];
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Main group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create industry-specific shapes
    switch (config.shapes) {
      case 'medical':
        // Medical cross
        const crossGeometry1 = new THREE.BoxGeometry(0.6, 0.15, 0.15);
        const crossGeometry2 = new THREE.BoxGeometry(0.15, 0.6, 0.15);
        const crossMaterial = new THREE.MeshBasicMaterial({ 
          color: config.primaryColor,
          transparent: true,
          opacity: 0.9
        });
        const cross1 = new THREE.Mesh(crossGeometry1, crossMaterial);
        const cross2 = new THREE.Mesh(crossGeometry2, crossMaterial);
        mainGroup.add(cross1, cross2);

        // Orbiting molecules
        for (let i = 0; i < 3; i++) {
          const moleculeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
          const moleculeMaterial = new THREE.MeshBasicMaterial({ 
            color: config.secondaryColor,
            transparent: true,
            opacity: 0.8
          });
          const molecule = new THREE.Mesh(moleculeGeometry, moleculeMaterial);
          molecule.userData = { angle: (i / 3) * Math.PI * 2, radius: 0.8, speed: 0.02 };
          mainGroup.add(molecule);
        }
        break;

      case 'organic':
        // Plant-like structure
        const stemGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.8, 8);
        const leafGeometry = new THREE.SphereGeometry(0.15, 12, 12);
        const plantMaterial = new THREE.MeshBasicMaterial({ 
          color: config.primaryColor,
          transparent: true,
          opacity: 0.9
        });
        
        const stem = new THREE.Mesh(stemGeometry, plantMaterial);
        mainGroup.add(stem);

        // Leaves
        for (let i = 0; i < 4; i++) {
          const leaf = new THREE.Mesh(leafGeometry, plantMaterial);
          const angle = (i / 4) * Math.PI * 2;
          leaf.position.x = Math.cos(angle) * 0.3;
          leaf.position.y = 0.2 + i * 0.1;
          leaf.position.z = Math.sin(angle) * 0.3;
          leaf.scale.set(1, 0.5, 1);
          mainGroup.add(leaf);
        }
        break;

      case 'geometric':
        // Industrial gears
        const gearGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
        const gearMaterial = new THREE.MeshBasicMaterial({ 
          color: config.primaryColor,
          transparent: true,
          opacity: 0.9
        });
        
        const gear1 = new THREE.Mesh(gearGeometry, gearMaterial);
        const gear2 = new THREE.Mesh(gearGeometry, gearMaterial);
        gear1.position.set(-0.2, 0, 0);
        gear2.position.set(0.2, 0, 0);
        gear1.userData = { speed: 0.05 };
        gear2.userData = { speed: -0.05 };
        mainGroup.add(gear1, gear2);

        // Connecting elements
        const connectGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.05);
        const connect = new THREE.Mesh(connectGeometry, gearMaterial);
        mainGroup.add(connect);
        break;

      case 'stellar':
        // Star shape
        const starGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const starMaterial = new THREE.MeshBasicMaterial({ 
          color: config.primaryColor,
          transparent: true,
          opacity: 0.9
        });
        const star = new THREE.Mesh(starGeometry, starMaterial);
        mainGroup.add(star);

        // Orbiting satellites
        for (let i = 0; i < 2; i++) {
          const satelliteGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
          const satelliteMaterial = new THREE.MeshBasicMaterial({ 
            color: config.secondaryColor,
            transparent: true,
            opacity: 0.8
          });
          const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
          satellite.userData = { 
            angle: i * Math.PI, 
            radius: 0.6 + i * 0.2, 
            speed: 0.03 * (i + 1) 
          };
          mainGroup.add(satellite);
        }
        break;
    }

    // Particle effects
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(config.particles * 3);
    const particleColors = new Float32Array(config.particles * 3);

    for (let i = 0; i < config.particles; i++) {
      const radius = 1 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(-1 + 2 * Math.random());
      
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color(config.secondaryColor);
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
    mainGroup.add(particles);

    // Position camera
    camera.position.z = 2.5;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      mainGroup,
      animationId: 0
    };

    // Mouse interactions
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let time = 0;
    const animateScene = () => {
      if (!sceneRef.current) return;
      
      time += 0.016;
      
      if (animate) {
        // Rotate main group
        sceneRef.current.mainGroup.rotation.y += 0.01;
        
        // Animate specific elements based on industry
        sceneRef.current.mainGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.userData.angle !== undefined) {
            // Orbiting objects
            const { angle, radius, speed } = child.userData;
            const currentAngle = angle + time * speed;
            child.position.x = Math.cos(currentAngle) * radius;
            child.position.z = Math.sin(currentAngle) * radius;
          } else if (child instanceof THREE.Mesh && child.userData.speed !== undefined) {
            // Rotating gears
            child.rotation.z += child.userData.speed;
          }
        });

        // Animate particles
        if (particles) {
          particles.rotation.y += 0.005;
          const positions = particles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < config.particles; i++) {
            positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.001;
          }
          particles.geometry.attributes.position.needsUpdate = true;
        }
      }

      // Scale effect on hover
      const targetScale = hovered ? 1.2 : 1;
      sceneRef.current.mainGroup.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.1
      );

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animateScene);
    };

    animateScene();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [industry, size, animate, hovered]);

  return (
    <div className={`inline-block ${className}`}>
      <div ref={mountRef} style={{ width: size, height: size }} />
    </div>
  );
}