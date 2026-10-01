function steamrollArray(arr) {
  const lapis1 = arr.reduce((acc, item) => acc.concat(item), []);
  const lapis2 = lapis1.reduce((acc, item) => acc.concat(item), []);
  const lapis3 = lapis2.reduce((acc, item) => acc.concat(item), []);
  const lapis4 = lapis3.reduce((acc, item) => acc.concat(item), []);
  return lapis4;
}

console.log(steamrollArray([[["a"]], [["b"]]]))
