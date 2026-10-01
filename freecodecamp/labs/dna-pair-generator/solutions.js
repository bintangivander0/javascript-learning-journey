// Generator pasangan DNA
// Jika input 'ATCG', return: [["A", "T"], ["T", "A"], ["C", "G"], ["G", "C"]]
function pairElement(dna) {
  let result = [];
  const pecahkanInput = dna.split("");
  console.log(pecahkanInput);
  for (const karakter of pecahkanInput) {
    if (karakter === "A") {
      result.push(["A", "T"]);
    } else if (karakter === "T") {
      result.push(["T", "A"]);
    } else if (karakter === "C") {
      result.push(["C", "G"]);
    } else if (karakter === "G") {
      result.push(["G", "C"]);
    }
  }
  return result;
}
