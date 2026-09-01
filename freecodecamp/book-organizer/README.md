# Build a Book Organizer

Lab ini membuat program sederhana untuk mengatur daftar buku berdasarkan tahun rilis.

Data buku disimpan dalam array berisi object:

```js
const books = [
  {
    title: "Atomic Habits",
    authorName: "Charlie Kirk",
    releaseYear: 2000
  },
  {
    title: "Everyting is Alright",
    authorName: "James Bond",
    releaseYear: 2005
  },
  {
    title: "Nuclear War",
    authorName: "Bintang",
    releaseYear: 2026
  }
];
```

Program kemudian melakukan dua proses utama:

```text
filter buku
↓
sort berdasarkan tahun
```

## `filter()`

Buku disaring berdasarkan `releaseYear`.

```js
const filteredBooks =
  books.filter((book) => book.releaseYear <= 2020);
```

Artinya hanya buku yang terbit pada tahun `2020` atau sebelumnya yang akan masuk ke `filteredBooks`.

Dari data di atas, buku tahun `2026` tidak ikut masuk karena tidak memenuhi kondisi.

---

## `sortByYear()`

Function ini digunakan sebagai compare function untuk menentukan urutan buku berdasarkan tahun rilis.

```js
function sortByYear(book1, book2) {
  if (book1.releaseYear < book2.releaseYear) {
    return -1;
  } else if (book1.releaseYear > book2.releaseYear) {
    return 1;
  } else {
    return 0;
  }
}
```

Aturannya:

```text
return -1
→ book1 ditempatkan sebelum book2

return 1
→ book1 ditempatkan setelah book2

return 0
→ urutannya tidak perlu diubah
```

Kemudian function tersebut digunakan pada:

```js
filteredBooks.sort(sortByYear);
```

Hasilnya adalah buku yang sudah lolos filter akan diurutkan dari tahun paling lama ke tahun paling baru.

---

## Yang Saya Pelajari

- Mengolah array berisi object.
- Mengakses property object seperti:

```js
book.releaseYear
```

- `filter()` untuk mengambil data yang memenuhi kondisi tertentu.
- `sort()` untuk mengurutkan data.
- Membuat compare function sendiri untuk `sort()`.
- Memahami arti nilai `-1`, `1`, dan `0` pada compare function.
- Mengurutkan object berdasarkan salah satu property di dalamnya.

## Catatan

Alur utama pada lab ini:

```text
books
↓
filter()
↓
filteredBooks
↓
sort()
↓
buku terurut berdasarkan releaseYear
```

Hal yang paling penting dari lab ini adalah memahami bahwa:

```text
filter() → memilih data
sort()   → mengurutkan data
```

**Platform:** freeCodeCamp  
**Lab:** Build a Book Organizer  
**Language:** JavaScript
