var scene, camera, renderer, exporter, mesh, grid, cameraRotationX, cameraRotationY;
var PLANE_SIZE = 10000;
// DEFAULT VALUES
let BACKGROUND_COLOR = 0x26ccff;
let PLANE_COLOR = 0x000000;
let GRID_COLOR = 0xa0a000;
let selectedValue = 10;
let WIERD_CAMERA = false
let MOVING_CAMERA = true;

function switchCamera() {
    if (MOVING_CAMERA) {
        camera.position.set( 1000, 8000, 1000 );
        camera.lookAt( 10, 10, 10 );
        camera.updateProjectionMatrix();
        MOVING_CAMERA = false;
        console.log("yes");
    } else {
        camera.position.set( -100, 100, 1000 );
        camera.lookAt( -100, 100, 0 );
        camera.updateProjectionMatrix();
        MOVING_CAMERA = true;
        console.log("no");
    }
}
function addObjects() {
var redMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
var material = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
                // center red
                object = new THREE.Mesh( new THREE.SphereBufferGeometry( 500 ), redMaterial );
                object.position.set( -100, 200, -2000 );
                scene.add( object );
                // right red
                object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), redMaterial );
                object.position.set( 400, 400, 0 );
                scene.add( object );
                // left red
				object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), redMaterial );
                object.position.set( -600, 400, 0 );
                scene.add( object );

				object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), material );
				object.position.set( 200, 0, 500 );
                scene.add( object );
				object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), material );
				object.position.set( -400, 0, -1000 );
				scene.add( object );
				object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), material );
				object.position.set( 200, 0, -500 );
				scene.add( object );
				object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), material );
				object.position.set( -400, 0, 0 );
				scene.add( object )


}

init();
animate(selectedValue, WIERD_CAMERA);

function init() {
    // EVENT LISTENERS
    document.getElementById("default").addEventListener("click", () => {
        BACKGROUND_COLOR = 0x26ccff;
        PLANE_COLOR = 0x000000;
        GRID_COLOR = 0xa0a000;
        ground.material.color.set(PLANE_COLOR);
        scene.fog = new THREE.Fog( BACKGROUND_COLOR, 600, 1000 );
        scene.background = new THREE.Color( BACKGROUND_COLOR );
        scene.remove(grid);
        grid = new THREE.GridHelper( 10000, 100, BACKGROUND_COLOR, BACKGROUND_COLOR );
        grid.material.opacity = 1;
        grid.material.transparent = true;
        scene.add( grid );
        selectedValue = 2;
        WIERD_CAMERA = false;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        document.getElementById("dropdown").value = 2;
        document.getElementById("wierd_camera").checked = false;
    })
    document.getElementById("wierd_camera").addEventListener("change", () => {
        WIERD_CAMERA = document.getElementById("wierd_camera").checked;
    })
    document.getElementById("dropdown").addEventListener("change", () => {
        selectedValue = document.getElementById("dropdown").value;
    })
    document.getElementById("plane_color").addEventListener("change", () => {
        PLANE_COLOR = document.getElementById("plane_color").value;
        ground.material.color.set(PLANE_COLOR);
    })
    document.getElementById("background_color").addEventListener("change", () => {
        BACKGROUND_COLOR = document.getElementById("background_color").value;
        // scene.fog = new THREE.Fog( BACKGROUND_COLOR, 200, 1000 );
        scene.background = new THREE.Color( BACKGROUND_COLOR );
        scene.fog = new THREE.Fog( BACKGROUND_COLOR, 700, 1500 );
    })
    document.getElementById("grid_color").addEventListener("change", () => {
        GRID_COLOR = document.getElementById("grid_color").value;
        scene.remove(grid);
        grid = new THREE.GridHelper( PLANE_SIZE, 100, GRID_COLOR, GRID_COLOR );
        grid.material.opacity = 1;
        grid.material.transparent = true;
        scene.add( grid );
    })
    document.getElementById("camera").addEventListener("click", () => {
         switchCamera();
    })

    // CAMERA
    // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2,  window.innerHeight / - 2, 1, 1000 );
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight , 1, 10000 );
    camera.position.set( -100, 100, 1000 );
    camera.lookAt( -100, 100, 0 );


    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color( BACKGROUND_COLOR );

    // FOG
    // scene.fog = new THREE.Fog( BACKGROUND_COLOR, 700, 1500 );

    // LIGHTS
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 400, 0 );
    scene.add( hemiLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 200, 100 );
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 180;
    directionalLight.shadow.camera.bottom = - 100;
    directionalLight.shadow.camera.left = - 120;
    directionalLight.shadow.camera.right = 120;
    scene.add( directionalLight );

    // GROUND
    ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( PLANE_SIZE, PLANE_SIZE ),
    new THREE.MeshPhongMaterial( { color: PLANE_COLOR, depthWrite: false } ) );

    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;

    scene.add( ground );

    // GridHelper( size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
    grid = new THREE.GridHelper( PLANE_SIZE, 100, BACKGROUND_COLOR, BACKGROUND_COLOR );
    grid.material.opacity = 1;
    grid.material.transparent = true;
    scene.add( grid );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;


    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    cameraRotationX = true;
    cameraRotationY = true;

    addObjects();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    if (MOVING_CAMERA){

        camera.position.z -= Number(selectedValue);
        if (WIERD_CAMERA){
            if (cameraRotationX){
                camera.rotation.x += 0.001*(selectedValue/10);
            }
            if(camera.rotation.x > 0.15){
                cameraRotationX = false;
            }
            if(!cameraRotationX){
                camera.rotation.x -= 0.0002*(selectedValue/10);
            }
            if(camera.rotation.x <= 0){
                cameraRotationX = true;
            }

            if (cameraRotationY){
                camera.rotation.y += 0.001*(selectedValue/10);
            }
            if(camera.rotation.y > 0.1){
                cameraRotationY = false;
            }
            if(!cameraRotationY){
                camera.rotation.y -= 0.002*(selectedValue/10);
            }
            if(camera.rotation.y <= 0){
                cameraRotationY = true;
            }
        }
        if(camera.position.z < -1000){
            camera.position.z = 1000;
        }
    }

    renderer.render( scene, camera );
}

