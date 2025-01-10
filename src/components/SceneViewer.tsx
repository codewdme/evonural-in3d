"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface SceneViewerProps {
  imageUrl?: string;
}

function SceneViewer({ imageUrl }: SceneViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 0.1;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // Create material with default texture
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation
    let lon = 0;
    let lat = 0;
    let phi = 0;
    let theta = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      if (!cameraRef.current) return;

      lon += 0.1;
      lat = Math.max(-85, Math.min(85, lat));

      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      targetRef.current.set(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      cameraRef.current.lookAt(targetRef.current);
      rendererRef.current?.render(scene, cameraRef.current);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Update texture when imageUrl changes
  useEffect(() => {
    if (!imageUrl || !sceneRef.current) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = sceneRef.current?.children[0];
      if (sphere instanceof THREE.Mesh) {
        sphere.material = material;
      }
    });
  }, [imageUrl]);

  return <div ref={containerRef} className="w-full h-screen" />;
}

export default SceneViewer;
