# Markdown to HTML Converter

<p align="center">
  <img width="463" height="328" alt="image" src="https://github.com/user-attachments/assets/9fac4c2a-09f5-42b0-b72e-4dd4bcffa18c" />
  <img width="785" height="314" alt="image" src="https://github.com/user-attachments/assets/49d0220a-a592-4096-af5b-5edb5d73bef8" />
</p>

> **Milestone:** Certification Project pertama pada JavaScript Certification freeCodeCamp.

Project ini membuat aplikasi sederhana untuk mengubah teks Markdown menjadi HTML.

User dapat menulis Markdown di dalam textarea. Setiap perubahan input langsung diproses menggunakan JavaScript dan Regular Expressions, lalu hasilnya ditampilkan dalam dua bentuk:

- **Raw HTML Output** — menampilkan kode HTML sebagai teks.
- **HTML Preview** — menampilkan hasil HTML yang benar-benar dirender oleh browser.

---

## Screenshot

<table align="center">
  <tr>
    <td>
      <img src="PASTE_SCREENSHOT_1_HERE" alt="Markdown Converter Preview" />
    </td>
    <td>
      <img src="PASTE_SCREENSHOT_2_HERE" alt="Markdown Converter Test Result" />
    </td>
  </tr>
</table>

---

## Fitur

Converter ini mendukung beberapa syntax Markdown dasar:

| Markdown | HTML |
|---|---|
| `# Heading 1` | `<h1>Heading 1</h1>` |
| `## Heading 2` | `<h2>Heading 2</h2>` |
| `### Heading 3` | `<h3>Heading 3</h3>` |
| `**bold**` | `<strong>bold</strong>` |
| `__bold__` | `<strong>bold</strong>` |
| `*italic*` | `<em>italic</em>` |
| `_italic_` | `<em>italic</em>` |
| `![alt](image.jpg)` | `<img alt="alt" src="image.jpg">` |
| `[link](https://example.com)` | `<a href="https://example.com">link</a>` |
| `> quote` | `<blockquote>quote</blockquote>` |

---

## Struktur Project

Project terdiri dari tiga file utama:

```text
index.html
styles.css
script.js
```

### `index.html`

Digunakan untuk membuat:

- textarea Markdown.
- kotak Raw HTML Output.
- kotak HTML Preview.

### `styles.css`

Digunakan untuk mengatur:

- layout.
- ukuran textarea.
- ukuran output.
- responsive layout.
- scroll pada output.

### `script.js`

Berisi:

- DOM selector.
- function `convertMarkdown()`.
- Regular Expressions.
- event listener `input`.
- raw HTML output.
- live HTML preview.

---

## HTML

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown to HTML Converter</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <h1>Markdown to HTML Converter</h1>

    <div id="container">
        <div class="container">
            <h2>Markdown Input:</h2>
            <textarea
                id="markdown-input"
                placeholder="Enter your markdown here..."
            ></textarea>
        </div>

        <div class="container">
            <h2>Raw HTML Output:</h2>
            <div id="html-output"></div>
        </div>

        <div class="container">
            <h2>HTML Preview:</h2>
            <div id="preview"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

---

## JavaScript

```js
const markdownInput =
  document.querySelector("#markdown-input");

const rawHTMLOutput =
  document.querySelector("#html-output");

const htmlPreview =
  document.querySelector("#preview");

function convertMarkdown() {
  const input = markdownInput.value;

  let html = input;

  html = html
    .replace(
      /^#(?!#)\s+(.*)/gm,
      "<h1>$1</h1>"
    )
    .replace(
      /^##\s+(.*)/gm,
      "<h2>$1</h2>"
    )
    .replace(
      /^###\s+(.*)/gm,
      "<h3>$1</h3>"
    )
    .replace(
      /\*\*(.+?)\*\*/gm,
      "<strong>$1</strong>"
    )
    .replace(
      /__(.+?)__/gm,
      "<strong>$1</strong>"
    )
    .replace(
      /\*(.+?)\*/gm,
      "<em>$1</em>"
    )
    .replace(
      /_(.+?)_/gm,
      "<em>$1</em>"
    )
    .replace(
      /!\[(.+?)\]\((.+?)\)/gm,
      `<img alt="$1" src="$2">`
    )
    .replace(
      /\[(.+?)\]\((.+?)\)/gm,
      `<a href="$2">$1</a>`
    )
    .replace(
      /^>\s+(.*)/gm,
      "<blockquote>$1</blockquote>"
    );

  rawHTMLOutput.textContent = html;
  htmlPreview.innerHTML = html;

  return html;
}

markdownInput.addEventListener(
  "input",
  convertMarkdown
);
```

