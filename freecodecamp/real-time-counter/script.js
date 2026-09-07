const textInput = document.querySelector("#text-input");
const charCount = document.querySelector("#char-count");
textInput.addEventListener("input", () =>  {
  const currentText = textInput.value;
  const currentCount = currentText.length;

  if (currentCount >= 50) {
    charCount.style.color = "red";
    textInput.value = textInput.value.slice(0, 50);
    return;
  }

  charCount.textContent = `Character Count: ${currentCount}/50`;
});   
