# Implement a Sorted Index Finder

Lab ini membuat function untuk mencari posisi sebuah angka setelah angka tersebut dimasukkan ke dalam array dan array diurutkan dari nilai terkecil ke terbesar.

Function yang digunakan:

```js
function getIndexToIns(arr, num) {
  arr.push(num);
  arr.sort((a, b) => a - b);

  return arr.findIndex((element) => element === num);
}
```

## Cara Kerja

Pertama, nilai `num` dimasukkan ke dalam array menggunakan:

```js
arr.push(num);
```

Setelah itu array diurutkan dari angka terkecil ke terbesar:

```js
arr.sort((a, b) => a - b);
```

Kemudian `findIndex()` digunakan untuk mencari index pertama tempat `num` berada:

```js
arr.findIndex((element) => element === num);
```

Contoh:

```js
getIndexToIns([10, 20, 30, 40, 50], 35);
```

Setelah `35` dimasukkan dan array diurutkan:

```js
[10, 20, 30, 35, 40, 50]
```

Maka hasilnya:

```js
3
```

Karena `35` berada pada index `3`.

## Yang Saya Pelajari

- `.push()` untuk menambahkan elemen ke akhir array.
- `.sort()` untuk mengurutkan angka.
- Compare function:

```js
(a, b) => a - b
```

untuk mengurutkan angka dari kecil ke besar.
- `.findIndex()` untuk mencari index elemen pertama yang memenuhi kondisi.
- Menggabungkan beberapa array method untuk menyelesaikan satu proses.

## Catatan

`push()` dan `sort()` sama-sama mengubah array asli.

Alur function ini:

```text
masukkan angka
↓
urutkan array
↓
cari index angka
↓
return index
```

**Platform:** freeCodeCamp  
**Challenge:** Implement a Sorted Index Finder  
**Language:** JavaScript
