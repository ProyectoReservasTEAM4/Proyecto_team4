(function(){
  const canvas = document.getElementById('stars-canvas');
  const section = document.getElementById('stars-section');

  if (!canvas || !section) {
    console.error("No se encontró el canvas o la sección.");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(section.clientWidth, section.clientHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, section.clientWidth / section.clientHeight, 0.1, 1000);
  camera.position.z = 5;


  const geometry = new THREE.BufferGeometry();
  const starCount = 500;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();
})();
