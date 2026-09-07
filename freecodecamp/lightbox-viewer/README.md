# Build a Lightbox Viewer

Project ini membuat galeri gambar sederhana dengan fitur **lightbox viewer**.

Thumbnail ditampilkan di halaman utama. Ketika salah satu gambar diklik, JavaScript mengambil URL gambar tersebut, mengubahnya menjadi versi full-size, lalu menampilkannya di dalam lightbox yang menutupi halaman.

Lightbox dapat ditutup dengan tombol `×` atau dengan mengklik area lightbox.

Project ini cukup menarik karena tidak hanya menggunakan JavaScript untuk event dan manipulasi DOM, tetapi juga membutuhkan pemahaman CSS seperti:

- `position: fixed`
- `position: absolute`
- `top`, `left`, dan `right`
- ukuran relatif `%`
- Flexbox
- Grid
- `object-fit`
- hubungan posisi antara parent dan child

---

## Struktur HTML

Gallery berisi tiga thumbnail:

```html
<div class="gallery">
  <img
    class="gallery-item"
    src="https://cdn.freecodecamp.org/curriculum/labs/stonehenge-thumbnail.jpg"
    alt="Stonehenge"
  >

  <img
    class="gallery-item"
    src="https://cdn.freecodecamp.org/curriculum/labs/storm-thumbnail.jpg"
    alt="Storm"
  >

  <img
    class="gallery-item"
    src="https://cdn.freecodecamp.org/curriculum/labs/trees-thumbnail.jpg"
    alt="Trees"
  >
</div>
```

Semua gambar menggunakan class yang sama:

```html
class="gallery-item"
```

Dengan begitu JavaScript dapat mengambil ketiganya sekaligus menggunakan:

```js
document.querySelectorAll(".gallery-item");
```

---

## Struktur Lightbox

Lightbox terdiri dari:

```html
<div class="lightbox">
  <button id="close-btn">&times;</button>
  <img id="lightbox-image" src="" alt="Preview">
</div>
```

Strukturnya bisa dibayangkan seperti:

```text
.lightbox
│
├── #close-btn
│
└── #lightbox-image
```

`.lightbox` merupakan container utama.

Di dalamnya terdapat:

- tombol untuk menutup lightbox
- gambar yang akan menampilkan versi full-size

`#lightbox-image` awalnya menggunakan:

```html
src=""
```

karena sumber gambarnya baru diberikan oleh JavaScript setelah user memilih thumbnail.

---

# JavaScript

## Mengambil Elemen dari DOM

```js
const galleryItems =
  document.querySelectorAll(".gallery-item");

const lightbox =
  document.querySelector(".lightbox");

const lightboxImage =
  document.querySelector("#lightbox-image");

const closeBtn =
  document.querySelector("#close-btn");
```

Ada perbedaan penting antara:

```js
querySelector()
```

dan:

```js
querySelectorAll()
```

`querySelector()` mengambil satu elemen:

```js
document.querySelector(".lightbox");
```

Sedangkan:

```js
document.querySelectorAll(".gallery-item");
```

mengambil semua elemen yang memiliki class `.gallery-item`.

Karena terdapat tiga thumbnail, hasilnya adalah sebuah `NodeList`.

Secara sederhana:

```text
galleryItems
↓
NodeList
├── Stonehenge
├── Storm
└── Trees
```

Karena berupa kumpulan elemen, kita bisa menggunakan:

```js
forEach()
```

untuk memproses setiap gambar.

---

# Memberikan Event ke Setiap Thumbnail

```js
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {

  });
});
```

`item` mewakili satu gambar pada setiap perulangan.

Misalnya:

```text
perulangan 1
item → Stonehenge

perulangan 2
item → Storm

perulangan 3
item → Trees
```

Dengan begitu kita tidak perlu membuat tiga event listener secara manual.

---

# Mengambil URL Gambar yang Diklik

Setiap elemen `<img>` memiliki property:

```js
.src
```

Contohnya:

```js
item.src
```

Jika user mengklik thumbnail Stonehenge, nilainya kira-kira:

```text
https://cdn.freecodecamp.org/curriculum/labs/stonehenge-thumbnail.jpg
```

Masalahnya, lightbox harus menggunakan versi full-size:

```text
https://cdn.freecodecamp.org/curriculum/labs/stonehenge.jpg
```

Perbedaannya hanya:

```text
-thumbnail
```

---

# Menggunakan `replace()`

Untuk menghilangkan bagian tersebut digunakan:

```js
replace()
```

```js
const fullSizeSrc =
  item.src.replace("-thumbnail", "");
```

