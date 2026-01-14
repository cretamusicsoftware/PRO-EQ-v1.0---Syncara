# Pro-DSP: Multi-Band Parametric EQ & FFT Visualizer

A high-performance, browser-based Parametric Equalizer built using the **Web Audio API**. This project demonstrates real-time Digital Signal Processing (DSP) and frequency analysis.

## 🛠 Technical Features

- **Serial Signal Chain:** Audio is routed through a series of `BiquadFilterNodes` to ensure phase-coherent frequency manipulation.
- **Dynamic FFT Analysis:** Real-time frequency domain visualization using `AnalyserNode` and HTML5 Canvas.
- **Parametric Control:** Independent control over Gain and Frequency with `setTargetAtTime` smoothing to prevent parameter "zipper noise."
- **Media Bridging:** Uses `createMediaElementSource` to allow persistent playback and seeking of local files.

## 🚀 How to Run

1. Clone the repo.
2. Open `index.html` in any modern browser.
3. Upload an MP3/WAV file.
4. Adjust the sliders to sculpt the sound.

## 🧠 DSP Concepts Explored

- **Filter Topologies:** Low-shelf, High-shelf, and Peaking filters.
- **Buffer Management:** Handling decoded audio data for visualization.
- **Interpolation:** Linear smoothing of audio parameters to ensure artifact-free processing.

![preview img](/Pro-Parametric-EQ-01-14-2026.png)
