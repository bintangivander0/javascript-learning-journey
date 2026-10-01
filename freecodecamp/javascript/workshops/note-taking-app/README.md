# Build a Note Taking App

Ilustrasi:
<table align="center">
  <tr>
    <td>
      <img width="610" height="317" alt="image" src="https://github.com/user-attachments/assets/6a1590e8-4ca3-478a-9a09-8bf7d79989e1" />
    </td>
  </tr>
</table>

Workshop ini membuat aplikasi catatan sederhana yang dapat diedit langsung dari sebuah elemen HTML menggunakan `contenteditable`.

Ketika user masuk ke area catatan, pesan status akan dibersihkan. Setelah user selesai mengedit dan keluar dari area catatan, JavaScript akan mengecek apakah isi catatan berubah.

Jika ada perubahan:

```text
catatan baru dibaca
↓
dibandingkan dengan isi sebelumnya
↓
isi terbaru disimpan ke variable
↓
pesan "Note saved successfully!" ditampilkan
```

Project ini juga menggunakan atribut aksesibilitas seperti:

```text
aria-label
aria-live="polite"
```

---

## Struktur HTML

Struktur utama aplikasi:

```text
body
│
├── .helper-text
│
├── #note
└── #status
```

### Helper Text

```html
<p class="helper-text">
  Click or tap on the card to edit your note.
</p>
```

Bagian ini memberi petunjuk kepada user bahwa card dapat diklik atau disentuh untuk mulai mengedit catatan.

---

# Area Catatan

```html
<div
  id="note"
  class="note"
  contenteditable="true"
  aria-label="Note editor"
>
  ...
</div>
```

Elemen yang digunakan bukan:

```html
<textarea>
```

tetapi:

```html
<div>
```

Supaya `div` dapat diedit oleh user, digunakan:

```html
contenteditable="true"
```

Mental model:

```text
div biasa
↓
contenteditable="true"
↓
user bisa mengetik dan mengedit isinya
```

---

## `contenteditable`

Secara default, isi `<div>` tidak bisa diedit.

Contoh:

```html
<div>
  Hello
</div>
```

User hanya bisa membaca.

Tetapi:

```html
<div contenteditable="true">
  Hello
</div>
```

membuat user dapat:

```text
klik
↓
cursor muncul
↓
hapus / tambah teks
```

---

# `aria-label`

Area catatan menggunakan:

```html
aria-label="Note editor"
```

Atribut ini memberikan nama yang bisa dipahami oleh assistive technology seperti screen reader.

Jadi meskipun elemen tersebut hanya berupa:

```html
<div>
```

screen reader mendapatkan informasi bahwa bagian tersebut digunakan sebagai:

```text
Note editor
```

Mental model:

```text
aria-label
→ "nama yang akan dikenali assistive technology"
```

---

# Status Message dan `aria-live`

HTML:

```html
<div
  id="status"
  aria-live="polite"
></div>
```

Element ini digunakan untuk menampilkan:

```text
Note saved successfully!
```

Atribut:

```html
aria-live="polite"
```

memberi tahu screen reader bahwa jika isi elemen berubah, perubahan tersebut perlu diumumkan kepada user.

Nilai:

```text
polite
```

berarti:

```text
pesan penting
tetapi tidak darurat
```

Screen reader tidak perlu langsung memotong informasi lain yang sedang dibacakan.

Ini cocok untuk pesan seperti:

```text
Note saved successfully!
```

---

# CSS

## Styling Body

```css
body {
  font-family: Arial, sans-serif;
  margin: 2em;
  max-width: 700px;
  background-color: #f5f5f5;
}
```

Halaman menggunakan lebar maksimum:

```css
max-width: 700px;
```

supaya area catatan tidak menjadi terlalu lebar pada layar besar.

---

# Styling Note Card

```css
.note {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  padding: 1.5em;
  margin-bottom: 1em;

  line-height: 1.5;
  min-height: 250px;
  font-size: 16px;

  white-space: pre-wrap;
}
```

Area catatan dibuat seperti sebuah card menggunakan:

```text
background
border
border-radius
box-shadow
padding
```

---

## `min-height`

```css
min-height: 250px;
```

memberikan tinggi minimum pada area catatan.

Jadi meskipun isi catatan sedikit, card tetap memiliki area yang cukup besar untuk diedit.

---

# `white-space: pre-wrap`

```css
white-space: pre-wrap;
```

Bagian ini penting untuk mempertahankan line break atau baris baru pada isi catatan.