Artinya:

```text
cari:
"-thumbnail"

ganti dengan:
""
```

Contohnya:

```text
stonehenge-thumbnail.jpg
```

berubah menjadi:

```text
stonehenge.jpg
```

Karena string kosong:

```js
""
```

berarti teks tersebut dihapus.

Mental model:

```text
thumbnail URL
↓
replace("-thumbnail", "")
↓
full-size URL
```

---

# Mengubah `src` Gambar Lightbox

Setelah URL full-size berhasil dibuat:

```js
const fullSizeSrc =
  item.src.replace("-thumbnail", "");
```

URL tersebut diberikan kepada:

```js
lightboxImage.src
```

dengan:

```js
lightboxImage.src = fullSizeSrc;
```

Jadi:

```text
item.src
↓
replace()
↓
fullSizeSrc
↓
lightboxImage.src
```

Contoh:

```text
stonehenge-thumbnail.jpg
↓
stonehenge.jpg
↓
<img id="lightbox-image">
```

---

# Menampilkan Lightbox

Secara default lightbox disembunyikan menggunakan CSS:

```css
display: none;
```

Setelah thumbnail diklik, JavaScript mengubahnya menjadi:

```js
lightbox.style.display = "flex";
```

Sehingga:

```text
display: none
↓
thumbnail diklik
↓
display: flex
↓
lightbox muncul
```

Selain membuat lightbox terlihat, `flex` juga digunakan supaya gambar dapat diposisikan di tengah.

---

# Menutup Lightbox

Ketika tombol `×` diklik:

```js
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
```

Lightbox kembali tersembunyi.

Logikanya:

```text
display: flex
↓
klik tombol X
↓
display: none
```

Lightbox juga dapat ditutup ketika area `.lightbox` diklik:

```js
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
```

---

# Event Bubbling

Ada hal menarik dari struktur HTML:

```text
.lightbox
│
├── #close-btn
└── #lightbox-image
```

Karena `#close-btn` berada di dalam `.lightbox`, click event pada tombol dapat melakukan **event bubbling** menuju parent `.lightbox`.

Artinya ketika tombol `×` diklik:

```text
#close-btn
↓
click
↓
event naik
↓
.lightbox
```

Pada project ini hal tersebut tidak menjadi masalah karena keduanya melakukan hal yang sama:

```js
lightbox.style.display = "none";
```

---

# Catatan Tentang Posisi Event Listener

Pada kode awal saya:

```js
galleryItems.forEach((item) => {

  item.addEventListener("click", () => {
    // ...
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

});
```

Event listener untuk:

```js
closeBtn
```

dan:

```js
lightbox
```

berada di dalam `forEach()`.

Karena terdapat tiga gambar, `forEach()` berjalan tiga kali.

Akibatnya listener berikut juga didaftarkan tiga kali:

```text
forEach gambar 1
→ pasang close listener

forEach gambar 2
→ pasang close listener lagi

forEach gambar 3
→ pasang close listener lagi
```

Program masih dapat terlihat bekerja karena hasil akhirnya tetap:

```js
display = "none";
```

Tetapi secara struktur lebih baik listener tersebut berada di luar `forEach()`:

```js
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const fullSizeSrc =
      item.src.replace("-thumbnail", "");

    lightboxImage.src = fullSizeSrc;

    lightbox.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
```

Karena hanya event thumbnail yang perlu dibuat untuk setiap gambar.

---

# CSS

Bagian CSS menjadi salah satu hal penting pada project ini karena JavaScript hanya menentukan:

```text
kapan lightbox muncul
```

sedangkan CSS menentukan:

```text
lightbox muncul di mana
sebesar apa
dan bagaimana isi di dalamnya ditempatkan
```

---

# `position: fixed`

```css
.lightbox {
  position: fixed;
}
```

`position: fixed` membuat elemen diposisikan relatif terhadap viewport browser.

Artinya lightbox tidak mengikuti alur normal halaman.

Secara sederhana:

```text
HALAMAN

thumbnail thumbnail thumbnail

          ↓

LIGHTBOX
menempel di viewport
dan berada di atas halaman
```

Ini cocok untuk modal atau popup karena kita ingin lightbox menutupi halaman utama.

---

# `top: 0` dan `left: 0`

```css
top: 0;
left: 0;
```

Setelah menggunakan:

```css
position: fixed;
```

kita menentukan titik awal posisi lightbox.

```text
top: 0
→ tidak ada jarak dari atas

left: 0
→ tidak ada jarak dari kiri
```

Jadi titik awalnya berada di:

