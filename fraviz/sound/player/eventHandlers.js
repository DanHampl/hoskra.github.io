$("#playPause").click(function() {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }
});

$("#stop").click(function() {
    audioElement.pause();
    audioElement.currentTime = 0;
    progressBar.style.width = 0;
    $("#playPause")[0].dataset.playing = 'false'
})

$('#panner')[0].addEventListener('input', function() {
    panner.pan.value = this.value;
}, false);


$("#songSelect").change(() => {
    $("#source")[0].src = $("#songSelect")[0].value;
    audioElement.load();
    audioElement.play();
    track.connect(panner).connect(audioContext.destination);
    $("#playPause")[0].dataset.playing = 'true'
})