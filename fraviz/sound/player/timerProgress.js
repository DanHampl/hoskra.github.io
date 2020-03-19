function updateProgress() {
    if(audioElement.duration === audioElement.currentTime){
        progressBar.style.width = 0;
        timer.innerHTML = "00:00";
    }
    let e = Math.floor((100 / audioElement.duration) * audioElement.currentTime);
    progressBar.style.width = e + "%";
    var mins = Math.floor(audioElement.currentTime / 60);
    var secs = Math.floor(audioElement.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    let minutes = Math.floor(audioElement.duration / 60);
    let seconds = Math.floor(audioElement.duration % 60);

    timer.innerHTML = mins + ':' + secs + ' / ' + minutes + ':' + seconds;
}