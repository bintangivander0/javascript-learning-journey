function convertHTML(str) {
  const strTerpisah = str.split("");
  for (let i = 0; i < strTerpisah.length; i++) {
    if (strTerpisah[i] === `&`) {
      strTerpisah[i] = `&amp;`;
    } else if (strTerpisah[i] === `<`) {
      strTerpisah[i] = `&lt;`;
    } else if (strTerpisah[i] === `>`) {
      strTerpisah[i] = `&gt;`;
    } else if (strTerpisah[i] === `"`) {
      strTerpisah[i] = `&quot;`;
    } else if (strTerpisah[i] === `'`) {
      strTerpisah[i] = `&apos;`;
    }
  }
  return strTerpisah.join("");
}

console.log(convertHTML("Dolce & Gabbana"))