---

# Cara Kerja `convertMarkdown()`

Function utama:

```js
function convertMarkdown()
```

tidak menerima parameter.

Isi Markdown langsung diambil dari:

```js
markdownInput.value
```

Kemudian nilainya disimpan ke:

```js
let html = input;
```

Variabel `html` inilah yang terus diproses menggunakan beberapa `.replace()`.

---

## Kenapa Menggunakan Banyak `.replace()`?

Setiap jenis Markdown memiliki pola berbeda.

Contohnya:

```text
# Judul
```

berbeda dengan:

```text
**bold**
```

dan berbeda lagi dengan:

```text
[link](url)
```

Karena itu setiap syntax Markdown ditangani dengan Regex yang berbeda.

---

# Heading Level 1

```js
.replace(
  /^#(?!#)\s+(.*)/gm,
  "<h1>$1</h1>"
)
```

Regex:

```regex
^#(?!#)\s+(.*)
```

Bagian-bagiannya:

```text
^
→ awal baris

#
→ satu tanda #

(?!#)
→ setelah # pertama tidak boleh ada #

\s+
→ minimal satu whitespace

(.*)
→ tangkap isi heading
```

Negative lookahead:

```regex
(?!#)
```

digunakan supaya:

```md
## Heading 2
```

tidak salah dianggap sebagai:

```md
# Heading 1
```

---

# Heading Level 2

```js
.replace(
  /^##\s+(.*)/gm,
  "<h2>$1</h2>"
)
```

Input:

```md
## Heading 2
```

menjadi:

```html
<h2>Heading 2</h2>
```

---

# Heading Level 3

```js
.replace(
  /^###\s+(.*)/gm,
  "<h3>$1</h3>"
)
```

Input:

```md
### Heading 3
```

menjadi:

```html
<h3>Heading 3</h3>
```

---

# Flag `g` dan `m`

Beberapa Regex menggunakan:

```regex
gm
```

`g` berarti:

```text
global
```

Semua match diproses.

`m` berarti:

```text
multiline
```

Anchor:

```regex
^
```

dapat berlaku pada setiap baris, bukan hanya awal seluruh string.

Ini penting untuk heading dan blockquote.

---

# Bold dengan `**`

```js
.replace(
  /\*\*(.+?)\*\*/gm,
  "<strong>$1</strong>"
)
```

Input:

```md
**bold**
```

menjadi:

```html
<strong>bold</strong>
```

Karakter `*` harus di-escape:

```regex
\*
```

karena `*` merupakan karakter khusus dalam Regex.

---

# Bold dengan `__`

```js
.replace(
  /__(.+?)__/gm,
  "<strong>$1</strong>"
)
```

Input:

```md
__bold__
```

juga menjadi:

```html
<strong>bold</strong>
```

---

# Italic dengan `*`

```js
.replace(
  /\*(.+?)\*/gm,
  "<em>$1</em>"
)
```

Input:

```md
*italic*
```

menjadi:

```html
<em>italic</em>
```

---

# Italic dengan `_`

```js
.replace(
  /_(.+?)_/gm,
  "<em>$1</em>"
)
```

Input:

```md
_italic_
```

menjadi:

```html
<em>italic</em>
```

---

# Kenapa Bold Diproses Sebelum Italic?

Markdown:

```md
**bold**
```

menggunakan karakter yang sama dengan:

```md
*italic*
```

Bedanya hanya jumlah `*`.

Kalau italic diproses terlalu dulu, bagian dari syntax bold bisa ikut terbaca sebagai italic.

Karena itu di project ini urutannya:

```text
bold
kemudian
italic
```

Hal yang sama berlaku untuk:

```text
__bold__
```

dan:

```text
_italic_
```

---

# Capturing Group

Beberapa Regex menggunakan:

```regex
(...)
```

Contoh:

```regex
\*\*(.+?)\*\*
```

Bagian:

```regex
(.+?)
```

merupakan capturing group.

Isi yang berhasil ditangkap dapat digunakan kembali menggunakan:

```text
$1
```

Contoh:

```md
**JavaScript**
```

capturing group mengambil:

```text
JavaScript
```

kemudian replacement:

```html
<strong>$1</strong>
```

menjadi:

```html
<strong>JavaScript</strong>
```

---

# Kenapa Menggunakan `+?`

