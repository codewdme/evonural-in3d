import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface SkyboxViewerProps {
  imageUrl: string;
}

const SkyboxViewer: React.FC<SkyboxViewerProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 0.1;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.1;

    // Load Skybox Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Correct sphere for equirectangular image
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      },
      undefined,
      (error) => console.error("Error loading texture:", error.message)
    );

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default SkyboxViewer;
