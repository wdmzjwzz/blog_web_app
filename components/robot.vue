<template>
  <div class="robot">
    <div id="robot"></div>

    <div class="el-menu-vertical" id="gui"></div>
  </div>
</template>

<script>
export default {
  head: {
    script: [
      {
        src: '/three/three.min.js',
      },
      {
        src: '/three/dat.gui.min.js',
      },
      {
        src: '/three/loaders/GLTFLoader.js',
      },
    ],
  },

  data() {
    return {
      gui: null,
      actions: null,
      activeAction: null,
    }
  },
  methods: {
    changeGui() {
      this.actions['Running'].stop()
    },
    draw() {
      var container,
        // stats,
        clock,
        gui,
        mixer,
        actions,
        activeAction,
        previousAction
      var camera, scene, renderer, model, face

      var api = { state: 'Walking' }
      let _this = this
      init()
      animate()

      function init() {
        container = document.createElement('div')
        document.getElementById('robot').appendChild(container)

        camera = new THREE.PerspectiveCamera(
          45,
          360 / window.innerHeight,
          0.25,
          150
        )
        camera.position.set(-5, 3, 15)
        camera.lookAt(new THREE.Vector3(0, 2, 0))

        scene = new THREE.Scene()
        // scene.background = new THREE.Color(0xe0e0e0)
        scene.fog = new THREE.Fog(0xe0e0e0, 20, 100)

        clock = new THREE.Clock()

        // lights

        var light = new THREE.HemisphereLight(0xffffff, 0x444444)
        light.position.set(0, 20, 0)
        scene.add(light)

        light = new THREE.DirectionalLight(0xffffff)
        light.position.set(0, 20, 10)
        scene.add(light)

        // ground

        // var mesh = new THREE.Mesh(
        //   new THREE.PlaneBufferGeometry(2000, 2000),
        //   new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        // )
        // mesh.rotation.x = -Math.PI / 2
        // scene.add(mesh)

        var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
        grid.material.opacity = 0.2
        grid.material.transparent = true
        scene.add(grid)

        // model

        var loader = new THREE.GLTFLoader()
        loader.load(
          '/three/models/gltf/RobotExpressive.glb',
          function (gltf) {
            model = gltf.scene
            scene.add(model)
            createGUI(model, gltf.animations)
          },
          undefined,
          function (e) {
            console.error(e)
          }
        )

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(360, window.innerHeight)
        renderer.outputEncoding = THREE.sRGBEncoding
        container.appendChild(renderer.domElement)

        window.addEventListener('resize', onWindowResize, false)

        // stats
        // stats = new Stats()
        // container.appendChild(stats.dom)
      }

      function createGUI(model, animations) {
        var states = [
          'Idle',
          'Walking',
          'Running',
          'Dance',
          'Death',
          'Sitting',
          'Standing',
        ]
        var emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

        gui = new dat.GUI()

        mixer = new THREE.AnimationMixer(model)

        actions = {}
        _this.gui = gui
        _this.actions = actions
        for (var i = 0; i < animations.length; i++) {
          var clip = animations[i]
          var action = mixer.clipAction(clip)
          actions[clip.name] = action

          if (
            emotes.indexOf(clip.name) >= 0 ||
            states.indexOf(clip.name) >= 4
          ) {
            action.clampWhenFinished = true
            action.loop = THREE.LoopOnce
          }
        }

        // states

        var statesFolder = gui.addFolder('状态')

        var clipCtrl = statesFolder.add(api, 'state').options(states)

        clipCtrl.onChange(function () {
          fadeToAction(api.state, 0.5)
        })

        // statesFolder.open()

        // emotes

        var emoteFolder = gui.addFolder('动作')

        function createEmoteCallback(name) {
          api[name] = function () {
            fadeToAction(name, 0.2)
            mixer.addEventListener('finished', restoreState)
          }

          emoteFolder.add(api, name)
        }

        function restoreState() {
          mixer.removeEventListener('finished', restoreState)

          fadeToAction(api.state, 0.2)
        }

        for (var i = 0; i < emotes.length; i++) {
          createEmoteCallback(emotes[i])
        }

        // emoteFolder.open()

        // expressions
        face = model.getObjectByName('Head_2')

        var expressions = Object.keys(face.morphTargetDictionary)
        var expressionFolder = gui.addFolder('表情')
        for (var i = 0; i < expressions.length; i++) {
          expressionFolder
            .add(face.morphTargetInfluences, i, 0, 1, 0.01)
            .name(expressions[i])
        }

        activeAction = actions['Dance']
        activeAction.play()
        // expressionFolder.open()
        gui.close()
        // gui.domElement.lastChild.innerHTML = "收起"
        document.getElementById('gui').appendChild(gui.domElement)
      }

      function fadeToAction(name, duration) {
        previousAction = activeAction
        activeAction = actions[name]

        if (previousAction !== activeAction) {
          previousAction.fadeOut(duration)
        }

        activeAction
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(duration)
          .play()
      }

      function onWindowResize() {
        camera.aspect = 360 / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(360, window.innerHeight)
      }
      //
      function animate() {
        var dt = clock.getDelta()

        if (mixer) mixer.update(dt)

        requestAnimationFrame(animate)

        renderer.render(scene, camera)

        // stats.update()
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

<style lang="less">
.robot {
  position: relative;
  .el-menu-vertical {
    display: flex;
    flex-direction: column;
    width: 10%;
    padding: 20px 10px;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    .main {
      width: 100px !important;
      ul > li {
        &:nth-of-type(2) {
          .dg .property-name {
            width: 100%;
          }
        }
      }
    }
    .close-button {
      width: 100px !important;
    }
  }
}
</style>
<style lang="less">
#robot {
  overflow: hidden;
  position: relative;
  width: calc(100vw - 50px);
  height: calc(100vh - 80px);
  canvas {
    position: absolute;
    top: -5px;
    left: -5px;
  }
}
</style>
