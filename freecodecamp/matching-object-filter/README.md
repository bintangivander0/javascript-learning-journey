# Mathing Object Filter Function

Lab ini membuat function untuk mencari object yang memiliki semua property dan value yang sama dengan object `source`.

Contoh:

```js
whatIsInAName(
  [
    { first: "Romeo", last: "Montague" },
    { first: "Mercutio", last: null },
    { first: "Tybalt", last: "Capulet" }
  ],
  {
    last: "Capulet"
  }
);
```

Hasil:

```js
[
  { first: "Tybalt", last: "Capulet" }
]
```

Karena hanya object tersebut yang memiliki:

```js
last: "Capulet"
```

## Function

```js
function whatIsInAName(arr, source) {
  return arr.filter((item) => {
    return Object.keys(source).every(
      (key) => item[key] === source[key]
    );
  });
}
```

## Cara Kerja

Function menerima dua parameter:

```js
arr
```

Array yang berisi beberapa object.

Dan:

```js
source
```

Object yang digunakan sebagai syarat pencarian.

Contoh:

```js
source = {
  last: "Capulet"
};
```

Artinya kita ingin mencari object di dalam `arr` yang memiliki:

```js
last: "Capulet"
```

---

## `Object.keys()`

Bagian ini baru untuk saya:

```js
Object.keys(source)
```

`Object.keys()` digunakan untuk mengambil **semua nama property/key dari sebuah object**, lalu mengembalikannya dalam bentuk array.

Contoh:

```js
const person = {
  first: "Tybalt",
  last: "Capulet",
  age: 25
};

console.log(Object.keys(person));
```

Hasil:

```js
["first", "last", "age"]
```

Jadi:

```js
Object.keys()
```

tidak mengambil value.

Yang diambil hanya nama property-nya.

Contoh:

```js
const source = {
  last: "Capulet"
};
```

Maka:

```js
Object.keys(source);
```

menghasilkan:

```js
["last"]
```

Kalau `source` berisi:

```js
const source = {
  first: "Tybalt",
  last: "Capulet"
};
```

maka:

```js
Object.keys(source);
```

menghasilkan:

```js
["first", "last"]
```

Mental model sederhananya:

```text
OBJECT

{
  first: "Tybalt",
  last: "Capulet"
}

↓

Object.keys()

↓

["first", "last"]
```

---

## Kenapa `Object.keys()` Dibutuhkan?

Karena kita tidak tahu sebelumnya property apa saja yang akan diberikan melalui `source`.

Kadang:

```js
source = {
  last: "Capulet"
};
```

Tetapi bisa juga:

```js
source = {
  first: "Tybalt",
  last: "Capulet"
};
```

Jadi kita tidak bisa selalu menulis:

```js
item.last === source.last
```

karena mungkin `source` memiliki property lain.

Dengan:

```js
Object.keys(source)
```

program bisa membaca sendiri property apa saja yang harus diperiksa.

---

## Mengakses Object dengan `item[key]`

Setelah mendapatkan:

```js
["first", "last"]
```

kita perlu mengambil value dari setiap property tersebut.

Di sinilah digunakan:

```js
item[key]
```

Misalnya:

```js
const item = {
  first: "Tybalt",
  last: "Capulet"
};

const key = "last";
```

Maka:

```js
item[key]
```

sama dengan:

```js
item["last"]
```

hasilnya:

```js
"Capulet"
```

Ini berbeda dengan:

```js
item.key
```

Karena `item.key` akan mencari property yang benar-benar bernama `"key"`.

Sedangkan:

```js
item[key]
```

menggunakan isi variable `key` sebagai nama property.

---

## `every()`

Setelah `Object.keys()` menghasilkan array key, digunakan:

```js
.every()
```

Contoh:

```js
Object.keys(source).every(...)
```

`every()` akan menghasilkan `true` hanya jika **semua elemen memenuhi kondisi**.

Contohnya:

```js
[2, 4, 6].every((num) => num % 2 === 0);
```

hasil:

```js
true
```

Karena semuanya genap.

Sedangkan:

```js
[2, 3, 6].every((num) => num % 2 === 0);
```

hasil:

```js
false
```

karena angka `3` tidak memenuhi kondisi.

---

## Bagian Utama Pengecekan

Kode:

```js
Object.keys(source).every(
  (key) => item[key] === source[key]
);
```

bisa dibaca seperti:

> Ambil semua key dari `source`, lalu pastikan setiap key tersebut memiliki value yang sama pada `item`.

Misalnya:

```js
source = {
  first: "Tybalt",
  last: "Capulet"
};
```

Maka `Object.keys(source)` menjadi:

```js
["first", "last"]
```

Kemudian diperiksa:

```text
item["first"] === source["first"]

DAN

item["last"] === source["last"]
```

Kalau semuanya `true`, maka:

```js
every()
```

menghasilkan:

```js
true
```

dan object tersebut lolos `filter()`.

---

## Hubungan `filter()` dan `every()`

Bagian luar menggunakan:

```js
arr.filter(...)
```

`filter()` memeriksa setiap object dalam array.

Untuk setiap object, `every()` mengecek apakah semua property dari `source` cocok.

Alurnya:

```text
arr.filter()
↓
ambil satu object

Object.keys(source)
↓
ambil semua property yang harus dicek

every()
↓
apakah semuanya cocok?

YES
→ object masuk hasil

NO
→ object dibuang
```

---

## Contoh Lebih Lengkap

Misalnya:

```js
const source = {
  first: "Tybalt",
  last: "Capulet"
};
```

Dan object yang sedang diperiksa:

```js
const item = {
  first: "Tybalt",
  last: "Capulet",
  age: 25
};
```

Program mengecek:

```js
item["first"] === source["first"];
```

yaitu:

```js
"Tybalt" === "Tybalt";
```

hasil:

```js
true
```

Lalu:

```js
item["last"] === source["last"];
```

yaitu:

```js
"Capulet" === "Capulet";
```

hasil:

```js
true
```

Karena semuanya `true`, `every()` menghasilkan:

```js
true
```

dan object tersebut masuk ke array hasil.

Property tambahan seperti:

```js
age: 25
```

tidak masalah karena function hanya memeriksa property yang ada pada `source`.

---

## Yang Saya Pelajari

- `filter()` untuk menyaring object di dalam array.
- `Object.keys()` untuk mengambil semua nama property dari sebuah object.
- `every()` untuk memastikan semua kondisi menghasilkan `true`.
- Bracket notation:

```js
item[key]
```

untuk mengambil property object berdasarkan nilai dari sebuah variable.
- Membandingkan property dan value dari dua object.
- Menggabungkan beberapa method untuk membuat pencarian yang lebih fleksibel.

## Catatan

Bagian yang paling baru untuk saya di lab ini adalah:

```js
Object.keys(source)
```

Sebelumnya saya biasa mengakses object secara langsung seperti:

```js
book.title
```

atau:

```js
book.author
```

Tetapi dengan `Object.keys()`, saya bisa mengambil daftar property object secara otomatis.

Mental model yang saya pakai:

```text
Object.keys(source)
→ "property apa saja yang harus dicek?"

every()
→ "apakah semua property itu cocok?"

filter()
→ "kalau cocok, simpan object-nya"
```

**Platform:** freeCodeCamp  
**Language:** JavaScript
