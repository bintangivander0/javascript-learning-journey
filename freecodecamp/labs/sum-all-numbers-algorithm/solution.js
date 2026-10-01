function sumAll(arr) {
  const minNumber = Math.min(...arr);
  const maxNumber = Math.max(...arr);
  let result = 0;
  for (let i = minNumber; i <= maxNumber; i++) {
    result += i; 
  }
  return result;
}
