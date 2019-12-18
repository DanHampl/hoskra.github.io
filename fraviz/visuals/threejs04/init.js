var scene, camera, renderer, exporter, mesh, grid, cameraRotationX, cameraRotationY;
var PLANE_SIZE = 10000;

// DEFAULT VALUES
let BACKGROUND_COLOR = 0x000000;
let PLANE_COLOR = 0x000000;
let GRID_COLOR = 0x00ffff;
let selectedValue = 10;
let WIERD_CAMERA = false
let MOVING_CAMERA = true;

var redMaterial = new THREE.MeshPhongMaterial( { color: 0x0007db, side: THREE.DoubleSide } );
var blueMaterial = new THREE.MeshPhongMaterial( { color: 0xf500ed, side: THREE.DoubleSide } );
var whiteMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
var volumeMaterial = new THREE.MeshPhongMaterial( { color: 0x00ffff, side: THREE.DoubleSide } );

let bassObjects = []
let midObjects = []
let highObjects = []
let volumeObject;

let MAX_BASS = 2500;
let MAX_MID = 750;
let MAX_HIGH = 200;

var bass, mid, high;

function draw() {

    bass = Mic.getBassVol(10, 255);
    mid = Mic.getMidsVol(10, 255);
    high = Mic.getHighsVol(10, 255);
    bass = bass;
    mid = mid;
    high = high;

    bass = bass > MAX_BASS ? MAX_BASS : bass;
    mid = mid > MAX_MID ? MAX_MID : mid;
    high = high > MAX_HIGH ? MAX_HIGH : high;

    vol = Mic.getVolume() * 100;

    // console.log(bass + " " + mid + " " + high);
    // console.log(vol);
    let camZ = camera.position.z;

    bassObjects.forEach(x => scene.remove(x));
    midObjects.forEach(x => scene.remove(x));
    highObjects.forEach(x => scene.remove(x));
    bassObjects = []
    midObjects = []
    highObjects = []

    // volume
    scene.remove(volumeObject);
    volumeObject = new THREE.Mesh( new THREE.BoxBufferGeometry( vol, 1, 100000 ), volumeMaterial );
    volumeObject.position.set( -100, -2000, 0);
    scene.add( volumeObject );

    // RED BASS
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( bass, 1, 1 ), redMaterial );
    object.position.set( -100, 0, -3000 + camZ);
    scene.add( object );
    bassObjects.push(object);

    // BLUE right
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( mid, 2, 2), blueMaterial );
    object.position.set( 600, 0, -1500 + camZ);
    scene.add( object );
    midObjects.push(object);
    // BLUE left
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( mid, 2, 2), blueMaterial );
    object.position.set( -800, 0, -1500 + camZ);
    scene.add( object );
    midObjects.push(object);

    // WHITE HIGHS
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( high, 2, 2), whiteMaterial );
    object.position.set( -200, 0, -1000 + camZ);
    scene.add( object );
    highObjects.push(object);

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( high, 2, 2), whiteMaterial );
    object.position.set( 200, 0, -500 + camZ);
    scene.add( object );
    highObjects.push(object);

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( high, 2, 2), whiteMaterial );
    object.position.set( -400, 0, -400 + camZ);
    scene.add( object )
    highObjects.push(object);
}

// ( right, up, front )
// (x, y, z)

function createObjects() {
    // volume
    volumeObject = new THREE.Mesh( new THREE.BoxBufferGeometry( 10, 1, 100000 ), volumeMaterial );
    volumeObject.position.set( -100, 0, 0 );
    scene.add( volumeObject );

    // center red
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 500 ), redMaterial );
    object.position.set( -100, 200, -2000 );
    scene.add( object );
    bassObjects.push(object);

    // right
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 200 ), blueMaterial );
    object.position.set( 600, 0, -1500 );
    scene.add( object );
    midObjects.push(object);
    // left
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 200 ), blueMaterial );
    object.position.set( -800, 0, -1500 );
    scene.add( object );
    midObjects.push(object);

    // high
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), whiteMaterial );
    object.position.set( -400, 0, -1000 );
    scene.add( object );
    highObjects.push(object);

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), whiteMaterial );
    object.position.set( 200, 0, -500 );
    scene.add( object );
    highObjects.push(object);

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 50 ), whiteMaterial );
    object.position.set( -400, 0, 0 );
    scene.add( object )
    highObjects.push(object);
}

