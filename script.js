let audioCtx;
let sourceNode;
let filterNodes = [];
let isPlaying = false;

const fileInput = document.getElementById("audio-file");
const playBtn = document.getElementById("play-pause");

// Initialize Audio Context on user interaction
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!audioCtx) audioCtx = new AudioContext();

  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  setupEQ(audioBuffer);
  playBtn.disabled = false;
});

function setupEQ(buffer) {
  // If a source already exists, stop it
  if (sourceNode) sourceNode.stop();

  sourceNode = audioCtx.createBufferSource();
  sourceNode.buffer = buffer;
  sourceNode.loop = true;

  // Build the chain
  let lastNode = sourceNode;
  const bandElements = document.querySelectorAll(".eq-band");

  // Clear previous filters if any
  filterNodes = [];

  bandElements.forEach((el) => {
    const filter = audioCtx.createBiquadFilter();
    filter.type = el.dataset.type;

    const gainSlider = el.querySelector(".gain-slider");
    const freqSlider = el.querySelector(".freq-slider");
    const gainReadout = el.querySelector(".gain-val");
    const freqReadout = el.querySelector(".freq-val");

    // Parameter Mapping
    filter.frequency.value = freqSlider.value;
    filter.gain.value = gainSlider.value;

    gainSlider.oninput = (e) => {
      const val = parseFloat(e.target.value);
      filter.gain.setTargetAtTime(val, audioCtx.currentTime, 0.05);
      gainReadout.innerText = `${val.toFixed(1)}dB`;
    };

    freqSlider.oninput = (e) => {
      const val = parseFloat(e.target.value);
      filter.frequency.setTargetAtTime(val, audioCtx.currentTime, 0.05);
      freqReadout.innerText =
        val > 1000 ? `${(val / 1000).toFixed(1)}kHz` : `${val}Hz`;
    };

    lastNode.connect(filter);
    lastNode = filter;
    filterNodes.push(filter);
  });

  lastNode.connect(audioCtx.destination);
}

playBtn.onclick = () => {
  if (audioCtx.state === "suspended") audioCtx.resume();

  if (!isPlaying) {
    sourceNode.start(0);
    playBtn.innerText = "Stop";
    isPlaying = true;
  } else {
    location.reload(); // Simplest way to "reset" the source for a beginner project
  }
};
