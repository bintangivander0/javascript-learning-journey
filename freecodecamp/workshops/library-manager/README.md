# Build a Library Manager

Workshop ini membuat program sederhana untuk mengelola data buku di sebuah library.

Data buku disimpan dalam array berisi object. Setiap buku memiliki informasi seperti:

```js
{
  title: "Atomic Habits",
  author: "James Clear",
  about: "A practical book about...",
  pages: 320
}
```

Program kemudian mengolah data tersebut untuk menampilkan informasi buku, mengambil ringkasan, mencari buku berdasarkan penulis, dan menghitung total halaman seluruh buku.

## Function yang Digunakan

### `getBookInformation()`

Mengambil `title` dan `author` dari setiap buku menggunakan `map()`.

```js
catalog.map(
  (book) => `${book.title} by ${book.author}`
);
```

Hasil dari `map()` kemudian digabungkan menggunakan:

```js
.join("\n")
```

supaya setiap buku tampil pada baris yang berbeda.

---

### `getBookSummaries()`

Mengambil isi property `about` dari setiap buku.

```js
catalog
  .map((book) => book.about)
  .join("\n");
```

Di sini `map()` digunakan untuk mengubah array object buku menjadi array berisi ringkasan buku.

---

### `getBooksByAuthor()`

Mencari buku berdasarkan nama penulis menggunakan `filter()`.

```js
catalog.filter(
  (book) => book.author === author
);
```

Contoh:

```js
getBooksByAuthor(library, "Arvid Kahl");
```

Function akan mengembalikan semua buku yang ditulis oleh Arvid Kahl.

---

### `getTotalPages()`

Menghitung jumlah seluruh halaman buku.

Pertama, `map()` mengambil property `pages`:

```js
catalog.map((book) => book.pages);
```

Hasilnya kurang lebih:

```js
[320, 320, 304, 308, 256, 168, 336, 500]
```

Kemudian `reduce()` menjumlahkan semua angka tersebut:

```js
.reduce((sum, pages) => sum + pages, 0);
```

---

## Yang Saya Pelajari

- Mengolah array berisi object.
- `map()` untuk mengubah setiap data menjadi bentuk baru.
- `filter()` untuk mengambil data yang memenuhi kondisi.
- `reduce()` untuk menggabungkan banyak nilai menjadi satu hasil.
- `join()` untuk menggabungkan array string menjadi satu teks.
- Mengakses property object seperti `book.title`, `book.author`, dan `book.pages`.
- Menggunakan parameter agar satu function dapat digunakan untuk data yang berbeda.
- Method chaining seperti:

```js
catalog
  .map((book) => book.pages)
  .reduce((sum, pages) => sum + pages, 0);
```

## Catatan

Hal yang paling terasa dari workshop ini adalah memahami bahwa array method dipilih berdasarkan hasil yang dibutuhkan:

```text
map()    → mengubah data
filter() → menyaring data
reduce() → menghasilkan satu nilai
join()   → menggabungkan teks
```

**Platform:** freeCodeCamp  
**Workshop:** Build a Library Manager  
**Language:** JavaScript