Tanpa pengaturan yang sesuai, whitespace dan line break bisa tampil berbeda dari yang diharapkan.

Mental model:

```text
user menulis beberapa baris
↓
pre-wrap
↓
baris dan spasi tetap lebih terjaga
```

---

# Caret

```css
.note[contenteditable="true"] {
  caret-color: black;
}
```

`caret` adalah garis kecil yang berkedip ketika user sedang mengetik.

Contohnya:

```text
Hello|
     ↑
   caret
```

Dengan:

```css
caret-color: black;
```

warna cursor teks tersebut diatur menjadi hitam.

---

# Hover

```css
.note:hover {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
```

Ketika mouse berada di atas note card, shadow sedikit berubah.

Ini memberikan feedback visual bahwa area tersebut dapat digunakan.

---

# Helper Text

```css
.helper-text {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5em;
  user-select: none;
  font-style: italic;
}
```

Bagian:

```css
user-select: none;
```

mencegah teks petunjuk mudah terseleksi ketika user berinteraksi dengan halaman.

---

# JavaScript

JavaScript mengambil dua elemen utama:

```js
const noteEl =
  document.getElementById("note");

const statusEl =
  document.getElementById("status");
```

`noteEl` digunakan untuk membaca isi catatan.

`statusEl` digunakan untuk menampilkan pesan status.

---

# Menyimpan Isi Sebelumnya

```js
let currentContent = "";
```

Variable ini menyimpan isi catatan terakhir yang dianggap sebagai versi tersimpan.

Digunakan `let` karena nilainya akan berubah.

Mental model:

```text
currentContent
→ isi catatan terakhir
```

Contohnya:

```text
awal:
"Hello"

user edit:
"Hello World"

setelah save:
currentContent = "Hello World"
```

---

# Event `focus`

```js
noteEl.addEventListener("focus", () => {
  statusEl.textContent = "";
});
```

Event `focus` terjadi ketika user masuk ke area note.

Contohnya:

```text
user klik note
↓
note mendapat focus
↓
status message dikosongkan
```

Jadi pesan:

```text
Note saved successfully!
```

tidak terus terlihat ketika user mulai melakukan edit baru.

---

# Event `blur`

```js
noteEl.addEventListener("blur", () => {
  const newContent =
    noteEl.innerHTML;

  if (currentContent === newContent) {
    return;
  }

  currentContent = newContent;

  console.log(currentContent);

  statusEl.textContent =
    "Note saved successfully!";
});
```

Event `blur` merupakan kebalikan dari `focus`.

```text
focus
→ user masuk ke elemen

blur
→ user keluar dari elemen
```

Contohnya:

```text
klik note
↓
edit isi
↓
klik area lain
↓
blur event
```

Pada saat itulah program mengecek perubahan catatan.

---

# Membaca Isi Terbaru

```js
const newContent =
  noteEl.innerHTML;
```

Isi note dibaca menggunakan:

```js
innerHTML
```

Hasilnya disimpan ke:

```js
newContent
```

---

# Mengecek Apakah Isi Berubah

```js
if (
  currentContent === newContent
) {
  return;
}
```

Program membandingkan:

```text
isi sebelumnya
VS
isi sekarang
```

Jika sama:

```text
tidak ada perubahan
↓
return
↓
function berhenti
```

Ini disebut **early return**.

Jadi aplikasi tidak menampilkan pesan save jika user tidak benar-benar mengubah isi catatan.

---

# Jika Catatan Berubah

Jika:

```js
currentContent !== newContent
```

program melanjutkan:

```js
currentContent =
  newContent;
```

Variable `currentContent` diperbarui dengan isi terbaru.

Kemudian:

```js
console.log(currentContent);
```

menampilkan isi catatan di console.

Dan:

```js
statusEl.textContent =
  "Note saved successfully!";
```

menampilkan pesan ke halaman.

Karena `#status` memiliki:

```html
aria-live="polite"
```

pesan tersebut juga dapat diumumkan kepada pengguna screen reader.

---

# `DOMContentLoaded`

```js
window.addEventListener(
  "DOMContentLoaded",
  () => {
    currentContent =
      noteEl.textContent;
  }
);
```

Event ini berjalan ketika struktur HTML selesai dimuat dan diproses oleh browser.

Tujuannya di aplikasi ini adalah mengambil isi awal note:

```text
halaman dimuat
↓
DOM siap
↓
baca isi awal note
↓
simpan ke currentContent
```

Dengan begitu JavaScript memiliki referensi isi awal untuk dibandingkan dengan isi setelah diedit.

---

