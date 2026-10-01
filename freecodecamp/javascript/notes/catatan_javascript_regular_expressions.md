# Review Regular Expressions JavaScript

Catatan ini menerjemahkan materi **JavaScript Regular Expressions Review** ke bahasa Indonesia yang lebih sederhana. Urutan bagian, konsep, dan contoh kode tetap dipertahankan. Beberapa bagian yang mudah membingungkan diberi penjelasan tambahan tanpa mengubah inti materi.

## Regular Expressions dan Method yang Umum Digunakan

- **Definisi**: Regular Expressions, atau Regex, digunakan untuk membuat sebuah **pola (pattern)**. Pola ini kemudian bisa digunakan untuk memeriksa sebuah string, mengambil bagian teks tertentu, dan kebutuhan pencarian teks lainnya.

```js
const regex = /freeCodeCamp/;
```

- **Constructor `RegExp`**: Jika pattern atau flag berasal dari variable, kita bisa membuat Regex dengan constructor `RegExp`. Constructor ini menerima sebuah string sebagai pattern dan sebuah string flag yang sifatnya opsional.

```js
const pattern = "freeCodeCamp";
const flags = "gi";
const regex = new RegExp(pattern, flags);
console.log(regex); // /freeCodeCamp/gi
```

> **Penjelasan tambahan:** Regex literal seperti `/freeCodeCamp/gi` cocok ketika pattern sudah diketahui saat menulis kode. `new RegExp(pattern, flags)` berguna ketika pattern atau flag baru diketahui dari variable, input user, atau hasil proses lain.

- **Method `test()`**: Method ini menerima sebuah string yang ingin diperiksa terhadap Regular Expression. Method ini mengembalikan nilai boolean, yaitu `true` jika ada kecocokan dan `false` jika tidak ada kecocokan.

```js
const regex = /freeCodeCamp/;
const test = regex.test("e");
console.log(test); // false
```

- **Method `match()`**: Method ini menerima sebuah Regular Expression. Kita juga bisa memberikan string, yang nantinya akan diperlakukan sebagai Regular Expression. Method `match()` mengembalikan array yang berisi hasil kecocokan pada string.

```js
const regex = /freeCodeCamp/;
const match = "freeCodeCamp".match(regex);
console.log(match); // ['freeCodeCamp', index: 0, input: 'freeCodeCamp', groups: undefined]
```

> **Penjelasan tambahan:** Jika tidak ada kecocokan, `match()` akan mengembalikan `null`. Jika ada kecocokan, elemen pertama seperti `match[0]` berisi teks yang benar-benar cocok dengan Regex.

- **Method `replace()`**: Method ini menerima dua argument: Regular Expression atau string yang ingin dicari, lalu string pengganti. Argument kedua juga bisa berupa function yang dijalankan untuk setiap match yang diganti.

```js
const regex = /Jessica/;
const str = "Jessica is rly kewl";
const replaced = str.replace(regex, "freeCodeCamp");
console.log(replaced); // "freeCodeCamp is rly kewl"
```

- **Method `replaceAll()`**: Method ini digunakan untuk mengganti semua kemunculan dari pattern tertentu dengan string baru. Method ini akan menghasilkan error jika kita memberikan sebuah Regular Expression yang tidak memakai global modifier `g`.

```js
const text = "I hate JavaScript! I hate programming!";
const newText = text.replaceAll("hate", "love");
console.log(newText);  // "I love JavaScript! I love programming!"
```

> **Penjelasan tambahan:** Jika argument pertama berupa string seperti contoh di atas, `replaceAll()` langsung mencari semua kemunculan string tersebut. Jika argument pertama berupa Regex, Regex itu harus menggunakan flag `g`.

- **Method `matchAll()`**: Method ini digunakan untuk mengambil semua hasil kecocokan dari sebuah Regular Expression di dalam string, termasuk capturing group. Hasilnya dikembalikan sebagai **iterator**. Iterator adalah object yang memungkinkan kita membaca sekumpulan hasil satu per satu.

```js
const str = "JavaScript, Python, JavaScript, Swift, JavaScript";
const regex = /JavaScript/g;

const iterator = str.matchAll(regex);

for (let match of iterator) {
  console.log(match[0]); // "JavaScript" untuk setiap match
}
```

