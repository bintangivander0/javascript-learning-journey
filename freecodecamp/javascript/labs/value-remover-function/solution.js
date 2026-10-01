function destroyer(arr, ...numToDel) {
  return arr.filter((item) => !numToDel.includes(item));
}

console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3));
