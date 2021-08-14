import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// GUI
const gui = new dat.GUI({
    closed: false,
    width:sizes.width / 4,
    height: sizes.height / 4
})

const parameters = {
    spinY: () => {
        gsap.to(sphere.rotation,
            {duration:1, y: sphere.rotation.y + 10})
    },
    spinX: () => {
        gsap.to(sphere.rotation,
            {duration:1, x: sphere.rotation.x + 10})
    },
}
const loadingManager = new THREE.LoadingManager()

    loadingManager.onStart = () => {
        console.log('onstart')
    }
    loadingManager.onProgress = () => {
        console.log('onprogress')
    }
    loadingManager.onError = () => {
        console.log('onerror')
    }
const textureLoader = new THREE.TextureLoader(loadingManager)
const blueIce = textureLoader.load('/textures/blueIce.jpg')
console.log(blueIce)
// blueIce.minFilter = THREE.LinearFilter
blueIce.magFilter = THREE.LinearFilter

// Axes
const axes = new THREE.AxesHelper(6)


//Canvas
const canvas = document.querySelector('.webgl')
// Scene
const scene = new THREE.Scene()
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

scene.add(axes)

// FullScreen
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// 2 click open/close fullscreen
window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitRequestfullScreen

    if(!fullScreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if(canvas.webkitRequestfullScreen) {
            canvas.webkitRequestfullScreen()
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        } else if(document.webkitexitFullscreen) {
            document.webkitexitFullscreen()
        }
    }
} )

//object
const geometry = new THREE.SphereGeometry(4, 32, 16, 45)
const material = new THREE.MeshBasicMaterial({
    map: blueIce
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

//GUI Sphere
gui.add(sphere.position, 'y',)
    .min(-2)
    .max(2)
    .step(0.01)
    .name('Position Y')

gui.add(sphere.position, 'x',)
    .min(-2)
    .max(2)
    .step(0.01)
    .name('Position X')

gui.add(sphere.position, 'z',)
    .min(-2)
    .max(2)
    .step(0.01)
    .name('Position Z')

gui.add(parameters, 'spinY')
gui.add(parameters, 'spinX')

gui.add(material, 'wireframe')
//controls
const controls = new OrbitControls(camera, canvas)

// camera position
camera.position.z = 10

// animate and render
const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}
animate()