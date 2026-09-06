# Build a Favorite Icon Toggler

Lab ini membuat tombol favorit berbentuk hati yang bisa berubah antara kondisi kosong dan terisi.

Saat tombol diklik:

```text
♡ → ❤
❤ → ♡
```

Selain mengganti simbol hati, tombol juga menambah atau menghapus class:

```js
filled
```

## JavaScript

```js
const favoriteButtons =
  document.querySelectorAll(".favorite-icon");

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("filled")) {
      button.classList.remove("filled");
      button.innerHTML = "&#9825;";
    } else {
      button.classList.add("filled");
      button.innerHTML = "&#10084;";
    }
  });
});
```

## Cara Kerja

Semua tombol hati diambil dengan:

```js
document.querySelectorAll(".favorite-icon");
```

Karena ada beberapa tombol, `forEach()` digunakan untuk memasang event listener ke masing-masing tombol.

```js
favoriteButtons.forEach((button) => {
  // ...
});
```

Saat tombol diklik, program mengecek apakah tombol sudah memiliki class:

```js
filled
```

Pengecekan dilakukan dengan:

```js
button.classList.contains("filled")
```

Kalau sudah `filled`:

```js
button.classList.remove("filled");
button.innerHTML = "&#9825;";
```

Hati kembali kosong.

Kalau belum:

```js
button.classList.add("filled");
button.innerHTML = "&#10084;";
```

Hati berubah menjadi penuh.

## Yang Saya Pelajari

- `querySelectorAll()` untuk mengambil beberapa elemen sekaligus.
- `forEach()` untuk memproses setiap tombol.
- `addEventListener()` untuk menangani click.
- `classList.contains()` untuk mengecek class.
- `classList.add()` dan `classList.remove()` untuk mengubah class.
- `innerHTML` untuk mengganti simbol hati.
- Menggunakan `if...else` untuk menangani dua keadaan berbeda.

## Catatan

Hal yang sempat bikin saya bingung adalah perbedaan antara CSS selector dan nama class di `classList`.

Saat mencari elemen:

```js
document.querySelectorAll(".favorite-icon");
```

class memakai titik `.`.

Tapi saat memakai `classList`:

```js
button.classList.contains("filled");
button.classList.add("filled");
button.classList.remove("filled");
```

nama class tidak memakai titik.

Alur sederhananya:

```text
ambil semua tombol
↓
pasang event click
↓
cek apakah sudah filled
↓
ya → hapus filled + hati kosong
tidak → tambah filled + hati penuh
```

**Platform:** freeCodeCamp  
**Lab:** Build a Favorite Icon Toggler  
**Language:** HTML, CSS, JavaScript
