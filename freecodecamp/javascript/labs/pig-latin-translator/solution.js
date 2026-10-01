function translatePigLatin(str) {
  const regexKonsonan = /^[b-df-hj-np-tv-z]+/i;
  const regexVocal = /^[aiueo]+/i;

  const match1 = str.match(regexKonsonan);
  console.log(`Hasil kecocokan huruf konsonan di awal string: ${match1}`);

  const match2 = str.match(regexVocal);
  console.log(`Hasil kecocokan huruf vocal di awal string: ${match2}`);

  if (match1) {
    const remainingCharsAfterMatch1 = str.slice(match1[0].length);
    console.log(`Sisa huruf setelah regexKonsonan pada awal kata dihilangkan: ${remainingCharsAfterMatch1}`);
    return remainingCharsAfterMatch1 + match1[0] + `ay`;
  } else if (match2) {
    return str + 'way';
  }
}

console.log(translatePigLatin("glove"));
console.log(translatePigLatin("eight"));
console.log(translatePigLatin("algorithm"));
