function titleCase(str) {
  let hasil = [];
  const kataKata = str.toLowerCase().split(" ");
  for (let i = 0; i < kataKata.length; i++) {
    let kata = kataKata[i];
    if (kata.length > 0) {
      let kataBaru = kata.charAt(0).toUpperCase() + kata.slice(1);
      console.log(kataBaru);
      hasil.push(kataBaru);
    }
  }
  return hasil.join(" ");
}
console.log(titleCase("bintang hari ini sedang JALAN"));
