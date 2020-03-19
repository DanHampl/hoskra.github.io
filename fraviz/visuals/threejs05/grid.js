function grid() {
    let grid_material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    let grid_geometry = new THREE.Geometry();
    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth*2, -window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth*2, window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth, -window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth, window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth/2, -window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth/2, window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth/4, -window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth/4, window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth*2, window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth*2, -window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth, window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth, -window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth/2, window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth/2, -window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth/4, window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth/4, -window.innerHeight, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( -window.innerWidth, 0, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( window.innerWidth, 0, 0 ));

    grid_geometry.vertices.push(new THREE.Vector3( 0, window.innerHeight, 0 ));
    grid_geometry.vertices.push(new THREE.Vector3( 0, -window.innerHeight, 0 ));

    grid_lines = new THREE.LineSegments( grid_geometry, grid_material );
}