> **Penjelasan tambahan:** `matchAll()` tidak langsung menghasilkan array biasa. Karena hasilnya iterator, kita bisa membacanya dengan `for...of`. Jika ingin mengubahnya menjadi array, kita bisa menggunakan `Array.from(iterator)`.

## Modifier Regular Expression

- **Definisi**: Modifier, yang juga sering disebut **flag**, digunakan untuk mengubah cara sebuah Regular Expression bekerja.

- **Flag `i`**: Flag ini membuat Regex mengabaikan perbedaan huruf besar dan huruf kecil.

```js
const regex = /freeCodeCamp/i;
console.log(regex.test("freecodecamp")); // true
console.log(regex.test("FREECODECAMP")); // true
```

- **Flag `g`**: Flag ini, atau global modifier, membuat Regular Expression dapat mencari pattern lebih dari satu kali di dalam string.

```js
const regex = /freeCodeCamp/gi;
console.log(regex.test("freeCodeCamp")); // true
console.log(regex.test("freeCodeCamp is great")); // false
```

> **Penjelasan tambahan:** Contoh `test()` di atas bisa terasa aneh karena pemanggilan kedua menghasilkan `false`. Saat Regex menggunakan flag `g`, object Regex menyimpan posisi pencarian terakhir di property `lastIndex`. Karena Regex yang sama dipakai lagi, pencarian kedua dimulai dari posisi yang tersimpan, bukan selalu dari awal string. Ini adalah perilaku khusus yang penting ketika memakai `test()` berulang kali bersama flag `g`.

- **Definisi Anchor**: Anchor `^` yang berada di awal Regular Expression berarti **cocokkan bagian awal string**. Anchor `$` yang berada di akhir Regular Expression berarti **cocokkan bagian akhir string**.

```js
const start = /^freeCodeCamp/i;
const end = /freeCodeCamp$/i;
console.log(start.test("freecodecamp")); // true
console.log(end.test("freecodecamp")); // true
```

> **Penjelasan tambahan:** `^` dan `$` tidak mencari karakter tertentu. Keduanya memeriksa posisi: `^` memeriksa posisi awal string dan `$` memeriksa posisi akhir string.

- **Flag `m`**: Secara default, anchor melihat awal dan akhir dari seluruh string. Dengan flag `m`, atau multi-line modifier, anchor juga dapat bekerja pada awal dan akhir setiap baris di dalam string yang terdiri dari beberapa baris.

```js
const start = /^freecodecamp/im;
const end = /freecodecamp$/im;
const str = `I love 
freecodecamp
it's my favorite
`;
console.log(start.test(str)); // true
console.log(end.test(str)); // true
```

- **Flag `d`**: Flag ini menambahkan informasi posisi ke object hasil match.

```js
const regex = /freecodecamp/di;
const string = "we love freecodecamp isn't freecodecamp great?";
console.log(string.match(regex));
```

Hasilnya:

```js
// [
//   'freecodecamp',
//   index: 8,
//   input: "we love freecodecamp isn't freecodecamp great?",
//   groups: undefined,
//   indices: [
//     0: [8, 20],
//     groups: undefined
//   ]
// ]
```

> **Penjelasan tambahan:** `indices[0]` menunjukkan posisi awal dan posisi akhir match. Pada `[8, 20]`, karakter match dimulai di index `8`, sedangkan `20` adalah batas akhir setelah karakter terakhir yang cocok.

- **Flag `u`**: Flag ini memperluas kemampuan Regular Expression untuk menangani karakter Unicode dengan lebih tepat. Flag `u` juga mendukung penggunaan Unicode property escapes untuk kelompok karakter tertentu, termasuk kelompok seperti `Extended_Pictographic` yang dapat membantu mencocokkan banyak emoji. Ada juga flag `v` yang memperluas kemampuan pencocokan Unicode lebih lanjut.

- **Flag `y`**: Sticky modifier bekerja mirip dengan global modifier, tetapi lebih ketat. Regex global dapat mulai dari `lastIndex` lalu mencari lebih jauh sampai menemukan match. Regex sticky hanya akan berhasil jika match tepat berada di posisi `lastIndex`. Jika tidak ada match tepat di posisi itu, hasilnya `null` dan `lastIndex` direset menjadi `0`.

- **Flag `s`**: Single-line modifier membuat wildcard `.`, yang biasanya tidak mencocokkan line break, menjadi bisa mencocokkan line break juga. Dengan flag ini, `.` dapat membaca karakter lintas baris.

