function spinalCase(str) {
  return str
    .trim()
    .split(/(?=[A-Z])|\s+|_+/)
    .join("-")
    .toLowerCase();
}

console.log(spinalCase("This Is Spinal Tap"));

console.log(spinalCase("ThisIsSpinalTap"));

console.log(spinalCase("The_Andy_Griffith_Show"));
