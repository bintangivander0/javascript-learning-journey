function myReplace(str, wordToBeReplaced, wordToReplaceItWith) {
  const regex = new RegExp(wordToBeReplaced, `gi`);

  return str.replace(regex, function(kataYangKetemu) {
    if (kataYangKetemu[0] === kataYangKetemu[0].toUpperCase()) {
      return wordToReplaceItWith.charAt(0).toUpperCase() + wordToReplaceItWith.slice(1).toLowerCase();
    }
    return wordToReplaceItWith.toLowerCase();
  })
}

console.log(myReplace("Let us go to the store", "store", "mall"));
console.log(myReplace("He is Sleeping on the couch", "Sleeping", 
"sitting"));
console.log(myReplace("I think we should look up there", "up", "Down"));
console.log(myReplace("This has a spellngi error", "spellngi", "spelling"));
console.log(myReplace("His name is Tom", "Tom", "john"));