## Character Classes

- **Wildcard `.`**: Character class adalah syntax khusus yang digunakan untuk mencocokkan kelompok atau bagian tertentu dari karakter. Salah satu yang pertama dipelajari adalah wildcard. Wildcard ditulis dengan tanda titik `.` dan mencocokkan **satu karakter apa pun kecuali line break**. Jika ingin wildcard juga mencocokkan line break, gunakan flag `s`.

```js
const regex = /a./;
```

> **Penjelasan tambahan:** Pada `/a./`, huruf `a` harus ada terlebih dahulu, lalu `.` mencocokkan satu karakter setelah `a` selama karakter tersebut bukan line break, kecuali flag `s` digunakan.

- **`\d`**: Digunakan untuk mencocokkan digit `0-9` di dalam string.

```js
const regex = /\d/;
```

> **Penjelasan tambahan:** Tanpa flag `g`, Regex biasanya mencari satu match pada satu proses pencarian. Jika ingin mencari semua kemunculan digit, gunakan flag `g`, misalnya `/\d/g`.

- **`\w`**: Digunakan untuk mencocokkan word character (`a-zA-Z0-9_`) di dalam string. Word character berarti huruf `a-z`, huruf `A-Z`, angka `0-9`, atau underscore `_`.

```js
const regex = /\w/;
```

- **`\s`**: White-space class `\s` ditulis dengan backslash lalu huruf `s`. Character class ini mencocokkan whitespace, termasuk line break, spasi, tab, dan beberapa karakter spasi Unicode.

- **Membalik Special Character Class**: Untuk mencari kebalikan dari special character class, gunakan huruf besar setelah backslash. Contoh berikut tidak mencocokkan digit. Sebaliknya, Regex ini mencocokkan satu karakter yang **bukan** digit.

```js
const regex = /\D/;
```

> **Penjelasan tambahan:** Pola yang sama juga berlaku pada `\W` yang berarti bukan word character dan `\S` yang berarti bukan whitespace.

- **Custom Character Classes**: Kita bisa membuat character class sendiri dengan menempatkan karakter yang ingin dicocokkan di dalam kurung siku `[]`.

```js
const regex = /[abcdf]/;
```

> **Penjelasan tambahan:** `[abcdf]` berarti cocokkan **satu karakter** yang berupa `a`, `b`, `c`, `d`, atau `f`. Ini bukan berarti mencari kata `abcdf` secara utuh.

## Lookahead dan Lookbehind Assertions

- **Definisi**: Lookahead dan lookbehind assertion memungkinkan kita mencocokkan sebuah pattern berdasarkan ada atau tidak adanya pattern lain di sekitarnya.

> **Penjelasan tambahan:** Assertion digunakan sebagai kondisi. Bagian yang diperiksa oleh lookahead atau lookbehind tidak ikut menjadi bagian utama dari teks yang dikembalikan sebagai match.

- **Positive Lookahead Assertion**: Assertion ini mencocokkan sebuah pattern jika setelah pattern tersebut terdapat pattern lain yang menjadi syarat. Untuk membuat positive lookahead, tulis pattern yang ingin dicocokkan terlebih dahulu. Setelah itu, bungkus pattern yang menjadi syarat dengan tanda kurung dan awali dengan `?=`.

```js
const regex = /free(?=code)/i;
```

> **Penjelasan tambahan:** Regex di atas mencocokkan `free` hanya jika setelahnya langsung ada `code`. Bagian `code` dipakai sebagai syarat, tetapi hasil match utamanya adalah `free`.

- **Negative Lookahead Assertion**: Ini adalah kondisi pada Regular Expression yang memastikan bahwa pattern tertentu **tidak muncul setelah** bagian yang sedang dicocokkan.

```js
const regex = /free(?!code)/i;
```

> **Penjelasan tambahan:** Regex ini mencocokkan `free` hanya jika setelah `free` tidak langsung terdapat `code`.

- **Positive Lookbehind Assertion**: Assertion ini mencocokkan sebuah pattern hanya jika sebelumnya terdapat pattern tertentu. Pattern sebelumnya hanya menjadi syarat dan tidak ikut menjadi hasil match utama.

```js
const regex = /(?<=free)code/i;
```

> **Penjelasan tambahan:** Regex ini mencocokkan `code` hanya jika tepat sebelumnya terdapat `free`.

