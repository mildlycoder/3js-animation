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

const geo = new THREE.IcosahedronGeometry(1.0, 2)
const mat = new THREE.MeshStandardMaterial({
  color: "cyan",
  flatShading: true
})

const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial({
  color: "white",
  wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat)
mesh.add(wireMesh)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000)
scene.add(hemiLight)



const animate = (t = 0) => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
}

animate()
