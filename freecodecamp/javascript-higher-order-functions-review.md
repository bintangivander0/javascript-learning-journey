# JavaScript Higher Order Functions Review

Catatan ini membahas beberapa konsep penting JavaScript tentang **callback function**, **higher order function**, array method seperti `forEach()`, `map()`, `filter()`, `reduce()`, serta method chaining, `sort()`, `every()`, dan `some()`.

---

## Callback Function dan `forEach()`

### Callback Function

Callback adalah function yang dikirim sebagai argument ke function lain untuk dijalankan di dalam function tersebut.

Contoh sederhana:

```js
function jalankanOperasi(callback) {
  callback();
}

function sapa() {
  console.log("Halo!");
}

jalankanOperasi(sapa);
```

Di sini, `sapa` dikirim sebagai callback ke `jalankanOperasi()`.

### `forEach()`

`forEach()` digunakan untuk membaca setiap elemen dalam array dan menjalankan suatu pekerjaan pada setiap elemen.

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number) => {
  console.log(number * 2);
});
```

Hasil:

```text
2
4
6
8
10
```

Callback pada `forEach()` bisa menerima sampai tiga parameter:

```js
array.forEach((element, index, array) => {
  // ...
});
```

- `element` = elemen yang sedang diproses
- `index` = posisi elemen
- `array` = array asli yang sedang dibaca

`forEach()` cocok saat kita ingin **melakukan sesuatu pada setiap elemen**, bukan membuat array baru.

---

## Higher Order Functions

Higher order function adalah function yang:

- menerima function lain sebagai argument, atau
- mengembalikan function sebagai hasil.

Contoh:

```js
function operateOnArray(arr, operation) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(operation(arr[i]));
  }

  return result;
}

function double(x) {
  return x * 2;
}

const numbers = [1, 2, 3, 4, 5];

const doubledNumbers =
  operateOnArray(numbers, double);

console.log(doubledNumbers);
// [2, 4, 6, 8, 10]
```

Pada contoh ini, `double` dikirim sebagai argument ke `operateOnArray()`.

Karena `operateOnArray()` menerima function lain, function tersebut termasuk higher order function.

---

## `map()`

`map()` digunakan untuk membuat **array baru** dengan mengubah setiap elemen dari array lama.

```js
const numbers = [1, 2, 3, 4, 5];

const doubled =
  numbers.map((num) => num * 2);

console.log(numbers);
// [1, 2, 3, 4, 5]

console.log(doubled);
// [2, 4, 6, 8, 10]
```

Mental model:

```text
array lama
↓
ubah setiap elemen
↓
array baru
```

Callback `map()` juga bisa menerima:

```js
(element, index, array)
```

Yang penting: `map()` menghasilkan **array baru**.

---

## `filter()`

`filter()` digunakan untuk membuat array baru yang hanya berisi elemen yang memenuhi kondisi.

```js
const numbers =
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers =
  numbers.filter((num) => num % 2 === 0);

console.log(evenNumbers);
// [2, 4, 6, 8, 10]
```

Cara bacanya:

```text
cek setiap elemen
↓
kalau kondisi true → simpan
kalau kondisi false → buang
```

---

## `reduce()`

`reduce()` digunakan untuk mengolah seluruh array menjadi **satu nilai akhir**.

Nilai akhirnya bisa berupa number, string, object, array, atau bentuk data lainnya.

```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(
  (accumulator, currentValue) =>
    accumulator + currentValue,
  0
);

console.log(sum);
// 15
```

Dua parameter utamanya:

```text
accumulator
→ hasil sementara yang terus dibawa

currentValue
→ elemen yang sedang diproses
```

Nilai `0` adalah nilai awal accumulator.

Alurnya:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15
```

---

## Ringkasan `forEach()`, `map()`, `filter()`, `reduce()`

```text
forEach()
→ lakukan sesuatu pada setiap elemen

map()
→ ubah setiap elemen menjadi bentuk baru

filter()
→ pilih elemen yang memenuhi kondisi

reduce()
→ gabungkan seluruh elemen menjadi satu hasil
```

---

## Method Chaining

Method chaining adalah teknik memanggil beberapa method secara berurutan pada nilai yang sama.

```js
const result = "  Hello, World!  "
  .trim()
  .toLowerCase()
  .replace("world", "JavaScript");

console.log(result);
// "hello, JavaScript!"
```

Alurnya:

```text
"  Hello, World!  "
↓ trim()
"Hello, World!"
↓ toLowerCase()
"hello, world!"
↓ replace()
"hello, JavaScript!"
```

---

## `sort()`

`sort()` digunakan untuk mengurutkan elemen array.

```js
const fruits =
  ["Banana", "Orange", "Apple", "Mango"];

fruits.sort();

console.log(fruits);
// ["Apple", "Banana", "Mango", "Orange"]
```

Perlu diingat:

> `sort()` mengubah array asli.

### Mengurutkan Number

Untuk number, gunakan compare function:

```js
const numbers = [414, 200, 5, 10, 3];

numbers.sort((a, b) => a - b);

console.log(numbers);
// [3, 5, 10, 200, 414]
```

Tanpa compare function, `sort()` membandingkan nilai seperti string.

Aturan compare function:

```text
hasil negatif
→ a sebelum b

hasil positif
→ a setelah b

hasil 0
→ dianggap sama
```

Urutan kecil ke besar:

```js
(a, b) => a - b
```

Urutan besar ke kecil:

```js
(a, b) => b - a
```

---

## `every()`

`every()` mengecek apakah **semua elemen** memenuhi kondisi.

```js
const numbers = [2, 4, 6, 8, 10];

const hasAllEvenNumbers =
  numbers.every((num) => num % 2 === 0);

console.log(hasAllEvenNumbers);
// true
```

Mental model:

```text
semua memenuhi?
→ true

ada satu yang gagal?
→ false
```

---

## `some()`

`some()` mengecek apakah **minimal satu elemen** memenuhi kondisi.

```js
const numbers = [1, 3, 5, 7, 8, 9];

const hasSomeEvenNumbers =
  numbers.some((num) => num % 2 === 0);

console.log(hasSomeEvenNumbers);
// true
```

Mental model:

```text
ada minimal satu yang cocok?
→ true

tidak ada yang cocok?
→ false
```

---

## Perbedaan `every()` dan `some()`

```text
every()
→ SEMUA harus true

some()
→ cukup SATU yang true
```

Contoh:

```js
const numbers = [2, 4, 6, 7];

numbers.every((num) => num % 2 === 0);
// false

numbers.some((num) => num % 2 === 0);
// true
```

---

## Ringkasan

- Callback adalah function yang dikirim ke function lain.
- Higher order function dapat menerima atau mengembalikan function.
- `forEach()` menjalankan pekerjaan pada setiap elemen.
- `map()` membuat array baru dengan mengubah setiap elemen.
- `filter()` mengambil elemen yang memenuhi kondisi.
- `reduce()` menggabungkan array menjadi satu hasil.
- Method chaining menghubungkan beberapa method secara berurutan.
- `sort()` mengurutkan array dan mengubah array asli.
- Compare function diperlukan agar number diurutkan dengan benar.
- `every()` mengecek apakah semua elemen memenuhi kondisi.
- `some()` mengecek apakah minimal satu elemen memenuhi kondisi.

Mental model singkat:

```text
forEach → lakukan
map     → ubah
filter  → saring
reduce  → gabungkan
sort    → urutkan
every   → semua?
some    → ada satu?
```
