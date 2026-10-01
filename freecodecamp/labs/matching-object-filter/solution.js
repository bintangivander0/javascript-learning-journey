function whatIsInAName(arr, source) {
  return arr.filter((item) => {
    return Object.keys(source).every((key) => item[key] === source[key]);
  });
}

console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));
