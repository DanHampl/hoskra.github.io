import * as THREE from './three.module.js';

			import { GUI } from './dat.gui.module.js';
			import { OrbitControls } from './OrbitControls.js';

			let controls, camera, scene, renderer;
			let textureEquirec, textureCube;
			let sphereMesh, sphereMaterial;



			init();
			animate();

			console.log("Source: https://threejs.org/examples/webgl_materials_envmaps.html")

			function init() {

				// CAMERAS

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
				camera.position.set( 0, 0, 1000 );

				// SCENE

				scene = new THREE.Scene();

				// Lights

				const ambient = new THREE.AmbientLight( 0xffffff );
				scene.add( ambient );

				// Textures

				const loader = new THREE.CubeTextureLoader();
				loader.setPath( 'textures/' );

				// textureCube = loader.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
				textureCube = loader.load( [ 'right.png', 'left.png', 'up.png', 'down.png', 'front.png', 'back.png' ] );
				textureCube.encoding = THREE.sRGBEncoding;

				const textureLoader = new THREE.TextureLoader();

				textureEquirec = textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
				textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
				textureEquirec.encoding = THREE.sRGBEncoding;

				scene.background = textureCube;

				//

				const geometry = new THREE.IcosahedronBufferGeometry( 400, 15 );
				sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
				sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
				scene.add( sphereMesh );
				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				document.body.appendChild( renderer.domElement );

				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 500;
				controls.maxDistance = 2500;

				//

				const params = {
					Cube: function () {

						scene.background = textureCube;

						sphereMaterial.envMap = textureCube;
						sphereMaterial.needsUpdate = true;

					},
					Equirectangular: function () {

						scene.background = textureEquirec;

						sphereMaterial.envMap = textureEquirec;
						sphereMaterial.needsUpdate = true;

					},
					Refraction: false,
					Sphere: true
				};

				const gui = new GUI();

				// gui.add( params, 'Equirectangular' );
				gui.add( params, 'Sphere' ).onChange( function ( value ) {
					if ( value ) {
						sphereMesh.visible = true;
					} else {
						sphereMesh.visible = false;
						}
				});

				gui.add( params, 'Refraction' ).onChange( function ( value ) {

					if ( value ) {

						textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
						textureCube.mapping = THREE.CubeRefractionMapping;

					} else {

						textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
						textureCube.mapping = THREE.CubeReflectionMapping;

					}

					sphereMaterial.needsUpdate = true;

				} );
				gui.open();

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				camera.lookAt( scene.position );
				renderer.render( scene, camera );

			}