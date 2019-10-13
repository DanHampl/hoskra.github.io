// NUMBER constants:
let FPS             = 20;
let WIN_WIDTH       = "1200";
let WIN_HEIGHT      = "800";

let FOG             = 1;
let FOG_VISIBILITY  = 0.95;
let LINE_WIDTH      = 1;
let DIAGONAL_CNT    = 4;
let HORIZONTAL_CNT  = 6;
let SPEED           = 0.5;

// COLOR options:
// black / navy / blue / green / teal / lime / aqua / maroon
// purple / olive / gray / silver / red / fuchsia / yellow / white
let BG_COLOR        = "black";
let LINE_COLOR      = "cyan";
let BG_COLOR_RGBA   = transparent_black;

// variables
let now, delta, then = Date.now();
let interval = 1000/FPS;

let canvas1, canvas2, canvas3;
let ctx1, ctx2, ctx3;

let iterLines = WIN_HEIGHT/2;

init = () => {
    canvas1 = document.getElementById("canvas1");
    ctx1 = canvas1.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    ctx2 = canvas1.getContext("2d");
    canvas3 = document.getElementById("canvas3");
    ctx3 = canvas3.getContext("2d");

    canvas1.width = WIN_WIDTH;
    canvas1.height = WIN_HEIGHT;
    canvas2.width = WIN_WIDTH;
    canvas2.height = WIN_HEIGHT;
    canvas3.width = WIN_WIDTH;
    canvas3.height = WIN_HEIGHT;

    ctx1.fillStyle = BG_COLOR;
    ctx1.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    ctx1.strokeStyle  = LINE_COLOR;
    ctx1.lineWidth = LINE_WIDTH;

    ctx2.strokeStyle  = LINE_COLOR;
    ctx2.lineWidth = LINE_WIDTH;

    ctx3.strokeStyle  = LINE_COLOR;
    ctx3.lineWidth = LINE_WIDTH;

    grid();
    animate();
}

grid = () => {

    for(let i = 0; i <= DIAGONAL_CNT; i++) {
        let x1 = ( (DIAGONAL_CNT - i) / DIAGONAL_CNT );
        let x2 = ( (i)     / DIAGONAL_CNT );
        let x3 = ( (DIAGONAL_CNT - i) / DIAGONAL_CNT );
        let x4 = ( (i)     / DIAGONAL_CNT );

        ctx1.moveTo( WIN_WIDTH * x1, WIN_HEIGHT );
        ctx1.lineTo( WIN_WIDTH * x2, 0 );
        ctx1.moveTo( 0, WIN_HEIGHT * x3);
        ctx1.lineTo( WIN_WIDTH, WIN_HEIGHT * x4);
    }

    ctx1.stroke();

    let i = 0;
    let x1 = ( (DIAGONAL_CNT - i) / DIAGONAL_CNT );
    let x2 = ( (i)     / DIAGONAL_CNT );
    let x3 = ( (DIAGONAL_CNT - i) / DIAGONAL_CNT );
    let x4 = ( (i)     / DIAGONAL_CNT );
    ctx1.moveTo( WIN_WIDTH * x1, WIN_HEIGHT );
    ctx1.lineTo( WIN_WIDTH * x2, 0 );
    ctx1.moveTo( 0, WIN_HEIGHT * x3);
    ctx1.lineTo( WIN_WIDTH, WIN_HEIGHT * x4);
    ctx1.stroke();

    // Create gradient
    let grd = ctx1.createLinearGradient(0, WIN_WIDTH*0.3, 0, 0);
    grd.addColorStop(FOG_VISIBILITY, BG_COLOR_RGBA);
    grd.addColorStop(0, BG_COLOR);
    ctx1.fillStyle = grd;
    if(FOG) ctx1.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT/2);

    grd = ctx1.createLinearGradient(0, WIN_HEIGHT*0.65, 0, WIN_HEIGHT);
    grd.addColorStop(FOG_VISIBILITY, BG_COLOR_RGBA);
    grd.addColorStop(0, BG_COLOR);
    ctx1.fillStyle = grd;
    if(FOG) ctx1.fillRect(0, WIN_HEIGHT/2, WIN_WIDTH, WIN_HEIGHT/2);

    grd = ctx1.createRadialGradient(WIN_WIDTH/2, WIN_HEIGHT/2, 50, WIN_WIDTH/2, WIN_HEIGHT/2, WIN_WIDTH/2);
    grd.addColorStop(FOG_VISIBILITY, BG_COLOR_RGBA);
    grd.addColorStop(0, BG_COLOR);
    ctx1.fillStyle = grd;
    // if(FOG) ctx1.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);

    let start = WIN_HEIGHT;

    // ctx3.moveTo( 0, WIN_HEIGHT/2 );
    // ctx3.lineTo( WIN_WIDTH, WIN_HEIGHT/2 );

    // for(let i = 0; i <= HORIZONTAL_CNT; i++){
    //     ctx3.moveTo( 0, WIN_HEIGHT/2 + (start * 1)/(1*(2**i)) );
    //     ctx3.lineTo( WIN_WIDTH, WIN_HEIGHT/2 + (start * 1)/(1*(2**i)) );
    // }

    ctx3.stroke();
}

animate = () => {

    requestAnimationFrame(animate);

    now = Date.now();
    delta = now - then;
    if (delta > interval) {

        then = now - (delta % interval);
        ctx2.fillStyle = BG_COLOR;
        ctx2.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
        ctx2.beginPath();

        for(let i = 0; i <= HORIZONTAL_CNT; i++){
            let y =
                    WIN_HEIGHT/2**i
                    +
                    iterLines/(HORIZONTAL_CNT) * WIN_HEIGHT/2**i;

            ctx2.moveTo( 0, WIN_HEIGHT/2 - y );
            ctx2.lineTo( WIN_WIDTH, WIN_HEIGHT/2 - y );
            ctx2.stroke();
        }

        for(let i = 0; i <= HORIZONTAL_CNT; i++){
            let y =
                    WIN_HEIGHT/2**i
                    *
                    (iterLines/HORIZONTAL_CNT + 1);

            ctx2.moveTo( 0, y + WIN_HEIGHT/2 );
            ctx2.lineTo( WIN_WIDTH, y + WIN_HEIGHT/2 );
            ctx2.stroke();
        }

        grid();

        iterLines = iterLines + SPEED;

        if (iterLines >= HORIZONTAL_CNT){
            iterLines = 0;
        }
    }

}


init();