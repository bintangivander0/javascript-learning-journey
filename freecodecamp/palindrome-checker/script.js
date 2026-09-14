const textInput = document.querySelector("#text-input");
const checkButton = document.querySelector("#check-btn");
const result = document.querySelector("#result");

checkButton.addEventListener("click", () => {
  if (textInput.value === "") {
    alert("Please input a value");
    return;
  }

  const originalText = textInput.value;
  console.log(originalText);

  const cleanedText = originalText.replace(/[^a-z0-9]/gi, "").toLowerCase();
  console.log(cleanedText);

  const reverseText = cleanedText.split("").reverse().join("");
  console.log(reverseText);

  const isPalindrome = cleanedText === reverseText;

  result.textContent = isPalindrome? `${originalText} is a palindrome` : `${originalText} is not a palindrome`;
});