Pada:

```regex
(.+?)
```

`+` berarti:

```text
satu atau lebih karakter
```

sedangkan:

```regex
?
```

setelah quantifier membuat pencarian menjadi lebih sedikit mengambil karakter.

Ini membantu ketika terdapat lebih dari satu formatting dalam satu baris.

Contoh:

```md
**Satu** dan **Dua**
```

supaya masing-masing dapat diproses secara terpisah.

---

# Image Markdown

```js
.replace(
  /!\[(.+?)\]\((.+?)\)/gm,
  `<img alt="$1" src="$2">`
)
```

Input:

```md
![Logo](logo.png)
```

Regex menangkap dua bagian:

```text
$1
→ Logo

$2
→ logo.png
```

Kemudian menghasilkan:

```html
<img alt="Logo" src="logo.png">
```

---

# Link Markdown

```js
.replace(
  /\[(.+?)\]\((.+?)\)/gm,
  `<a href="$2">$1</a>`
)
```

Input:

```md
[Google](https://google.com)
```

Capturing group:

```text
$1
→ Google

$2
→ https://google.com
```

Hasil:

```html
<a href="https://google.com">Google</a>
```

---

# Kenapa Image Diproses Sebelum Link?

Syntax image:

```md
![Logo](logo.png)
```

memiliki bagian:

```md
[Logo](logo.png)
```

yang bentuknya sama seperti link.

Karena itu image diproses terlebih dahulu agar tidak salah terbaca sebagai anchor element biasa.

---

# Blockquote

```js
.replace(
  /^>\s+(.*)/gm,
  "<blockquote>$1</blockquote>"
)
```

Input:

```md
> Ini kutipan
```

menjadi:

```html
<blockquote>Ini kutipan</blockquote>
```

Karena memakai:

```regex
^
```

karakter `>` harus berada di awal baris.

---

## Formatting di dalam Blockquote

Contoh:

```md
> **Ini penting**
```

Bold diproses menjadi:

```html
<strong>Ini penting</strong>
```

dan blockquote menghasilkan:

```html
<blockquote><strong>Ini penting</strong></blockquote>
```

Ini menunjukkan bahwa beberapa aturan Markdown dapat bekerja pada input yang sama.

---

# Raw HTML Output

```js
rawHTMLOutput.textContent = html;
```

Digunakan:

```js
textContent
```

karena tag HTML harus ditampilkan sebagai teks.

Contoh:

```html
<h1>Hello</h1>
```

tetap terlihat sebagai:

```text
<h1>Hello</h1>
```

di kotak Raw HTML Output.

---

# HTML Preview

```js
htmlPreview.innerHTML = html;
```

Berbeda dengan raw output, preview menggunakan:

```js
innerHTML
```

supaya browser membaca string sebagai HTML.

Jadi:

```html
<h1>Hello</h1>
```

benar-benar dirender sebagai heading.

---

## `textContent` vs `innerHTML`

| Property | Kegunaan |
|---|---|
| `textContent` | Menampilkan teks apa adanya |
| `innerHTML` | Membaca dan merender HTML |

Pada project ini:

```js
rawHTMLOutput.textContent = html;
```

digunakan untuk kode mentah.

Sedangkan:

```js
htmlPreview.innerHTML = html;
```

digunakan untuk preview.

---

# Event `input`

```js
markdownInput.addEventListener(
  "input",
  convertMarkdown
);
```

Event:

```text
input
```

berjalan setiap isi textarea berubah.

Bukan hanya saat user menekan tombol keyboard, tetapi juga saat:

- mengetik,
- menghapus,
- paste text.

Karena itu preview dapat diperbarui secara langsung.

---

# CSS

```css
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

#markdown-input {
  width: 100%;
  height: 100px;
}

#html-output,
#preview {
  height: 100px;
  overflow-x: auto;
  overflow-y: auto;
  display: inline-block;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  margin: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f9f9f9;
}

@media (min-width: 600px) {
  #markdown-input,
  #html-output,
  #preview {
    height: 200px;
    margin: 0;
  }

  #container {
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
  }
}
```

> Catatan: pada source awal terdapat typo `overfloy-y`. Untuk README ini ditulis sebagai `overflow-y` agar scroll vertikal bekerja.

---

# Scroll pada Output

Bagian:

```css
overflow-y: auto;
```

membuat scrollbar vertikal muncul ketika isi lebih panjang daripada tinggi kotak.

Sedangkan:

