# Destroyer

Lab ini membuat function untuk menghapus semua nilai tertentu dari sebuah array.

Function menerima array sebagai argument pertama, lalu menerima beberapa nilai tambahan yang ingin dihapus.

Contoh:

```js
destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3);
```

Hasil:

```js
[1, 5, 1]
```

Karena semua nilai `2` dan `3` dihapus dari array.

## Function

```js
function destroyer(arr, ...numToDel) {
  return arr.filter(
    (item) => !numToDel.includes(item)
  );
}
```

## Cara Kerja

Bagian:

```js
...numToDel
```

menggunakan rest parameter untuk mengumpulkan semua argument setelah `arr` menjadi satu array.

Contoh:

```js
destroyer([1, 2, 3], 2, 3);
```

maka:

```js
numToDel
```

berisi:

```js
[2, 3]
```

Kemudian `filter()` memeriksa setiap item dalam `arr`.

```js
arr.filter(
  (item) => !numToDel.includes(item)
);
```

Artinya:

> simpan item jika item tersebut tidak ada di dalam `numToDel`.

## Yang Saya Pelajari

- Rest parameter `...` untuk menerima banyak argument.
- `filter()` untuk menyaring array.
- `includes()` untuk mengecek apakah suatu nilai ada di array.
- Operator NOT `!` untuk membalik hasil boolean.
- Menggabungkan beberapa konsep dalam satu expression sederhana.

## Catatan

Bagian pentingnya:

```js
!numToDel.includes(item)
```

Kalau `item` ditemukan di `numToDel`, hasil `includes()` adalah `true`.

Karena ada `!`, hasilnya menjadi `false`, sehingga item tersebut tidak masuk ke array hasil.

Alurnya:

```text
ambil item
↓
cek apakah ada di daftar yang mau dihapus
↓
kalau ada → buang
kalau tidak ada → simpan
```

**Platform:** freeCodeCamp  
**Language:** JavaScript
