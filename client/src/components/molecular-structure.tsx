import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MolecularStructureProps {
  molecule?: 'tc99m' | 'co60' | 'i131' | 'lu177' | 'pu238';
  size?: number;
  className?: string;
  autoRotate?: boolean;
}

const MOLECULES = {
  tc99m: {
    name: 'Technetium-99m',
    color: 0xff6b6b,
    atoms: [
      { position: [0, 0, 0], size: 0.8, color: 0xff6b6b }
    ]
  },
  co60: {
    name: 'Cobalt-60',
    color: 0x4ecdc4,
    atoms: [
      { position: [0, 0, 0], size: 0.9, color: 0x4ecdc4 }
    ]
  },
  i131: {
    name: 'Iodine-131',
    color: 0xa855f7,
    atoms: [
      { position: [0, 0, 0], size: 1.0, color: 0xa855f7 }
    ]
  },
  lu177: {
    name: 'Lutetium-177',
    color: 0xf59e0b,
    atoms: [
      { position: [0, 0, 0], size: 0.7, color: 0xf59e0b }
    ]
  },
  pu238: {
    name: 'Plutonium-238',
    color: 0xef4444,
    atoms: [
      { position: [0, 0, 0], size: 0.9, color: 0xef4444 }
    ]
  }
};

export function MolecularStructure({ 
  molecule = 'tc99m', 
  size = 200, 
  className = '',
  autoRotate = true 
}: MolecularStructureProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    group: THREE.Group;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const moleculeData = MOLECULES[molecule];
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create group for all atoms
    const group = new THREE.Group();
    scene.add(group);

    // Create atoms
    moleculeData.atoms.forEach((atom, index) => {
      // Main atom sphere
      const atomGeometry = new THREE.SphereGeometry(atom.size, 32, 32);
      const atomMaterial = new THREE.MeshBasicMaterial({ 
        color: atom.color,
        transparent: true,
        opacity: 0.8
      });
      const atomMesh = new THREE.Mesh(atomGeometry, atomMaterial);
      atomMesh.position.set(atom.position[0], atom.position[1], atom.position[2]);
      group.add(atomMesh);

      // Glowing effect
      const glowGeometry = new THREE.SphereGeometry(atom.size * 1.2, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: atom.color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.position.set(atom.position[0], atom.position[1], atom.position[2]);
      group.add(glowMesh);

      // Nucleus particles
      for (let i = 0; i < 8; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        const radius = atom.size * 0.7;
        const phi = Math.acos(-1 + (2 * i) / 8);
        const theta = Math.sqrt(8 * Math.PI) * phi;
        
        particle.position.x = atom.position[0] + radius * Math.cos(theta) * Math.sin(phi);
        particle.position.y = atom.position[1] + radius * Math.sin(theta) * Math.sin(phi);
        particle.position.z = atom.position[2] + radius * Math.cos(phi);
        
        group.add(particle);
      }
    });

    // Add energy field effect
    const energyGeometry = new THREE.RingGeometry(2, 3, 32);
    const energyMaterial = new THREE.MeshBasicMaterial({
      color: moleculeData.color,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const energyRing = new THREE.Mesh(energyGeometry, energyMaterial);
    energyRing.rotation.x = Math.PI / 2;
    group.add(energyRing);

    // Position camera
    camera.position.z = 5;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      group,
      animationId: 0
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.02;
      
      if (autoRotate) {
        sceneRef.current.group.rotation.y += 0.01;
        sceneRef.current.group.rotation.x += 0.005;
      }

      // Animate energy field
      const energyRing = sceneRef.current.group.children.find(child => 
        child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry
      ) as THREE.Mesh;
      
      if (energyRing) {
        energyRing.rotation.z += 0.03;
        energyRing.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
      }

      // Animate glow effects
      sceneRef.current.group.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          if (child.material.opacity < 0.5) {
            child.material.opacity = 0.3 + Math.sin(time + index) * 0.1;
          }
        }
      });

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [molecule, size, autoRotate]);

  return (
    <div className={`inline-block ${className}`}>
      <div ref={mountRef} style={{ width: size, height: size }} />
    </div>
  );
}