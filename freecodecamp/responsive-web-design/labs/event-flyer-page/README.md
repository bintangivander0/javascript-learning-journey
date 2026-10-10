# Build an Event Flyer Page

<p align="center">
  <img src="https://img.shields.io/badge/HTML%20%26%20CSS-Absolute%20and%20Relative%20Units-0A0A23" alt="HTML & CSS Absolute and Relative Units" />
  <img src="https://img.shields.io/badge/freeCodeCamp-Lab-0A0A23?logo=freecodecamp&logoColor=white" alt="freeCodeCamp Lab" />
  <img src="https://img.shields.io/badge/Topic-Absolute%20and%20Relative%20Units-4B5563" alt="Absolute and Relative Units" />
</p>

> **Milestone:** Lab setelah mempelajari Absolute and Relative Units.

## About

Project ini membuat sebuah flyer event bertema **Community Gathering & Cozy Talk — "Share Your Story"** menggunakan HTML dan CSS.

Fokus utama lab adalah menggunakan absolute dan relative units seperti `px`, `%`, `vw`, dan `vh`, serta menggabungkan unit berbeda menggunakan `calc()`.

Di luar requirement utama freeCodeCamp, project ini juga dikembangkan dengan layout Flexbox, responsive breakpoint, custom typography, dan styling section card.

## Preview

