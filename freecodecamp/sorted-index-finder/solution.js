function getIndexToIns(arr, num) {
  arr.push(num);
  arr.sort((a, b) => a - b);
  return arr.findIndex((element) => element === num);
}
