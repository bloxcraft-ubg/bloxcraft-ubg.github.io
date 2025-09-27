let scene, camera, renderer;
let world, carBody, carMesh, wheels = [];
let speed = 0, steering = 0;
let accelPoints = [], score = 0;
const scoreDisplay = document.getElementById("score");

init();
animate();

function init() {
  // Physics world
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#5555FF");

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 8, -15);
  camera.lookAt(0, 0, 20);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas"), antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Ground
  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({ mass: 0 });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);

  const groundGeo = new THREE.PlaneGeometry(30, 2000);
  const groundMat = new THREE.MeshPhongMaterial({ color: 0x111111 });
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  scene.add(groundMesh);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, -10);
  scene.add(dirLight);

  // Car physics
  const carShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
  carBody = new CANNON.Body({ mass: 150 });
  carBody.addShape(carShape);
  carBody.position.set(0, 1, 0);
  world.addBody(carBody);

  // Car mesh
  const carGeo = new THREE.BoxGeometry(2, 1, 4);
  const carMat = new THREE.MeshPhongMaterial({ color: "gray" });
  carMesh = new THREE.Mesh(carGeo, carMat);
  scene.add(carMesh);

  // Wheels (visual only for now)
  const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
  const wheelMat = new THREE.MeshPhongMaterial({ color: 0x222222 });

  for (let i = -1; i <= 1; i += 2) {
    for (let j = -1; j <= 1; j += 2) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(i * 1.2, 0.5, j * 1.5);
      scene.add(wheel);
      wheels.push(wheel);
    }
  }

  // Acceleration points
  const pointGeo = new THREE.CircleGeometry(1, 32);
  const pointMat = new THREE.MeshPhongMaterial({ color: "yellow" });

  for (let i = 20; i < 200; i += 20) {
    const point = new THREE.Mesh(pointGeo, pointMat);
    point.rotation.x = -Math.PI / 2;
    point.position.set((Math.random() - 0.5) * 20, 0.06, i);
    scene.add(point);
    accelPoints.push(point);
  }

  // Controls
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") speed += 2;
    if (e.code === "ArrowDown") speed -= 2;
    if (e.code === "ArrowLeft") steering = -0.05;
    if (e.code === "ArrowRight") steering = 0.05;
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") steering = 0;
  });

  window.addEventListener("resize", onWindowResize);
}

function respawnPoint(point) {
  point.position.set(
    (Math.random() - 0.5) * 20,
    0.06,
    carBody.position.z + 100 + Math.random() * 50
  );
  point.visible = true;
}

function checkAccelPoints() {
  accelPoints.forEach((point) => {
    if (!point.visible) return;

    const carBox = new THREE.Box3().setFromObject(carMesh);
    const pointBox = new THREE.Box3().setFromObject(point);

    if (carBox.intersectsBox(pointBox)) {
      point.visible = false;
      score++;
      scoreDisplay.textContent = "Points: " + score;
      setTimeout(() => respawnPoint(point), 500);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Physics step
  world.step(1 / 60);

  // Apply controls
  carBody.velocity.z += speed * 0.01;
  carBody.position.x += steering;

  // Friction
  speed *= 0.95;

  // Sync meshes with physics
  carMesh.position.copy(carBody.position);
  carMesh.quaternion.copy(carBody.quaternion);

  wheels.forEach((w, i) => {
    w.position.set(
      carMesh.position.x + (i < 2 ? -1.2 : 1.2),
      0.5,
      carMesh.position.z + (i % 2 === 0 ? -1.5 : 1.5)
    );
  });

  // Camera follow
  camera.position.z = carMesh.position.z - 15;
  camera.position.x = carMesh.position.x;
  camera.lookAt(carMesh.position.x, 1, carMesh.position.z + 20);

  // Collectibles
  checkAccelPoints();

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
