# Build a Real-Time Character Counter

Lab ini membuat penghitung karakter secara real-time pada sebuah `textarea`.

Setiap kali user mengetik, jumlah karakter akan langsung diperbarui sampai batas maksimal:

```text
50 karakter
```

Kalau jumlah karakter mencapai 50, counter berubah menjadi merah. Jika user mengetik lebih dari 50 karakter, kelebihan teks akan otomatis dipotong menggunakan `slice()`.

## JavaScript

```js
const textInput =
  document.querySelector("#text-input");

const charCount =
  document.querySelector("#char-count");

textInput.addEventListener("input", () => {
  let currentText = textInput.value;

  if (currentText.length > 50) {
    textInput.value =
      currentText.slice(0, 50);
  }

  const currentCount =
    textInput.value.length;

  charCount.textContent =
    `Character Count: ${currentCount}/50`;

  if (currentCount === 50) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "";
  }
});
```

## Cara Kerja

Event yang dipakai adalah:

```js
"input"
```

karena counter harus berubah setiap kali isi `textarea` berubah.

Jumlah karakter dihitung dengan:

```js
textInput.value.length
```

Kalau panjang teks lebih dari 50:

```js
textInput.value =
  textInput.value.slice(0, 50);
```

`slice(0, 50)` mengambil hanya 50 karakter pertama dan membuang sisanya.

Setelah itu jumlah karakter ditampilkan lewat:

```js
charCount.textContent =
  `Character Count: ${currentCount}/50`;
```

## Yang Saya Pelajari

- Event `input` untuk perubahan teks secara real-time.
- `.value` untuk membaca isi `textarea`.
- `.length` untuk menghitung jumlah karakter.
- `slice()` untuk membatasi panjang string.
- `textContent` untuk memperbarui tampilan.
- `style.color` untuk mengubah warna lewat JavaScript.
- Pentingnya menghitung ulang panjang teks setelah proses trimming.

## Catatan

Bagian penting dari lab ini adalah memahami bahwa:

```js
currentCount++
```

tidak diperlukan.

Jumlah karakter cukup dibaca langsung dari:

```js
textInput.value.length
```

Karena saat user mengetik atau menghapus karakter, `.length` selalu mengikuti isi terbaru.

Alur program:

```text
user mengetik
↓
input event
↓
baca value
↓
kalau > 50 → slice(0, 50)
↓
hitung length
↓
update counter
↓
kalau 50 → warna merah
```

**Platform:** freeCodeCamp  
**Lab:** Build a Real-Time Character Counter  
**Language:** HTML, CSS, JavaScript
