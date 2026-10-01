# Build a Music Instrument Filter

Workshop ini membuat halaman daftar alat musik yang bisa difilter berdasarkan kategori.

Kategori yang tersedia:

```text
All
Woodwinds
Brass
Percussion
```

Saat user memilih kategori dari dropdown, daftar alat musik akan berubah sesuai pilihan tersebut.

## Struktur Data

Data alat musik disimpan dalam array berisi object:

```js
const instrumentsArr = [
  {
    category: "woodwinds",
    instrument: "Flute",
    price: 500
  },
  // ...
];
```

Setiap object memiliki:

- `category` → kategori alat musik
- `instrument` → nama alat musik
- `price` → harga

## `instrumentCards()`

Function ini menerima kategori yang dipilih:

```js
function instrumentCards(instrumentCategory) {
  // ...
}
```

Kalau kategori yang dipilih adalah:

```js
"all"
```

maka semua data digunakan.

Kalau bukan `"all"`, data disaring menggunakan `filter()`:

```js
instrumentsArr.filter(
  ({ category }) => category === instrumentCategory
);
```

Bagian:

```js
({ category })
```

menggunakan destructuring untuk langsung mengambil property `category` dari setiap object.

## Mengubah Data Menjadi HTML

Setelah data selesai difilter, `map()` digunakan untuk mengubah setiap object menjadi string HTML:

```js
.map(({ instrument, price }) => {
  return `
    <div class="card">
      <h2>${instrument}</h2>
      <p>$${price}</p>
    </div>
  `;
});
```

Di sini destructuring juga dipakai untuk mengambil:

```js
instrument
price
```

Hasil `map()` masih berupa array string HTML.

## Event `change`

Dropdown dipantau menggunakan event:

```js
selectContainer.addEventListener("change", () => {
  // ...
});
```

Event `change` berjalan saat user memilih option yang berbeda.

Nilai kategori yang dipilih diambil dari:

```js
selectContainer.value
```

Lalu function dipanggil:

```js
instrumentCards(selectContainer.value)
```

## Menampilkan Hasil

Karena `map()` menghasilkan array string, hasilnya digabung menggunakan:

```js
.join("")
```

Kemudian dimasukkan ke halaman dengan:

```js
productsContainer.innerHTML =
  instrumentCards(selectContainer.value).join("");
```

Alur programnya:

```text
user pilih kategori
↓
change event
↓
ambil value dari select
↓
filter data
↓
map data menjadi card HTML
↓
join()
↓
ubah innerHTML
```

## Yang Saya Pelajari

- `filter()` untuk menyaring data berdasarkan kategori.
- `map()` untuk mengubah object menjadi HTML.
- Destructuring object seperti:

```js
({ category })
```

dan:

```js
({ instrument, price })
```

- Ternary operator untuk menentukan apakah menampilkan semua data atau hasil filter.
- Event `change` pada dropdown.
- `select.value` untuk membaca pilihan user.
- `join("")` untuk menggabungkan array string.
- `innerHTML` untuk merender hasil ke halaman.
- Menghubungkan data JavaScript dengan tampilan DOM.

## Catatan

Bagian penting dari workshop ini adalah memahami alur:

```text
data
→ filter
→ map
→ join
→ render
```

Function yang sama bisa menampilkan semua alat musik atau hanya kategori tertentu berdasarkan value dari dropdown.

**Platform:** freeCodeCamp  
**Workshop:** Build a Music Instrument Filter  
**Language:** HTML, JavaScript
