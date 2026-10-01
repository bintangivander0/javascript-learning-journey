const drumPadElements = document.querySelectorAll(".drum-pad");
const displayElement = document.getElementById("display");
const powerButton = document.getElementById("power");
const volumeElement = document.getElementById("volume");

let isPowerOn = powerButton.checked;

let volumeLevel = volumeElement.value / 100;

drumPadElements.forEach((drumPad) => {
  drumPad.addEventListener("click", () => {
    if (!isPowerOn) return;
    const audio = drumPad.querySelector(".clip");
    audio.currentTime = 0;
    audio.play();
    audio.volume = volumeLevel;
    displayElement.textContent = drumPad.id;
  })
})

document.addEventListener("keydown", (event) => {
  if (!isPowerOn) return;
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) {
    keyElement.currentTime = 0;
    keyElement.play();
    keyElement.volume = volumeLevel;
    displayElement.textContent = keyElement.parentElement.id;
    keyElement.parentElement.classList.add("active");
    setTimeout(() => {
      keyElement.parentElement.classList.remove("active");
    }, 150)
  }
})

powerButton.addEventListener("change", () => {
  isPowerOn = powerButton.checked;
  displayElement.textContent = isPowerOn? "On" : "Off";
  console.log(isPowerOn);
})

volumeElement.addEventListener("input", () => {
  displayElement.textContent = Number(volumeElement.value) !== 0 ? `Volume at ${volumeElement.value}` : `Volume off`;
  volumeLevel = volumeElement.value / 100;
})