```text
┌──────────────────────
│ ← top: 0, left: 0
│
│
│
```

atau pojok kiri atas viewport.

---

# Menutupi Seluruh Viewport

```css
width: 100%;
height: 100%;
```

Lightbox mengambil:

```text
100% lebar
+
100% tinggi
```

sehingga seluruh layar tertutup.

Kombinasinya:

```css
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
```

bisa dianggap sebagai pola dasar untuk membuat overlay satu layar penuh.

Mental model:

```text
fixed
↓
tempel ke viewport

top: 0 + left: 0
↓
mulai dari pojok kiri atas

100% x 100%
↓
tutup seluruh viewport
```

---

# Background Transparan

```css
background-color: rgba(210, 186, 186, 0.6);
```

Berbeda dengan:

```css
rgb()
```

`rgba()` memiliki nilai tambahan yaitu alpha/transparency.

```text
rgba(red, green, blue, alpha)
```

Pada:

```css
rgba(210, 186, 186, 0.6)
```

nilai:

```text
0.6
```

mengatur transparansi background.

Ini membuat user masih dapat sedikit melihat halaman gallery di belakang lightbox.

---

# Menyembunyikan Lightbox

Awalnya:

```css
display: none;
```

Artinya lightbox tidak ditampilkan.

JavaScript kemudian mengubahnya:

```js
lightbox.style.display = "flex";
```

Hubungan CSS dan JavaScript-nya:

```text
CSS
display: none
↓
halaman dimulai
↓
lightbox tersembunyi

user klik gambar
↓
JavaScript
display = "flex"
↓
lightbox muncul
```

Ini contoh bagaimana JavaScript dan CSS bekerja bersama.

JavaScript menentukan **kapan**, CSS menentukan **bagaimana tampilannya**.

---

# Flexbox di Dalam Lightbox

```css
justify-content: center;
align-items: center;
```

Saat JavaScript mengubah:

```css
display: flex;
```

`.lightbox` menjadi flex container.

Kemudian:

```css
justify-content: center;
```

menempatkan isi di tengah pada main axis.

Sedangkan:

```css
align-items: center;
```

menempatkan isi di tengah pada cross axis.

Dalam kasus default `flex-direction: row`:

```text
justify-content
→ horizontal

align-items
→ vertical
```

Sehingga gambar dapat berada di tengah viewport.

---

# Gallery Menggunakan CSS Grid

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
}
```

`display: grid` mengubah `.gallery` menjadi grid container.

Kemudian:

```css
grid-template-columns: repeat(3, 1fr);
```

artinya:

```text
buat 3 kolom
masing-masing mendapat 1 bagian ruang
```

Contohnya:

```text
┌────────┬────────┬────────┐
│   1fr  │   1fr  │   1fr  │
└────────┴────────┴────────┘
```

`fr` berarti **fraction** atau bagian dari ruang yang tersedia.

Karena semuanya:

```text
1fr + 1fr + 1fr
```

maka lebar gallery dibagi rata menjadi tiga.

---

# `gap`

```css
gap: 12px;
```

memberikan jarak antar item grid.

Tanpa `gap`:

```text
[gambar][gambar][gambar]
```

Dengan `gap`:

```text
[gambar]   [gambar]   [gambar]
```

---

# Mengatur Thumbnail

```css
.gallery-item {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
```

`width: 100%` membuat gambar memenuhi lebar kolom grid.

Sedangkan:

```css
height: 250px;
```

membuat semua thumbnail memiliki tinggi yang sama.

Masalahnya, gambar asli bisa memiliki aspect ratio berbeda.

Kalau hanya memaksa:

```css
width
height
```

gambar berpotensi terlihat gepeng atau tertarik.

Karena itu digunakan:

```css
object-fit: cover;
```

---

# `object-fit: cover`

```css
object-fit: cover;
```

membuat gambar memenuhi kotak tanpa merusak aspect ratio.

Misalnya:

```text
kotak thumbnail
┌──────────────┐
│              │
│    gambar    │
│              │
└──────────────┘
```

Jika ukuran gambar tidak cocok, browser akan memotong bagian yang berlebih daripada membuat gambar gepeng.

Jadi:

```text
width + height
→ menentukan ukuran kotak

object-fit: cover
→ menentukan bagaimana gambar masuk ke kotak
```

---

# Membatasi Gambar Full-Size

```css
#lightbox-image {
  max-width: 80%;
  max-height: 80%;
}
```

Gambar full-size bisa memiliki resolusi yang sangat besar.

Karena itu digunakan:

```css
max-width: 80%;
max-height: 80%;
```

Artinya gambar tidak boleh mengambil lebih dari sekitar 80% ruang yang tersedia.

Berbeda dengan:

```css
width: 80%;
```

`max-width` hanya memberikan **batas maksimum**.

Kalau gambar lebih kecil, browser tidak dipaksa memperbesarnya sampai 80%.

---

# Tombol Close dengan `position: absolute`

```css
#close-btn {
  position: absolute;

  top: 20px;
  right: 20px;
}
```

Tombol close ditempatkan menggunakan:

```css
position: absolute;
```

Tujuannya agar tombol tidak ikut berada di tengah bersama gambar.

Tanpa positioning tersebut, karena `.lightbox` menggunakan Flexbox:

```text
lightbox
├── button
└── image
```

button dan image dapat dianggap sebagai dua flex item.

Dengan:

```css
position: absolute;
```

tombol dikeluarkan dari alur layout normal dan dapat ditempatkan secara bebas.

Kemudian:

```css
top: 20px;
right: 20px;
```

menempatkannya:

```text
┌─────────────────────────────┐
│                         [X] │
│                             │
│          GAMBAR             │
│                             │
└─────────────────────────────┘
```

---

# `fixed` vs `absolute`

Ini salah satu bagian CSS yang cukup membingungkan.

Pada project ini:

```css
.lightbox {
  position: fixed;
}
```

digunakan untuk membuat container menempel pada viewport.

Sedangkan:

```css
#close-btn {
  position: absolute;
}
```

digunakan untuk memposisikan tombol di dalam area lightbox.

Mental model sederhananya:

```text
fixed
→ "tempel terhadap layar"

