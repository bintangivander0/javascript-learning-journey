# Mengenal DOM dan Cara Mengakses Elemen HTML

Mari kita belajar tentang **DOM** dan mengapa konsep ini sangat penting dalam pembuatan website.

---

## Apa Itu DOM?

**DOM** adalah singkatan dari **Document Object Model**. Sederhananya, DOM adalah sebuah jembatan yang menghubungkan halaman HTML dengan JavaScript. 

Dengan menggunakan DOM, kamu bisa:
- Menambah elemen baru ke halaman web.
- Mengubah isi teks atau gaya (CSS) suatu elemen.
- Menghapus elemen yang tidak diperlukan.
- Membuat website menjadi interaktif (misalnya, tombol yang bisa diklik atau merespons ketikan pengguna).

---

## Struktur Pohon Keluarga DOM

Di dalam DOM, halaman HTML dibayangkan seperti sebuah **pohon keluarga** (*tree of nodes*). Setiap tag HTML adalah anggota keluarga atau "cabang" dari pohon tersebut.

### Contoh Kode HTML:
```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <title>Contoh DOM</title>
  </head>
  <body>
    <h1>Apa itu DOM?</h1>
    <h2>Mari kita belajar DOM</h2>
  </body>
</html>
```

### Jika Digambarkan dalam Bentuk Pohon:
- **Dokumen (Akar Paling Bawah/Root)**
  - **HTML (Anak Pertama)**
    - **Head (Kepala Halaman)**
      - Title (Judul Web)
    - **Body (Isi Halaman yang Kelihatan)**
      - H1 (Judul Utama)
      - H2 (Sub-Judul)

Semua tag di dalam website tersusun rapi seperti susunan di atas. Tag `html` punya dua anak utama, yaitu `head` dan `body`. Di dalam `body` barulah ada konten-konten yang bisa kita lihat langsung di browser.

---

## Cara Mengambil Elemen Menggunakan JavaScript

Agar JavaScript bisa mengubah sebuah elemen HTML, kita harus "menangkap" atau mengambil elemen tersebut terlebih dahulu. Ada dua cara paling populer yang sering digunakan:

### 1. Menggunakan `getElementById()`
Cara ini digunakan jika elemen HTML milikmu punya atribut `id`. Karena `id` di dalam satu halaman web tidak boleh kembar (harus unik), fungsi ini hanya akan mengambil **satu elemen saja**.

**Contoh HTML:**
```html
<div id="kotak-utama">
  <h1>Halo Dunia!</h1>
</div>
```

**Cara Menangkapnya di JavaScript:**
```javascript
// Kita ambil elemen yang id-nya "kotak-utama"
const kotak = document.getElementById("kotak-utama");

// Jika kita tampilkan di console, isinya adalah elemen HTML tadi
console.log(kotak);
```
*Catatan: Pastikan nama id yang dimasukkan ke dalam kurung diapit oleh tanda petik.*

### 2. Menggunakan `querySelector()`
Cara ini jauh lebih fleksibel daripada cara pertama. Dengan `querySelector()`, kamu bisa mengambil elemen menggunakan jenis penulisan yang sama seperti saat menulis **CSS Selector**. Fungsi ini akan mengambil **elemen pertama** yang ia temukan.

#### A. Mengambil Berdasarkan Nama Tag
Jika ingin mengambil tag HTML biasa (seperti `<section>`, `<p>`, `<h1>`), langsung tulis namanya di dalam kurung.

```javascript
// Mengambil tag <section> pertama yang ditemukan
const bagianSeksi = document.querySelector("section");
console.log(bagianSeksi);
```

#### B. Mengambil Berdasarkan Nama Class
Jika ingin mengambil elemen yang memiliki atribut `class`, kamu wajib menambahkan tanda **titik (.)** di depan nama class-nya (sama persis seperti aturan di CSS).

**Contoh HTML:**
```html
<div class="teks-kuning">
  <p>Tulisan ini latar belakangnya kuning.</p>
</div>
```

**Cara Menangkapnya di JavaScript:**
```javascript
// Ingat, wajib pakai tanda titik (.) sebelum nama class
const teksSorot = document.querySelector(".teks-kuning");
console.log(teksSorot);
```

---

## Kesimpulan

Selain dua fungsi di atas, sebenarnya masih ada cara lain untuk mengambil banyak elemen sekaligus, seperti `getElementsByClassName()` dan `querySelectorAll()`. Namun, menguasai `getElementById()` dan `querySelector()` sudah lebih dari cukup sebagai modal awal untuk membuat website yang interaktif dan keren!