```css
overflow-x: auto;
```

digunakan jika isi terlalu panjang ke arah horizontal.

Karena tinggi output dibatasi:

```css
height: 100px;
```

atau:

```css
height: 200px;
```

di layar yang lebih lebar, isi tidak terus membuat kotak memanjang ke bawah.

---

# Responsive Layout

```css
@media (min-width: 600px)
```

mengubah tampilan ketika lebar layar minimal 600px.

Container utama menggunakan:

```css
display: flex;
```

sehingga Markdown Input, Raw HTML Output, dan HTML Preview dapat ditampilkan berdampingan.

---

## Alur Project

Secara ringkas, project bekerja seperti ini:

```text
User mengetik Markdown
        |
        v
event "input"
        |
        v
convertMarkdown()
        |
        v
Regex + replace()
        |
        +-------------------+
        |                   |
        v                   v
Raw HTML Output       HTML Preview
textContent           innerHTML
```

---

# Contoh Input

```md
# Belajar JavaScript

Ini adalah **teks tebal** dan *teks miring*.

[freeCodeCamp](https://freecodecamp.org)

> **Tetap belajar pelan-pelan**
```

Raw HTML:

```html
<h1>Belajar JavaScript</h1>

Ini adalah <strong>teks tebal</strong> dan <em>teks miring</em>.

<a href="https://freecodecamp.org">freeCodeCamp</a>

<blockquote><strong>Tetap belajar pelan-pelan</strong></blockquote>
```

---

# Hal yang Saya Pelajari

Project ini menggabungkan beberapa materi yang sebelumnya dipelajari secara terpisah:

- DOM selector.
- Event listener.
- Event `input`.
- Function.
- Return value.
- String manipulation.
- Regular Expressions.
- `replace()`.
- Capturing groups.
- Backreference `$1` dan `$2`.
- Flag `g`.
- Flag `m`.
- Anchor `^`.
- Negative lookahead.
- Lazy quantifier `+?`.
- Method chaining.
- `textContent`.
- `innerHTML`.
- Responsive CSS.
- Overflow dan scrolling.

---

## Catatan Pribadi

Bagian yang paling penting dari project ini bukan menghafal seluruh Regex.

Yang lebih penting adalah memahami bahwa setiap aturan Markdown dapat dipecah menjadi tiga pertanyaan:

1. **Pola Markdown apa yang dicari?**
2. **Bagian mana yang perlu ditangkap?**
3. **HTML apa yang harus dihasilkan?**

Contohnya:

```md
[Google](https://google.com)
```

Yang perlu dicari:

```text
[text](URL)
```

Yang perlu ditangkap:

```text
text
URL
```

Yang harus dihasilkan:

```html
<a href="URL">text</a>
```

Dari kebutuhan tersebut baru Regex disusun.

---

## Catatan Tentang Urutan `replace()`

Urutan konversi ternyata penting.

Contoh:

```text
image sebelum link
bold sebelum italic
```

karena syntax yang digunakan memiliki bentuk yang mirip.

Project ini membantu memahami bahwa membuat Regex yang benar saja belum selalu cukup. Kadang urutan pemrosesan juga menentukan hasil akhir.

---

<details>
<summary><strong>Regex utama yang digunakan</strong></summary>

<br>

### H1

```regex
^#(?!#)\s+(.*)
```

### H2

```regex
^##\s+(.*)
```

### H3

```regex
^###\s+(.*)
```

### Bold

```regex
\*\*(.+?)\*\*
```

```regex
__(.+?)__
```

### Italic

```regex
\*(.+?)\*
```

```regex
_(.+?)_
```

### Image

```regex
!\[(.+?)\]\((.+?)\)
```

### Link

```regex
\[(.+?)\]\((.+?)\)
```

### Blockquote

```regex
^>\s+(.*)
```

</details>

---

## Certification Milestone

<p align="center">
  <strong>First freeCodeCamp JavaScript Certification Project Completed</strong><br>
  <sub>Build a Markdown to HTML Converter — all automated tests passed.</sub>
</p>

Project ini menjadi Certification Project pertama yang saya selesaikan setelah mempelajari materi JavaScript dasar, DOM, array/object, debugging, accessibility, asynchronous JavaScript, dan Regular Expressions.

---

**Platform:** freeCodeCamp  
**Project:** Build a Markdown to HTML Converter  
**Language:** HTML, CSS, JavaScript  
**Focus:** Regular Expressions, DOM Manipulation, String Replacement, Live HTML Rendering