function customGrid(y) {
    let grid_size = 100000, grid_step = 1000;
    let grid_geometry = new THREE.Geometry();
    let grid_material = new THREE.LineBasicMaterial({color: GRID_COLOR});

    for (let i = - grid_size; i <= grid_size; i += grid_step){
        grid_geometry.vertices.push(new THREE.Vector3(-grid_size, y, i));
        grid_geometry.vertices.push(new THREE.Vector3(grid_size, y, i));
        grid_geometry.vertices.push(new THREE.Vector3(i, y, -grid_size));
        grid_geometry.vertices.push(new THREE.Vector3(i, y, grid_size));
    }
    let grid_line = new THREE.Line(grid_geometry, grid_material, THREE.LineSegments);
    scene.add(grid_line);
}


init();
draw();

customGrid(-2000);
customGrid(2000);

animate(selectedValue, WIERD_CAMERA);

function init() {
    // EVENT LISTENERS
    document.getElementById("default").addEventListener("click", () => {
        //BACKGROUND_COLOR = 0x26ccff;
        //PLANE_COLOR = 0x000000;
        //GRID_COLOR = 0xa0a000;
        //ground.material.color.set(PLANE_COLOR);
        //// scene.fog = new THREE.Fog( BACKGROUND_COLOR, 600, 1000 );
        //scene.background = new THREE.Color( BACKGROUND_COLOR );
        //scene.remove(grid);
        //grid = new THREE.GridHelper( 10000, 100, BACKGROUND_COLOR, BACKGROUND_COLOR );
        //grid.material.opacity = 1;
        //grid.material.transparent = true;
        //scene.add( grid );
        //selectedValue = 2;
        WIERD_CAMERA = false;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        document.getElementById("dropdown").value = 5;
        document.getElementById("wierd_camera").checked = false;
    })
    document.getElementById("wierd_camera").addEventListener("change", () => {
        WIERD_CAMERA = document.getElementById("wierd_camera").checked;
    })
    document.getElementById("dropdown").addEventListener("change", () => {
        selectedValue = document.getElementById("dropdown").value;
    })
    // document.getElementById("plane_color").addEventListener("change", () => {
    //     PLANE_COLOR = document.getElementById("plane_color").value;
    //     ground.material.color.set(PLANE_COLOR);
    // })
    // document.getElementById("background_color").addEventListener("change", () => {
    //     BACKGROUND_COLOR = document.getElementById("background_color").value;
    //     // scene.fog = new THREE.Fog( BACKGROUND_COLOR, 200, 1000 );
    //     scene.background = new THREE.Color( BACKGROUND_COLOR );
    //     // scene.fog = new THREE.Fog( BACKGROUND_COLOR, 700, 1500 );
    // })
    // document.getElementById("grid_color").addEventListener("change", () => {
    //     GRID_COLOR = document.getElementById("grid_color").value;
    //     scene.remove(grid);
    //     grid = new THREE.GridHelper( PLANE_SIZE, 100, GRID_COLOR, GRID_COLOR );
    //     grid.material.opacity = 1;
    //     grid.material.transparent = true;
    //     scene.add( grid );
    // })
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

   // scene.add( ground );

    // GridHelper( size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
    grid = new THREE.GridHelper( PLANE_SIZE, 100, GRID_COLOR, GRID_COLOR );
    grid.material.opacity = 1;
    grid.material.transparent = true;
   // scene.add( grid );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;


    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    cameraRotationX = true;
    cameraRotationY = true;

  //  createObjects();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
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