# Alur Program

```text
HALAMAN DIMUAT
↓
DOMContentLoaded
↓
simpan isi awal note
ke currentContent
↓
user klik note
↓
focus
↓
hapus status sebelumnya
↓
user mengedit catatan
↓
user keluar dari note
↓
blur
↓
ambil isi terbaru
↓
bandingkan dengan currentContent
│
├── sama
│   ↓
│   return
│
└── berbeda
    ↓
    update currentContent
    ↓
    console.log()
    ↓
    tampilkan:
    "Note saved successfully!"
    ↓
    aria-live="polite"
    memberi tahu screen reader
```

---

# Focus vs Blur

Bagian yang ingin saya ingat:

```text
focus
→ user MASUK ke elemen

blur
→ user KELUAR dari elemen
```

Dalam project ini:

```text
focus
→ bersihkan pesan lama

blur
→ cek apakah note berubah
```

---

# `textContent` vs `innerHTML`

Project ini menggunakan keduanya untuk kebutuhan yang berbeda.

```js
statusEl.textContent =
  "Note saved successfully!";
```

karena yang ingin dimasukkan hanyalah plain text.

Sedangkan:

```js
noteEl.innerHTML
```

digunakan ketika membaca isi elemen `contenteditable`.

Mental model sederhana:

```text
textContent
→ fokus pada teks

innerHTML
→ isi HTML di dalam elemen
```

---

# State Sederhana

Variable:

```js
let currentContent = "";
```

bisa dianggap sebagai **state sederhana** aplikasi.

State berarti data yang menggambarkan kondisi aplikasi saat ini.

Di sini:

```text
currentContent
→ versi catatan yang terakhir disimpan
```

Ketika user melakukan perubahan:

```text
state lama
↓
dibandingkan dengan input baru
↓
state diperbarui
```

---

# Aksesibilitas

Project ini menggunakan dua bagian penting:

```html
aria-label="Note editor"
```

dan:

```html
aria-live="polite"
```

Perbedaannya:

```text
aria-label
→ memberi NAMA pada elemen

aria-live
→ memberi tahu bahwa PERUBAHAN ISI
  perlu diumumkan
```

Jadi:

```text
#note
aria-label
→ "Ini Note editor"

#status
aria-live
→ "Kalau pesan berubah,
   beri tahu screen reader"
```

---

# Catatan Penting

Walaupun aplikasi menampilkan:

```text
Note saved successfully!
```

kode saat ini **belum menyimpan catatan secara permanen** ke:

```text
localStorage
database
server
file
```

Isi terbaru hanya disimpan sementara pada variable:

```js
currentContent
```

Jika halaman di-refresh, perubahan user tidak dipulihkan kembali.

Jadi pada project ini kata **saved** lebih tepat dipahami sebagai:

```text
perubahan terdeteksi
dan state currentContent diperbarui
```

bukan penyimpanan permanen.

---

# Yang Saya Pelajari

Dari workshop ini saya belajar:

- `contenteditable`.
- `aria-label`.
- `aria-live="polite"`.
- Event `focus`.
- Event `blur`.
- `DOMContentLoaded`.
- `innerHTML`.
- `textContent`.
- Membandingkan isi lama dan baru.
- Early return.
- Menyimpan state sederhana dengan variable.
- Mengubah pesan status melalui DOM.
- `white-space: pre-wrap`.
- `caret-color`.
- Hubungan perubahan DOM dengan aksesibilitas.

---

## Catatan Pribadi

Project ini menunjukkan pola yang berbeda dari click event biasa.

Tidak selalu harus:

```text
klik button
→ jalankan function
```

Kita juga bisa bereaksi terhadap keadaan focus:

```text
focus
→ mulai berinteraksi

blur
→ selesai berinteraksi
```

Pola utama project:

```text
LOAD
↓
simpan state awal

FOCUS
↓
mulai edit

BLUR
↓
baca isi baru
↓
bandingkan state
↓
kalau berubah → update state
↓
update DOM
```

Untuk ARIA:

```text
aria-label
→ memberi nama

aria-live
→ mengumumkan perubahan
```

Dan pola aplikasi yang ingin saya ingat:

```text
USER INTERACTION
↓
EVENT
↓
READ DATA
↓
COMPARE STATE
↓
UPDATE STATE
↓
UPDATE DOM
```

---

**Platform:** freeCodeCamp  
**Workshop:** Build a Note Taking App  
**Language:** HTML, CSS, JavaScript  
**Topic:** DOM, Events, State, `contenteditable`, Accessibility
