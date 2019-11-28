function makeGrid(_w, _h) {
  var grid = [];
  var k = 0;
  for (var y = 0; y < _h; y++) {
    for (var x = 0; x < _w; x++) {
      grid[k] = [x, y];
      k++;
    }
  }
  ;
  //console.log(grid);
  return grid;
}
