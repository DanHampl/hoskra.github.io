let path = "human_activity.mp3"
let audio = new Audio(path);

let promise = audio.play();

if (promise !== undefined) {
promise.then(_ => {
    // Autoplay started!
}).catch(error => {
    audio.play();
    // Autoplay was prevented.
    // Show a "Play" button so that user can start playback.
});
}

document.getElementById("play").addEventListener("click", () => {
    audio.play();
});

document.getElementById("pause").addEventListener("click", () => {
    audio.pause();
});

document.getElementById("stop").addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
});



let context = new AudioContext();
let analyser = context.createAnalyser();
analyser.id = "analyser";
let source = context.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(context.destination);
analyser.fftSize = 512;
let array = new Uint8Array(analyser.frequencyBinCount);

let bars = 512 / 4;
let playButton = document.getElementById('play');

playButton.addEventListener("click", function () {
    audio.play();
    audio.muted = false;
})
let visualizer = document.getElementById('visualizer');

let bar = document.createElement("div");

visualizer.appendChild(bar);
bar.style.height = '160px';

for (let i = 0; i < analyser.fftSize; i++) {
    let bar = document.createElement("div");
    bar.id = i;
    visualizer.appendChild(bar);
}


let myWidth = 900;
let myHeight = 600;
let size = 256;


setInterval(() => {
    draw();
}, 50);

function draw() {
    analyser.getByteFrequencyData(array);
    for (let i = 0; i < bars; i++) {
        let bar = document.getElementById(i)
        bar.style =
            "background-color: #1dff00; position:relatie; display:inline-block; bottom:0; vertical-align:bottom; border: 0.5px solid black; margin: auto; display:inline-block; align-self:flex-end";
        let barWidth = myWidth / bars - 1;
        let factor = array[(size / bars) * i] / size;
        let barHeight = myHeight * factor;
        bar.style.width = barWidth + "px";
        bar.style.height = barHeight + "px";
    }
}




let drawButton = document.getElementById('draw');

drawButton.addEventListener("click", function () {
    draw();
})

