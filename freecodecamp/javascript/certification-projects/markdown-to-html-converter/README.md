# Build a Markdown to HTML Converter

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript" />
  <img src="https://img.shields.io/badge/freeCodeCamp-Certification%20Project-0A0A23?logo=freecodecamp&logoColor=white" alt="freeCodeCamp Certification Project" />
</p>

> **Milestone:** Certification Project setelah mempelajari Basic Regex.

## About

Project ini membuat converter sederhana yang menerima input Markdown, mengubah beberapa pola Markdown menjadi HTML, menampilkan raw HTML sebagai teks, dan menampilkan hasil HTML pada area preview.

## Konsep Utama

Project ini mempraktikkan beberapa konsep:

- DOM selection dengan `document.querySelector()`.
- Event handling dengan `addEventListener()`.
- Function untuk memproses input Markdown.
- Regular expression untuk mengenali pola Markdown.
- String replacement dengan `replace()`.
- Property `value`, `textContent`, dan `innerHTML`.
- Template literal untuk membentuk elemen HTML.
- Method chaining pada beberapa pemanggilan `replace()`.

## Struktur Project

```text
markdown-to-html-converter/
├── index.html
├── styles.css
└── script.js
```

## Source Code

- [`index.html`](./index.html) berisi struktur halaman dan elemen input/output.
- [`styles.css`](./styles.css) mengatur tampilan dan layout halaman.
- [`script.js`](./script.js) menangani proses konversi Markdown dan pembaruan output.

## Pembahasan

### 1. Struktur HTML

`index.html` menyediakan textarea untuk Markdown input, area raw HTML output, dan area HTML preview.

### 2. Pemilihan Elemen DOM

```js
const markdownInput = document.querySelector("#markdown-input");
const rawHTMLOutput = document.querySelector("#html-output");
const htmlPreview = document.querySelector("#preview");
```

`document.querySelector()` digunakan untuk memilih elemen DOM berdasarkan selector CSS agar elemen tersebut dapat digunakan oleh JavaScript.

### 3. Function `convertMarkdown()`

```js
function convertMarkdown() {
  const input = markdownInput.value;
  let html = input;
```

Function mengambil nilai textarea melalui property `value`, lalu menyimpannya ke variabel `html` untuk diproses.

### 4. Regular Expression dan `replace()`

```js
html = html
  .replace(/^#(?!#)\s+(.*)/gm, "<h1>$1</h1>")
  .replace(/^##\s+(.*)/gm, "<h2>$1</h2>")
  .replace(/^###\s+(.*)/gm, "<h3>$1</h3>")
  .replace(/\*\*(.+?)\*\*/gm, "<strong>$1</strong>")
  .replace(/__(.+?)__/gm, "<strong>$1</strong>")
  .replace(/\*(.+?)\*/gm, "<em>$1</em>")
  .replace(/_(.+?)_/gm, "<em>$1</em>")
  .replace(/!\[(.+?)\]\((.+?)\)/gm, `<img alt="$1" src="$2">`)
  .replace(/\[(.+?)\]\((.+?)\)/gm, `<a href="$2">$1</a>`)
  .replace(/^>\s+(.*)/gm, "<blockquote>$1</blockquote>");
```

Setiap `replace()` mencari pola tertentu menggunakan regular expression, kemudian menggantinya dengan elemen HTML yang sesuai.

### 5. Menampilkan Raw HTML dan Preview

```js
rawHTMLOutput.textContent = html;
htmlPreview.innerHTML = html;
```

`textContent` menampilkan hasil HTML sebagai teks biasa, sedangkan `innerHTML` memasukkan hasil tersebut sebagai HTML yang dirender oleh browser.

### 6. Event `input`

```js
markdownInput.addEventListener("input", convertMarkdown);
```

Event `input` menjalankan `convertMarkdown()` setiap kali isi textarea berubah sehingga hasil konversi diperbarui saat pengguna mengetik.

## Method yang Dipakai

- `querySelector()` digunakan untuk memilih elemen DOM berdasarkan selector.
- `replace()` digunakan untuk mengganti pola Markdown dengan HTML.
- `addEventListener()` digunakan untuk merespons perubahan input pengguna.

## Bagian yang Paling Penting Buat Saya

Regular expression menjadi bagian utama dalam proses konversi karena setiap pola Markdown dikenali terlebih dahulu sebelum diganti menjadi elemen HTML.

## Ringkasan Cepat

| Konsep | Fungsi |
|---|---|
| `querySelector()` | Memilih elemen DOM berdasarkan selector |
| `value` | Mengambil nilai dari textarea |
| Regular expression | Mencocokkan pola Markdown |
| `replace()` | Mengganti pola Markdown dengan HTML |
| `textContent` | Menampilkan HTML sebagai teks |
| `innerHTML` | Menampilkan hasil sebagai HTML |
| `addEventListener()` | Menjalankan function saat event terjadi |

## Catatan Belajar

- **Regular expression** digunakan untuk mengenali pola Markdown sebelum diubah menjadi HTML.
- **`replace()`** dapat digunakan berulang kali untuk menangani beberapa pola dalam satu input.
- **`textContent`** dan **`innerHTML`** memiliki fungsi berbeda saat menampilkan hasil.
- **Event `input`** membuat converter memperbarui hasil ketika isi textarea berubah.

## What I Practiced

```text
HTML Structure
CSS Layout
JavaScript DOM Selection
document.querySelector()
Event Listeners
addEventListener()
Regular Expressions
String replace()
textContent
innerHTML
Template Literals
Method Chaining
```

---

**Platform:** freeCodeCamp  
**Certification Project:** Build a Markdown to HTML Converter  
**Language:** HTML, CSS & JavaScript

---

<p align="center">
  <strong>Certification Project — Build a Markdown to HTML Converter Completed</strong><br>
  <sub>Next stop: continue the JavaScript Certification journey.</sub>
</p>
