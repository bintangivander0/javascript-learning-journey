# Build a Bookmark Manager App

README project Bookmark Manager berbasis JavaScript dengan localStorage,
DOM, JSON, Array Methods, dan Event Handling.

## Tentang Project

Project ini merupakan lab freeCodeCamp setelah workshop **Build a Todo
App Using Local Storage**. HTML dan CSS sudah disediakan, sehingga fokus
utama berada pada JavaScript.

## Struktur Data

Key localStorage: `bookmarks`. Setiap bookmark memiliki `name`,
`category`, dan `url`.

``` javascript
[
  {
    name: "freeCodeCamp",
    category: "news",
    url: "https://www.freecodecamp.org/"
  }
]
```

## Function Utama

### `getBookmarks()`

Mengambil data dari localStorage, melakukan JSON.parse(), memvalidasi
array bookmark, lalu mengembalikan array valid atau `[]`.

### `displayOrCloseForm()`

Menukar class `hidden` pada `#main-section` dan `#form-section`.

### `displayOrHideCategory()`

Menukar class `hidden` pada `#main-section` dan
`#bookmark-list-section`.

### `displayBookmarks()`

Memfilter bookmark berdasarkan kategori, membersihkan `#category-list`,
lalu merender radio button, label, dan anchor.

## Alur Add Bookmark

``` text
klik Add Bookmark
↓
ambil kategori
↓
tampilkan form
↓
isi Name + URL
↓
buat object bookmark
↓
push() ke array
↓
JSON.stringify()
↓
localStorage.setItem()
↓
kosongkan input
↓
kembali ke halaman utama
```

## Alur View Category

``` text
klik View Category
↓
ambil kategori
↓
getBookmarks()
↓
filter()
↓
bersihkan categoryList
↓
jika kosong → No Bookmarks Found
↓
jika ada → radio + label + anchor
↓
tampilkan bookmark-list-section
```

## Alur Delete Bookmark

``` text
pilih radio button
↓
ambil :checked
↓
ambil value bookmark
↓
ambil category
↓
getBookmarks()
↓
findIndex()
↓
splice()
↓
localStorage.setItem()
↓
displayBookmarks()
```

## Konsep JavaScript yang Dipelajari

-   `localStorage.getItem()` untuk membaca data.
-   `localStorage.setItem()` untuk menyimpan data.
-   `JSON.parse()` dan `JSON.stringify()` untuk pertukaran data JSON.
-   `Array.isArray()` dan `.every()` untuk validasi data.
-   `.filter()` untuk memilih bookmark berdasarkan kategori.
-   `.forEach()` untuk memproses setiap bookmark.
-   `.findIndex()` untuk menemukan posisi bookmark.
-   `.splice()` untuk menghapus item dari array.
-   `querySelector()` dan `:checked` untuk mengambil radio button
    terpilih.
-   `innerHTML` untuk merender HTML secara dinamis.
-   `classList.toggle()` untuk mengatur tampilan section.
-   `value` untuk membaca nilai input dan option.
-   Template literal untuk membuat HTML secara dinamis.

## Catatan Pembelajaran

Hal penting dari project ini adalah memahami perbedaan antara **data**
dan **tampilan**.

``` text
localStorage
↓
menyimpan data

DOM
↓
menampilkan data
```

Ketika data berubah, tampilan juga harus diperbarui.

``` text
ubah data
↓
simpan ke localStorage
↓
ambil data terbaru
↓
render ulang DOM
```

Project ini menjadi latihan lanjutan dari `localStorage`, `JSON`, Array
Methods, DOM, dan Event Handling yang dipelajari pada workshop **Build a
Todo App Using Local Storage**.
