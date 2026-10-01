function smallestCommons(arr) {
  const smallestNum = Math.min(...arr);
  const highestNum = Math.max(...arr);
  const length = highestNum - smallestNum + 1;

  const fPB = (a, b) => b === 0 ? a : fPB(b, a % b);
  const kPK = (a, b) => (a * b) / fPB(a, b);

  return Array(length)
    .fill(0)
    .map((element, index) => smallestNum + index)
    .reduce((totalKPK, currentNum) => kPK(totalKPK, currentNum));
}
