import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface InteractiveAtomProps {
  isotope: string;
  size?: number;
  interactive?: boolean;
  className?: string;
}

const ISOTOPE_DATA = {
  'Tc-99m': { 
    protons: 43, 
    neutrons: 56, 
    color: 0xff6b6b,
    name: 'Technetium-99m',
    halfLife: '6 hours',
    use: 'Medical imaging'
  },
  'Co-60': { 
    protons: 27, 
    neutrons: 33, 
    color: 0x4ecdc4,
    name: 'Cobalt-60',
    halfLife: '5.3 years',
    use: 'Sterilization'
  },
  'I-131': { 
    protons: 53, 
    neutrons: 78, 
    color: 0xa855f7,
    name: 'Iodine-131',
    halfLife: '8 days',
    use: 'Thyroid treatment'
  },
  'Lu-177': { 
    protons: 71, 
    neutrons: 106, 
    color: 0xf59e0b,
    name: 'Lutetium-177',
    halfLife: '6.7 days',
    use: 'Cancer therapy'
  },
  'Pu-238': { 
    protons: 94, 
    neutrons: 144, 
    color: 0xef4444,
    name: 'Plutonium-238',
    halfLife: '87.7 years',
    use: 'Space power'
  }
};

export function InteractiveAtom({ isotope, size = 300, interactive = true, className = '' }: InteractiveAtomProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [info, setInfo] = useState<typeof ISOTOPE_DATA[keyof typeof ISOTOPE_DATA] | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    nucleus: THREE.Group;
    electrons: THREE.Group;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    const data = ISOTOPE_DATA[isotope as keyof typeof ISOTOPE_DATA];
    if (data) {
      setInfo(data);
    }
  }, [isotope]);

  useEffect(() => {
    if (!mountRef.current || !info) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create nucleus group
    const nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);

    // Create protons (red spheres)
    for (let i = 0; i < Math.min(info.protons, 20); i++) {
      const protonGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const protonMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff4444,
        transparent: true,
        opacity: 0.9
      });
      const proton = new THREE.Mesh(protonGeometry, protonMaterial);
      
      // Arrange in a sphere
      const phi = Math.acos(-1 + (2 * i) / Math.min(info.protons, 20));
      const theta = Math.sqrt(Math.min(info.protons, 20) * Math.PI) * phi;
      const radius = 0.4;
      
      proton.position.x = radius * Math.cos(theta) * Math.sin(phi);
      proton.position.y = radius * Math.sin(theta) * Math.sin(phi);
      proton.position.z = radius * Math.cos(phi);
      
      nucleusGroup.add(proton);
    }

    // Create neutrons (blue spheres)
    for (let i = 0; i < Math.min(info.neutrons, 25); i++) {
      const neutronGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const neutronMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4444ff,
        transparent: true,
        opacity: 0.9
      });
      const neutron = new THREE.Mesh(neutronGeometry, neutronMaterial);
      
      // Arrange in a larger sphere around protons
      const phi = Math.acos(-1 + (2 * i) / Math.min(info.neutrons, 25));
      const theta = Math.sqrt(Math.min(info.neutrons, 25) * Math.PI) * phi;
      const radius = 0.6;
      
      neutron.position.x = radius * Math.cos(theta) * Math.sin(phi);
      neutron.position.y = radius * Math.sin(theta) * Math.sin(phi);
      neutron.position.z = radius * Math.cos(phi);
      
      nucleusGroup.add(neutron);
    }

    // Create electron shells
    const electronGroup = new THREE.Group();
    scene.add(electronGroup);

    const shells = [1, 8, 18, 32]; // Electron shell capacities
    let remainingElectrons = info.protons;
    let shellRadius = 1.5;

    for (let shell = 0; shell < shells.length && remainingElectrons > 0; shell++) {
      const electronsInShell = Math.min(remainingElectrons, shells[shell]);
      
      for (let e = 0; e < electronsInShell; e++) {
        const electronGeometry = new THREE.SphereGeometry(0.04, 12, 12);
        const electronMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x44ff44,
          transparent: true,
          opacity: 0.8
        });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        
        electron.userData = { 
          shell, 
          angle: (e / electronsInShell) * Math.PI * 2,
          radius: shellRadius,
          speed: 0.02 / (shell + 1)
        };
        
        electronGroup.add(electron);
      }
      
      remainingElectrons -= electronsInShell;
      shellRadius += 0.8;
    }

    // Nuclear glow effect
    const glowGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: info.color,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    nucleusGroup.add(glow);

    // Position camera
    camera.position.z = 4;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      nucleus: nucleusGroup,
      electrons: electronGroup,
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

    if (interactive) {
      renderer.domElement.addEventListener('mousemove', handleMouseMove);
      renderer.domElement.addEventListener('mouseenter', () => setHovered(true));
      renderer.domElement.addEventListener('mouseleave', () => setHovered(false));
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.016;
      
      // Rotate nucleus
      sceneRef.current.nucleus.rotation.y += 0.005;
      
      // Animate electrons in their shells
      sceneRef.current.electrons.children.forEach((electron, index) => {
        if (electron instanceof THREE.Mesh && electron.userData) {
          const { shell, angle, radius, speed } = electron.userData;
          const currentAngle = angle + time * speed;
          
          electron.position.x = Math.cos(currentAngle) * radius;
          electron.position.y = Math.sin(currentAngle) * radius * Math.cos(shell * 0.3);
          electron.position.z = Math.sin(currentAngle) * radius * Math.sin(shell * 0.3);
        }
      });

      // Interactive camera movement
      if (interactive) {
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
      }

      // Scale effect on hover
      const targetScale = hovered ? 1.1 : 1;
      sceneRef.current.nucleus.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      sceneRef.current.electrons.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (interactive) {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      }
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [isotope, size, interactive, hovered, info]);

  if (!info) return null;

  return (
    <div className={`inline-block ${className}`}>
      <div ref={mountRef} style={{ width: size, height: size }} />
      {interactive && hovered && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-white p-4 rounded-lg shadow-xl min-w-48 z-20">
          <h4 className="font-semibold text-blue-400">{info.name}</h4>
          <p className="text-sm text-gray-300">Half-life: {info.halfLife}</p>
          <p className="text-sm text-gray-300">Use: {info.use}</p>
          <p className="text-xs text-gray-400 mt-1">
            {info.protons} protons • {info.neutrons} neutrons
          </p>
        </div>
      )}
    </div>
  );
}