- **Negative Lookbehind Assertion**: Assertion ini memastikan bahwa sebuah pattern tidak didahului oleh pattern tertentu. Match hanya berhasil jika bagian sebelumnya bukan sequence yang ditentukan, dan sequence sebelumnya tidak ikut menjadi hasil match utama.

```js
const regex = /(?<!free)code/i;
```

> **Penjelasan tambahan:** Regex ini mencocokkan `code` hanya jika tepat sebelumnya tidak terdapat `free`.

## Regex Quantifiers

- **Definisi**: Quantifier pada Regular Expression menentukan berapa kali sebuah pattern, atau bagian dari pattern, harus muncul. Quantifier digunakan untuk mengatur jumlah kemunculan karakter atau group di dalam sebuah match. Contoh berikut digunakan untuk mencocokkan tepat empat digit.

```js
const regex = /^\d{4}$/;
```

> **Penjelasan tambahan:** Pada contoh tersebut, `\d` berarti digit dan `{4}` berarti tepat empat kali. Karena ada `^` dan `$`, seluruh string harus terdiri dari tepat empat digit agar cocok.

- **`*`**: Mencocokkan 0 atau lebih kemunculan dari elemen sebelumnya.
- **`+`**: Mencocokkan 1 atau lebih kemunculan dari elemen sebelumnya.
- **`?`**: Mencocokkan 0 atau 1 kemunculan dari elemen sebelumnya.
- **`{n}`**: Mencocokkan tepat `n` kemunculan dari elemen sebelumnya.
- **`{n,}`**: Mencocokkan minimal `n` kemunculan dari elemen sebelumnya.
- **`{n,m}`**: Mencocokkan antara `n` sampai `m` kemunculan dari elemen sebelumnya.

> **Penjelasan tambahan:** Quantifier berlaku pada elemen tepat sebelum quantifier tersebut. Elemen itu bisa berupa satu karakter, character class, atau group.

## Capturing Groups dan Backreferences

- **Capturing Groups**: Capturing group memungkinkan kita mengambil atau **menyimpan bagian tertentu dari string yang berhasil dicocokkan** agar bagian tersebut bisa digunakan lagi. Capturing group ditulis dengan tanda kurung biasa yang berisi pattern, tanpa awalan khusus seperti yang digunakan pada lookahead.

```js
const regex = /free(code)camp/i;
```

> **Penjelasan tambahan:** Pada Regex tersebut, seluruh pattern mencocokkan `freecodecamp`, sedangkan group pertama `(code)` menyimpan bagian `code` sebagai hasil capture.

- **Non-Capturing Groups**: Non-capturing group mirip dengan capturing group, tetapi bagian yang cocok tidak disimpan untuk digunakan kembali sebagai capture. Non-capturing group ditulis dengan `(?:...)`.

```js
const regex = /free(?:code)camp/i;
```

> **Penjelasan tambahan:** Non-capturing group tetap berguna untuk mengelompokkan pattern, misalnya ketika memakai operator `|` atau quantifier, tetapi tidak membuat nomor capture baru.

- **Backreferences**: Backreference pada Regular Expression adalah cara untuk menggunakan kembali bagian pattern yang sebelumnya sudah ditangkap oleh capturing group. Kita bisa merujuk capturing group berdasarkan nomor urutnya. Contohnya, `$1` merujuk ke capturing group pertama ketika digunakan pada replacement string.

```js
const regex = /free(co+de)camp/i;
console.log("freecoooooooodecamp".replace(regex, "paid$1world"));
```

> **Penjelasan tambahan:** Pada contoh `replace()`, `$1` bukan syntax Regex untuk mencari teks. `$1` digunakan di string pengganti untuk memasukkan kembali isi capturing group pertama.

- Kita juga bisa menggunakan backreference **di dalam Regex itu sendiri** untuk mencocokkan teks yang sama dengan hasil capturing group sebelumnya. Caranya menggunakan backslash lalu nomor capturing group.

```js
const regex = /(hello) \1/i;
console.log(regex.test("hello hello")); // true
console.log(regex.test("hello world")); // false
```

> **Penjelasan tambahan:** `\1` berarti "cocokkan lagi teks yang sama persis dengan isi capturing group pertama". Jadi setelah `(hello)` menangkap `hello`, `\1` mengharuskan `hello` muncul lagi pada posisi berikutnya.
