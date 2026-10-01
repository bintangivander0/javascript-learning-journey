# Building a Storytelling App

Workshop ini membuat aplikasi sederhana yang menampilkan cerita berbeda berdasarkan tombol genre yang dipilih.

Terdapat tiga pilihan cerita:

```text
Scary Story
Funny Story
Adventure Story
```

Saat salah satu tombol diklik, isi cerita akan muncul dan warna border pada container ikut berubah sesuai genre.

## Struktur Project

```text
index.html
styles.css
script.js
```

- `index.html` → membuat struktur halaman dan tombol.
- `styles.css` → mengatur tampilan aplikasi.
- `script.js` → mengatur data cerita dan interaksi tombol.

## Data Cerita

Semua cerita disimpan di dalam satu object:

```js
const storyObj = {
  scary: {
    story: "...",
    borderColor: "#ee4b2b"
  },
  funny: {
    story: "...",
    borderColor: "#f1be32"
  },
  adventure: {
    story: "...",
    borderColor: "#acd157"
  }
};
```

Setiap genre memiliki:

```text
story
→ isi cerita

borderColor
→ warna border ketika cerita ditampilkan
```

Jadi data cerita dan tampilan yang berhubungan dengan genre disimpan dalam satu tempat.

## `displayStory()`

Function ini menerima nama genre:

```js
function displayStory(genre) {
  // ...
}
```

Sebelum mengambil datanya, program mengecek apakah genre tersebut benar-benar tersedia:

```js
storyObj.hasOwnProperty(genre)
```

Kalau genre ditemukan, program mengambil data dengan bracket notation:

```js
storyObj[genre].story
storyObj[genre].borderColor
```

Lalu:

```js
resultParagraph.textContent =
  storyObj[genre].story;
```

digunakan untuk menampilkan cerita.

Sedangkan:

```js
storyContainer.style.borderColor =
  storyObj[genre].borderColor;
```

mengubah warna border secara langsung melalui JavaScript.

## Event Listener

Setiap tombol menjalankan `displayStory()` dengan genre yang berbeda.

```js
scaryStoryBtn.addEventListener(
  "click",
  () => displayStory("scary")
);
```

Begitu juga untuk:

```js
"funny"
```

dan:

```js
"adventure"
```

Alur programnya:

```text
user klik tombol
↓
event listener berjalan
↓
displayStory(genre)
↓
cek genre tersedia
↓
ambil cerita + warna
↓
ubah textContent
↓
ubah borderColor
```

## CSS

Bagian CSS membuat tombol responsive.

Pada layar kecil:

```css
flex-direction: column;
```

Tombol tersusun ke bawah.

Pada layar dengan lebar minimal `760px`:

```css
@media (min-width: 760px) {
  .btn-container {
    flex-direction: row;
  }
}
```

Tombol berubah menjadi satu baris.

## Yang Saya Pelajari

- Mengambil elemen HTML dengan `querySelector()` dan `getElementById()`.
- Menyimpan data dalam object bertingkat.
- Mengakses object secara dinamis dengan:

```js
storyObj[genre]
```

- `hasOwnProperty()` untuk mengecek apakah object memiliki property tertentu.
- `addEventListener()` untuk menangani klik.
- Arrow function untuk callback event.
- `textContent` untuk mengubah isi teks.
- Mengubah CSS langsung dari JavaScript dengan:

```js
element.style.property
```

- Media query untuk membuat layout responsive.

## Catatan

Bagian yang cukup penting dari workshop ini adalah:

```js
storyObj[genre]
```

Karena nilai `genre` berasal dari parameter function.

Misalnya:

```js
displayStory("funny");
```

maka:

```js
storyObj[genre]
```

dibaca seperti:

```js
storyObj["funny"]
```

Sehingga function yang sama bisa digunakan untuk beberapa jenis cerita tanpa membuat function terpisah.

**Platform:** freeCodeCamp  
**Workshop:** Building a Storytelling App  
**Language:** HTML, CSS, JavaScript
