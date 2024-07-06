import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

console.log("-----three.js-----")
const w = window.innerWidth
const h = window.innerHeight

console.log(`width: ${w}, height: ${h}`)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.append(renderer.domElement)
const fov = 70
const aspect = w / h
const near = 0.1
const far = 10

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 3

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.04

const scene = new THREE.Scene()

const earthGrp = new THREE.Group()
earthGrp.rotation.z = -23.4 * Math.PI / 180;
const loader = new THREE.TextureLoader()
const geo = new THREE.IcosahedronGeometry(1.0, 100)
const mat = new THREE.MeshStandardMaterial({
  map: loader.load("../assets/8k_earth_daymap.jpg")
})

const mesh = new THREE.Mesh(geo, mat)
earthGrp.add(mesh)

const lightMat = new THREE.MeshBasicMaterial({
  map: loader.load("../assets/8k_earth_nightmap.jpg"),
  blending: THREE.AdditiveBlending
})
const lightMesh = new THREE.Mesh(geo, lightMat)
earthGrp.add(lightMesh)

const cloudMat = new THREE.MeshBasicMaterial({
  map: loader.load("../assets/8k_earth_clouds.jpg"),
  transparent: true,
  opacity: 0.2,
  blending: THREE.AdditiveBlending
})
const cloudMesh = new THREE.Mesh(geo, cloudMat)
cloudMesh.scale.setScalar(1.01)
earthGrp.add(cloudMesh)

scene.add(earthGrp)
const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)



const animate = (t = 0) => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  mesh.rotation.y = t * 0.0001
  lightMesh.rotation.y = t * 0.0001
  cloudMesh.rotation.y = t * 0.00017
  controls.update()
}

animate()
