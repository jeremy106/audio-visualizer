// const playButton = document.getElementById("play")
// const stopButton = document.getElementById("stop")
// let audioFile = new Audio("audio/Alluvium.mp3")

const audioFile = document.getElementById("audioFile")

audioFile.addEventListener("playing", function(){
  console.log("playing")
  })

audioFile.addEventListener("pause", function(){
  console.log("paused")
  })

const container = document.getElementById("container")
const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext("2d")

const audioContext = new AudioContext()
let audioSource
let analyser
  
audioFile.addEventListener("playing", visualize)
// audioContext.resume()

function visualize () {
  console.log("wow graphics")
  audioSource = audioContext.createMediaElementSource(audioFile)
  analyser = audioContext.createAnalyser()
  audioSource.connect(analyser)
  analyser.connect(audioContext.destination)
  analyser.fftSize = 64
  const bufferLength = analyser.frequencyBinCount
  const dataArrary = new Uint8Array(bufferLength)

  const barWidth = canvas.width / bufferLength
  let barHeight
  let x

  function animate(){
    x = 0
    context.clearRect(0, 0, canvas.width, canvas.height)
    analyser.getByteFrequencyData(dataArrary)
    for (let i = 0; i < bufferLength; i++){
      barHeight = dataArrary[i]
      context.fillStyle = 'white'
      context.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
      x += barWidth
    }
    requestAnimationFrame(animate)
  }

  animate()
}








