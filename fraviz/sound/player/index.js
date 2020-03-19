// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
// https://github.com/mdn/webaudio-examples
// https://github.com/ahmedash95/audio-spleeter

// https://www.html5rocks.com/en/tutorials/webaudio/intro/

// main inspiration repo:
// https://github.com/GeorgeGally/creative_coding

var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// If you just want to process audio data, for instance,
// buffer and stream it but not play it, you might want
// to look into creating an OfflineAudioContext.

// Cross-Origin Resource Sharing (CORS) - is the sound on same page?

const timer = $("#timer") ? $("#timer")[0] : ""
const progressBar = $("#progressBar") ? $("#progressBar")[0] : ""
const audioElement = $("#mainAudio") ? $("#mainAudio")[0] : ""
const track = audioContext.createMediaElementSource(audioElement)

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

track.connect(panner).connect(audioContext.destination);



let data = []

navigator.getUserMedia({ audio: true }, processSound, error);

var FFT_SIZE = 2048;
let spectrum = new Uint8Array(FFT_SIZE/2);

function processSound (stream) {
    // analyser extracts frequency, waveform, and other data
    var analyser = audioContext.createAnalyser();
    analyser.smoothingTimeConstant = 0.2;
    analyser.fftSize = FFT_SIZE;

    var node = audioContext.createScriptProcessor(FFT_SIZE*2, 1, 1);

    node.onaudioprocess = function () {
        // getByteFrequencyData returns the amplitude for each frequency
        analyser.getByteFrequencyData(spectrum);
        self.data = adjustFreqData(spectrum);

        // getByteTimeDomainData gets volumes over the sample time
        //analyser.getByteTimeDomainData(dataArray);
        self.vol = self.getRMS(spectrum);
        // get peak
        if (self.vol > self.peak_volume) self.peak_volume = self.vol;
        self.volume = self.vol;
    };

    track.connect(analyser);
    analyser.connect(node);
    node.connect(audioContext.destination);
}

function error () {
    console.log(arguments);
  }

function getRMS (spectrum) {

    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
      rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
}

function adjustFreqData(frequencyData, ammt) {
    // get frequency data, remove obsolete
  //analyserNode.getByteFrequencyData(frequencyData);

  frequencyData.slice(0,frequencyData.length/2);
  var new_length = ammt || 16;
  var newFreqs = [], prevRangeStart = 0, prevItemCount = 0;
  // looping for my new 16 items
  for (let j=1; j<=new_length; j++) {
      // define sample size
    var pow, itemCount, rangeStart;
    if (j%2 === 1) {
      pow = (j-1)/2;
    } else {
      pow = j/2;
    }
    itemCount = Math.pow(2, pow);
    if (prevItemCount === 1) {
      rangeStart = 0;
    } else {
      rangeStart = prevRangeStart + (prevItemCount/2);
    }

        // get average value, add to new array
    var newValue = 0, total = 0;
    for (let k=rangeStart; k<rangeStart+itemCount; k++) {
      // add up items and divide by total
      total += frequencyData[k];
      newValue = total/itemCount;
    }
    newFreqs.push(newValue);
    // update
    prevItemCount = itemCount;
    prevRangeStart = rangeStart;
  }
  return newFreqs;
  }









let draw = () => {
    updateProgress()
}

setInterval(() => {
    draw();
}, 50);


























// NODE JS ?
// https://github.com/chrisguttandin/web-audio-beat-detector
// http://joesul.li/van/beat-detection-using-web-audio/
// REACT THREE FIBER
// https://github.com/react-spring/react-three-fiber/blob/master/recipes.md