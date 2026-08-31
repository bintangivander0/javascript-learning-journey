function uniteUnique(...arrs) {
  let result = [];
  for (let i = 0; i < arrs.length; i++) {
    const currentArray = arrs[i];
    for (let j = 0; j < currentArray.length; j++) {
      const currentNumber = currentArray[j];
      if (result.indexOf(currentNumber) === -1) {
        result.push(currentNumber);
      }
    }
  }
  return result;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4],[2, 1]))

console.log(uniteUnique([1, 2, 3], [5, 2, 1]));