![Build an Event Flyer Page Preview](https://github.com/user-attachments/assets/5246eaef-6ee7-4fdf-bd5e-2e9332f8ebb1)

## Konsep Utama

- Absolute Units
- Relative Units
- `px`
- `%`
- `vw`
- `vh`
- `calc()`
- `width`
- `min-height`
- `padding`
- `margin`
- `box-sizing: border-box`

## Struktur Project

```text
event-flyer-page/
├── index.html
└── styles.css
```

## Source Code

- [`index.html`](./index.html)
- [`styles.css`](./styles.css)

## Pembahasan

### 1. Struktur Semantic HTML

Halaman menggunakan elemen `header`, `main`, `section`, `hr`, dan `footer` untuk membagi konten berdasarkan fungsinya.

Di dalam `header`, gambar event ditempatkan sebelum `h1` sesuai requirement lab. Bagian `main` berisi tiga `section` yang menampilkan Event Highlights, Special Guests, serta Snacks & Amenities.

### 2. Absolute Unit dengan `px`

Beberapa nilai menggunakan `px` ketika ukuran yang dibutuhkan bersifat tetap, misalnya:

```css
body {
  padding: 50px 0;
}
```

Nilai tersebut memberikan padding `50px` pada bagian atas dan bawah `body`.

Unit `px` juga digunakan untuk beberapa spacing, border, radius, dan batas ukuran gambar.

### 3. Relative Unit dengan `vw`

Lebar `body` ditentukan menggunakan:

```css
body {
  width: 90vw;
}
```

`vw` mengacu pada lebar viewport. Nilai `90vw` berarti `body` menggunakan 90% dari lebar viewport.

Saat lebar browser berubah, ukuran `body` ikut berubah berdasarkan viewport tersebut.

### 4. Relative Unit dengan `vh`

Tinggi viewport digunakan melalui:

```css
body {
  min-height: calc(100vh - 100px);
}
```

`100vh` mewakili 100% tinggi viewport.

Karena `body` memiliki padding atas dan bawah masing-masing `50px`, total padding vertikalnya adalah `100px`.

### 5. Menggunakan `calc()`

Property `min-height` menggunakan:

```css
min-height: calc(100vh - 100px);
```

`calc()` memungkinkan CSS melakukan perhitungan menggunakan unit yang berbeda dalam satu expression.

Pada project ini, tinggi viewport dari `100vh` dikurangi total padding vertikal sebesar `100px`.

### 6. Percentage dengan `%`

Elemen `hr` dan `section` menggunakan percentage:

```css
hr {
  width: 90%;
}

section {
  width: 30%;
}
```

Percentage bersifat relatif terhadap containing block yang menjadi acuannya.

Karena itu, `%` berbeda dengan `vw`: `%` mengikuti ruang dari containing block, sedangkan `vw` langsung mengikuti viewport.

### 7. Memusatkan Elemen dengan `margin: auto`

`body`, gambar header, `hr`, dan `main` menggunakan pola `margin` dengan nilai `auto` pada sisi kiri dan kanan.

Contohnya:

```css
body {
  margin: 0 auto;
}
```

Ketika elemen memiliki width tertentu, margin kiri dan kanan `auto` membagi ruang kosong sehingga elemen berada di tengah secara horizontal.

### 8. Membatasi Ukuran Gambar dengan `max-width`

Gambar event menggunakan kombinasi:

```css
header img {
  width: 50%;
  max-width: 600px;
}
```

`width: 50%` membuat gambar mengikuti ruang yang tersedia, sedangkan `max-width: 600px` mencegah gambar terus membesar pada viewport yang lebar.

### 9. Menggunakan `box-sizing: border-box`

Section menggunakan:

```css
section {
  width: 30%;
  padding: 25px;
  box-sizing: border-box;
}
```

Dengan `border-box`, padding dan border dihitung sebagai bagian dari total width elemen.

Ini membantu menjaga ukuran section tetap sesuai dengan nilai `30%` yang ditentukan.

### 10. Menata Section dengan Flexbox

Tiga section diletakkan sejajar melalui:

```css
main {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
}
```

`display: flex` membuat direct children dari `main` menjadi flex items.

`justify-content: space-between` kemudian mendistribusikan ruang kosong di antara ketiga section.

### 11. Membuat Layout Responsive

Saat viewport semakin sempit, tiga section tidak dipaksa terus mengecil dalam satu baris.

Project menggunakan media query:

```css
@media (max-width: 650px) {
  main {
    flex-direction: column;
    gap: 25px;
  }

  section {
    width: 100%;
  }
}
```

Pada viewport dengan lebar maksimal `650px`, arah Flexbox berubah menjadi kolom dan setiap section menggunakan `100%` lebar `main`.

### 12. Styling Section dengan `:nth-of-type()`

Setiap section diberi warna aksen yang berbeda menggunakan `:nth-of-type()`.

Contohnya:

```css
section:nth-of-type(2) {
  border-top-color: #6f7f6a;
}

section:nth-of-type(3) {
  border-top-color: #8a6670;
}
```

Selector tersebut memilih section berdasarkan urutannya di antara elemen dengan tipe yang sama.

Heading pada section tertentu juga dapat ditargetkan dengan selector turunan seperti:

```css
section:nth-of-type(2) h2 {
  color: #6f7f6a;
}
```

### 13. Custom Typography

Project menggunakan Google Fonts untuk membedakan heading dan body text.

`Cinzel` digunakan pada heading, sedangkan `Mate` digunakan untuk paragraf dan list.

Typography ini merupakan bagian dari styling tambahan dan bukan requirement utama lab.

### 14. Visual Styling Tambahan

Beberapa elemen diberi `border-radius`, `background-color`, dan `box-shadow` untuk membuat flyer memiliki tampilan yang lebih berbeda dari contoh bawaan freeCodeCamp.

Styling ini tidak mengubah requirement utama mengenai penggunaan absolute dan relative units.

## Bagian yang Paling Penting Buat Saya

Hal yang paling penting dari lab ini adalah memahami bahwa **relative unit tidak selalu memiliki acuan yang sama**.

`vw` dan `vh` mengacu langsung pada viewport, sedangkan `%` mengikuti containing block yang relevan. Karena itu, dua nilai yang sama-sama ditulis sebagai unit relatif dapat menghasilkan perilaku layout yang berbeda.

Saya juga perlu memahami bahwa `calc()` dapat menggabungkan nilai seperti `vh` dan `px`, sehingga ukuran elemen dapat tetap mengikuti viewport sambil memperhitungkan ukuran tetap seperti padding.

## Eksperimen Tambahan

Selain requirement utama freeCodeCamp, saya menambahkan beberapa eksperimen pada project ini:

- Flexbox untuk menyusun tiga section secara horizontal.
- Media query pada breakpoint `650px`.
- `flex-direction: column` untuk layout layar sempit.
- `gap` untuk memberi jarak antar-section pada layout kolom.
- Google Fonts untuk custom typography.
- `:nth-of-type()` untuk memberi warna aksen berbeda pada setiap section.
- `border-radius` dan `box-shadow` untuk visual styling.
- `max-width` untuk membatasi ukuran maksimum gambar.

Eksperimen tersebut ditambahkan setelah requirement utama lab tetap dipenuhi.

## Ringkasan Cepat

| Konsep | Fungsi |
|---|---|
| `px` | Memberikan ukuran absolut dalam CSS |
| `%` | Menentukan ukuran relatif terhadap containing block |
| `vw` | Menentukan ukuran relatif terhadap lebar viewport |
| `vh` | Menentukan ukuran relatif terhadap tinggi viewport |
| `calc()` | Menghitung nilai CSS menggunakan expression |
| `min-height` | Menentukan tinggi minimum elemen |
| `margin: auto` | Membantu memusatkan elemen dengan width tertentu |
| `max-width` | Membatasi lebar maksimum elemen |
| `box-sizing: border-box` | Memasukkan padding dan border ke dalam perhitungan width |
| `display: flex` | Membuat direct children menjadi flex items |
| `justify-content` | Mengatur distribusi ruang pada main axis Flexbox |
| `flex-direction` | Mengatur arah susunan flex items |
| `gap` | Memberikan jarak antar-flex item |
| `@media` | Menerapkan CSS berdasarkan kondisi media |
| `:nth-of-type()` | Memilih elemen berdasarkan urutan tipenya |

## Catatan Belajar

- **`px`** digunakan ketika project membutuhkan ukuran yang tetap.
- **`vw`** mengacu pada persentase lebar viewport.
- **`vh`** mengacu pada persentase tinggi viewport.
- **`%`** mengikuti containing block yang menjadi acuan property tersebut.
- **`calc()`** dapat menggabungkan absolute dan relative units dalam perhitungan CSS.
- **`margin: auto`** dapat memusatkan elemen secara horizontal ketika width-nya sudah ditentukan.
- **`box-sizing: border-box`** membantu menjaga total ukuran elemen tetap sesuai width yang ditentukan.
- **Flexbox** digunakan sebagai eksperimen tambahan untuk menyusun section.
- **Media query** memungkinkan layout berubah ketika viewport mencapai breakpoint tertentu.
- **Responsive design** tidak selalu berarti semua elemen terus diperkecil; layout juga dapat berubah susunan ketika ruang tidak lagi cukup.

## What I Practiced

```text
Semantic HTML
CSS Absolute Units
CSS Relative Units
Pixels
Percentages
Viewport Width
Viewport Height
calc()
Width and Min Height
Margin and Padding
box-sizing
Flexbox
Media Queries
Responsive Layout
:nth-of-type()
```

---

**Platform:** freeCodeCamp  
**Lab:** Build an Event Flyer Page  
**Languages:** HTML & CSS  
**Focus:** Absolute and Relative Units

---

<p align="center">
  <strong>Absolute and Relative Units Section — Build an Event Flyer Page Completed</strong><br>
  <sub>Next stop: continue the Responsive Web Design Certification journey.</sub>
</p>
