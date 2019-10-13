let scene, renderer, camera;
let grid_lines;

const init = () => {
    // scene, camera and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

render = () => {
    renderer.render(scene, camera);
}

init();
grid();
scene.add( grid_lines );

// --------------------------------
// cant set linewidth
let horizontalLine_material = new THREE.LineBasicMaterial({
    color: 0xffaaff,
    linewidth: 50
});

let horizontalLine_geometry = new THREE.Geometry();
horizontalLine_geometry.vertices.push(new THREE.Vector3( window.innerWidth, 0, 0 ));
horizontalLine_geometry.vertices.push(new THREE.Vector3( -window.innerWidth, 0, 0 ));

horizontalLine = new THREE.LineSegments( horizontalLine_geometry, horizontalLine_material );
scene.add( horizontalLine );
// --------------------------------

render();