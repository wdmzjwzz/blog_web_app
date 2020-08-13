<template>
  <div class="home">
    <!-- <iframe src="/three/wanshiwu.html" frameborder="0" height="100%" width="100%" class="three-3d"></iframe> -->
    <div id="container"></div>
  </div>
</template>

<script>
// import * as THREE from '../static/three/libs/three.module.js'
// import { OrbitControls } from '../static/three/controls/OrbitControls.js'
// import { GLTFLoader } from '../static/three/loaders/GLTFLoader.js'
// import { DRACOLoader } from '../static/three/loaders/DRACOLoader.js'
export default {
  head: {
    script: [
      {
        src: '/three/three.min.js',
      },
      {
        src: '/three/controls/OrbitControls.js',
      },
      {
        src: '/three/loaders/GLTFLoader.js',
      },
      {
        src: '/three/loaders/DRACOLoader.js',
      },
    ],
  },
  data() {
    return {}
  },
  methods: {
    draw() {
      var scene, camera, dirLight, stats
      var renderer, mixer, controls

      var clock = new THREE.Clock()
      var container = document.getElementById('container')

      // stats = new Stats();
      // container.appendChild(stats.dom);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight - 50)
      console.log(renderer)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      // scene.background = new THREE.Color( 0xbfe3dd );

      camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / (window.innerHeight - 50),
        1,
        100
      )
      camera.position.set(6, 2, 8)

      controls = new THREE.OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.update()
      controls.enablePan = false
      controls.enableDamping = true

      scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 1))

      dirLight = new THREE.DirectionalLight(0xffffff, 1)
      dirLight.position.set(5, 2, 8)
      scene.add(dirLight)

      // envmap
      var path = '/three/Park2/'
      var format = '.jpg'
      var envMap = new THREE.CubeTextureLoader().load([
        path + 'posx' + format,
        path + 'negx' + format,
        path + 'posy' + format,
        path + 'negy' + format,
        path + 'posz' + format,
        path + 'negz' + format,
      ])

      var dracoLoader = new THREE.DRACOLoader()
      dracoLoader.setDecoderPath('/three/draco/gltf/')

      var loader = new THREE.GLTFLoader()
      loader.setDRACOLoader(dracoLoader)
      loader.load(
        '/three/models/gltf/LittlestTokyo.glb',
        function (gltf) {
          var model = gltf.scene
          model.position.set(0, 0.5, 0)
          model.scale.set(0.01, 0.01, 0.01)
          model.traverse(function (child) {
            if (child.isMesh) child.material.envMap = envMap
          })
          scene.add(model)
          mixer = new THREE.AnimationMixer(model)
          mixer.clipAction(gltf.animations[0]).play()
          animate()
        },
        undefined,
        function (e) {
          console.error(e)
        }
      )

      window.onresize = function () {
        camera.aspect = window.innerWidth / (window.innerHeight - 50)
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight - 50)
      }

      function animate() {
        requestAnimationFrame(animate)

        var delta = clock.getDelta()

        mixer.update(delta)

        controls.update()

        // stats.update();

        renderer.render(scene, camera)
      }
    },
  },
  computed: {},
  components: {},
  mounted() {
    this.draw()
  },
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 0px;
  display: flex;
}
@media (max-width: 750px) {
  .home {
    overflow: hidden;
  }
}
</style>
<style lang="less">
#container {
  overflow: hidden;
  position: relative;
  width:  calc(100vw - 50px);
  height: calc(100vh - 80px);
  canvas {
    position: absolute;
    top: -5px;
    left: -5px;
  }
}
</style>