absolute
→ "posisikan bebas di dalam area positioning"
```

Dalam project ini:

```text
viewport
│
└── lightbox (fixed)
    │
    ├── image
    │
    └── close button (absolute)
```

---

# Alur Program

Secara keseluruhan aplikasi bekerja seperti:

```text
halaman dibuka
↓
lightbox = display none
↓
3 thumbnail terlihat
↓
user klik thumbnail
↓
forEach listener mengetahui item yang diklik
↓
ambil item.src
↓
replace("-thumbnail", "")
↓
hasilkan URL full-size
↓
lightboxImage.src = fullSizeSrc
↓
lightbox display = flex
↓
gambar full-size muncul
↓
user klik X / lightbox
↓
display = none
↓
lightbox tertutup
```

---

# Yang Saya Pelajari

Dari JavaScript:

- `querySelector()` untuk mengambil satu elemen.
- `querySelectorAll()` untuk mengambil banyak elemen.
- `NodeList`.
- `forEach()` untuk memproses kumpulan elemen.
- `addEventListener()` untuk merespons click.
- `.src` untuk membaca dan mengubah sumber gambar.
- `replace()` untuk mengganti bagian tertentu dari string.
- `.style.display` untuk show/hide elemen.
- event bubbling.
- pentingnya menempatkan event listener pada scope yang tepat.

Dari CSS:

- `position: fixed`.
- `position: absolute`.
- `top`, `left`, dan `right`.
- `width` dan `height`.
- `max-width` dan `max-height`.
- `display: none`.
- Flexbox.
- CSS Grid.
- `fr`.
- `gap`.
- `object-fit: cover`.
- `rgba()`.
- positioning parent dan child.

---

## Catatan Pribadi

Pada project ini saya mulai memahami bahwa CSS bukan hanya soal warna atau mempercantik halaman.

CSS juga menentukan:

```text
di mana elemen berada
↓
seberapa besar elemennya
↓
bagaimana child mengikuti parent
↓
bagaimana layout bereaksi terhadap ruang
```

JavaScript pada project ini justru memiliki alur yang cukup lurus:

```text
klik
→ ambil URL
→ ubah URL
→ pasang gambar
→ tampilkan lightbox
```

Sedangkan CSS membutuhkan pemahaman tentang ruang dan posisi elemen.

Karena itu positioning CSS bisa terasa lebih membingungkan dibanding JavaScript meskipun CSS bukan bahasa pemrograman.

Pola yang ingin saya ingat dari project ini:

```text
Overlay satu layar:
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;

Tengah isi overlay:
display: flex;
justify-content: center;
align-items: center;

Susun gallery:
display: grid;

Jaga gambar tidak gepeng:
object-fit: cover;

Tombol di pojok overlay:
position: absolute;
top: ...;
right: ...;
```

---

**Platform:** freeCodeCamp  
**Lab:** Build a Lightbox Viewer  
**Language:** HTML, CSS, JavaScript
