# Range-Based LCM Calculator

Lab ini membuat function untuk mencari **KPK (Kelipatan Persekutuan Terkecil)** dari semua angka dalam suatu rentang.

Contoh:

```js
smallestCommons([1, 5]);
```

Berarti program menghitung KPK dari:

```text
1, 2, 3, 4, 5
```

## Cara Kerja

Pertama, program mencari angka terkecil dan terbesar:

```js
const smallestNum = Math.min(...arr);
const highestNum = Math.max(...arr);
```

Lalu membuat seluruh angka dalam rentang tersebut menggunakan:

```js
Array(length)
  .fill(0)
  .map((element, index) => smallestNum + index)
```

Setelah itu setiap angka digabungkan menggunakan `reduce()` untuk mencari KPK secara bertahap.

```js
.reduce((totalKPK, currentNum) =>
  kPK(totalKPK, currentNum)
);
```

## FPB dan KPK

Function `fPB` mencari **Faktor Persekutuan Terbesar** menggunakan algoritma Euclidean:

```js
const fPB = (a, b) =>
  b === 0 ? a : fPB(b, a % b);
```

Kemudian FPB digunakan untuk menghitung KPK:

```js
const kPK = (a, b) =>
  (a * b) / fPB(a, b);
```

## Yang Saya Pelajari

- `Math.min()` dan `Math.max()` dengan spread `...`.
- Membuat rentang angka menggunakan `Array()`, `fill()`, dan `map()`.
- `reduce()` untuk menghasilkan satu nilai akhir.
- Recursive function pada perhitungan FPB.
- Menggunakan FPB untuk menghitung KPK.
- Memproses seluruh angka di antara dua batas, bukan hanya dua angka input.

**Platform:** freeCodeCamp  
**Lab:** Range-Based LCM Calculator  
**Language:** JavaScript
