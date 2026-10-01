# Catatan JavaScript DOM Manipulation & Event Handling

Catatan ini merangkum dasar-dasar **DOM Manipulation** dan **Event Handling** di JavaScript.

Fokus utamanya adalah memahami bagaimana JavaScript bisa:

```text
mengambil elemen HTML
↓
membaca / mengubah isi
↓
menambah / menghapus elemen
↓
mendengarkan aksi user
↓
mengubah tampilan halaman
```

---

## 1. DOM dan Web API

### API

API (**Application Programming Interface**) adalah sekumpulan aturan atau interface yang memungkinkan software berkomunikasi dan bertukar data.

Secara sederhana:

```text
program A
↓
API
↓
program / layanan B
```

### Web API

Web API adalah API yang digunakan di lingkungan web.

Secara umum bisa dibagi menjadi:

```text
Browser API
→ sudah disediakan browser

Third-Party API
→ berasal dari layanan luar
```

Contoh Browser API:

- DOM API
- `window`
- `navigator`
- Canvas API
- Web Animations API

Contoh Third-Party API:

```text
Google Maps API
```

---

## 2. DOM

DOM adalah singkatan dari:

```text
Document Object Model
```

DOM membuat HTML bisa dibaca dan dimanipulasi melalui JavaScript.

Contoh HTML:

```html
<body>
  <h1>Hello</h1>
  <p>Belajar JavaScript</p>
</body>
```

Bisa dibayangkan seperti tree:

```text
html
│
├── head
│
└── body
    │
    ├── h1
    └── p
```

Hubungan antar elemen:

```text
parent
↓
child
```

Contoh:

```html
<body>
  <p>Hello</p>
</body>
```

`body` adalah parent dari `p`.

---

## 3. `window` dan `navigator`

### `window`

`window` mewakili browser window yang sedang membuka halaman.

Contohnya bisa berhubungan dengan:

- ukuran browser
- navigasi
- URL
- timer
- dialog browser

### `navigator`

`navigator` berisi informasi tentang environment browser.

Contohnya:

- browser
- platform
- user agent

---

# Mengambil Elemen DOM

Ada tiga method yang sangat sering digunakan:

```text
getElementById()
querySelector()
querySelectorAll()
```

---

## 4. `getElementById()`

Digunakan untuk mengambil satu elemen berdasarkan `id`.

HTML:

```html
<div id="container"></div>
```

JavaScript:

```js
const container =
  document.getElementById("container");
```

Karena `id` harus unik, method ini hanya mengambil satu elemen.

Mental model:

```text
id
↓
getElementById()
↓
1 element
```

---

## 5. `querySelector()`

Digunakan untuk mengambil **elemen pertama** yang cocok dengan CSS selector.

HTML:

```html
<section class="section"></section>
```

JavaScript:

```js
const section =
  document.querySelector(".section");
```

Karena menggunakan CSS selector:

```text
class → .
id    → #
tag   → nama tag
```

Contoh:

```js
document.querySelector(".card");
document.querySelector("#title");
document.querySelector("button");
```

---

## 6. `querySelectorAll()`

Digunakan untuk mengambil semua elemen yang cocok dengan selector.

HTML:

```html
<ul class="ingredients">
  <li>Sugar</li>
  <li>Milk</li>
  <li>Eggs</li>
</ul>
```

JavaScript:

```js
const ingredients =
  document.querySelectorAll(
    "ul.ingredients li"
  );
```

Hasilnya adalah kumpulan elemen, biasanya berupa:

```text
NodeList
```

Karena berupa kumpulan, kita sering menggunakan:

```js
forEach()
```

Contoh:

```js
ingredients.forEach((item) => {
  console.log(item);
});
```

Mental model:

```text
querySelector()
→ satu elemen

querySelectorAll()
→ banyak elemen
→ NodeList
→ bisa forEach()
```

---

# Mengubah Isi DOM

---

## 7. `innerHTML`

`innerHTML` digunakan untuk membaca atau mengganti markup HTML di dalam sebuah elemen.

HTML:

```html
<div id="container"></div>
```

JavaScript:

```js
const container =
  document.getElementById("container");

container.innerHTML = `
  <ul>
    <li>Cheese</li>
    <li>Tomato</li>
  </ul>
`;
```

Hasilnya browser membuat elemen HTML baru di dalam container.

Pola yang sering digunakan:

```text
data
↓
map()
↓
template literal HTML
↓
join("")
↓
innerHTML
```

---

## 8. `createElement()`

Digunakan untuk membuat elemen HTML melalui JavaScript.

```js
const img =
  document.createElement("img");
```

Pada tahap ini elemen baru **belum masuk ke halaman**.

Kita baru membuat object DOM-nya.

Biasanya dilanjutkan dengan:

```js
appendChild()
```

---

## 9. `innerText`

`innerText` merepresentasikan teks yang terlihat oleh user.

HTML:

```html
<div id="container">
  <p>Hello, World!</p>
  <p>I'm learning JavaScript</p>
</div>
```

JavaScript:

```js
const container =
  document.getElementById("container");

console.log(container.innerText);
```

---

## 10. `textContent`

`textContent` digunakan untuk membaca atau mengubah plain text sebuah elemen.

Contoh:

```js
const title =
  document.querySelector("h1");

title.textContent =
  "Belajar DOM";
```

Pola yang sering dipakai:

```text
data JavaScript
↓
textContent
↓
teks HTML berubah
```

Contoh:

```js
scoreElement.textContent =
  playerScore;
```

---

# Menambah dan Menghapus Elemen

---

## 11. `appendChild()`

Digunakan untuk menambahkan node sebagai child dari parent.

HTML:

```html
<ul id="desserts">
  <li>Cake</li>
  <li>Pie</li>
</ul>
```

JavaScript:

```js
const dessertsList =
  document.getElementById("desserts");

const listItem =
  document.createElement("li");

listItem.textContent =
  "Cookies";

dessertsList.appendChild(listItem);
```

Alurnya:

```text
createElement()
↓
isi textContent
↓
appendChild()
↓
masuk DOM
```

---

## 12. `removeChild()`

Digunakan untuk menghapus child dari sebuah parent.

```js
const sectionEl =
  document.getElementById(
    "example-section"
  );

const lastParagraph =
  document.querySelector(
    "#example-section p:last-of-type"
  );

sectionEl.removeChild(
  lastParagraph
);
```

Mental model:

```text
parent
↓
removeChild(child)
↓
child dihapus
```

---

# Attribute

---

## 13. `setAttribute()`

Digunakan untuk menambah atau mengganti attribute sebuah elemen.

HTML:

```html
<p id="para">
  I am a paragraph
</p>
```

JavaScript:

```js
const para =
  document.getElementById("para");

para.setAttribute(
  "class",
  "my-class"
);
```

Kalau attribute sudah ada:

```text
nilainya diganti
```

Kalau belum ada:

```text
attribute baru dibuat
```

---

# Event Handling

---

## 14. Event Object

Event object berisi informasi tentang kejadian yang terjadi di halaman.

Contoh event:

```text
click
input
change
keydown
mouseover
```

Contoh:

```js
button.addEventListener(
  "click",
  (event) => {
    console.log(event.type);
  }
);
```

Hasil:

```text
click
```

Salah satu property yang sangat sering dipakai:

```js
event.target
```

Artinya:

```text
elemen yang memicu event
```

Contoh:

```js
selectEl.addEventListener(
  "change",
  (event) => {
    console.log(
      event.target.value
    );
  }
);
```

---

## 15. `addEventListener()`

Digunakan untuk mendengarkan sebuah event.

```js
const btn =
  document.getElementById("btn");

btn.addEventListener(
  "click",
  () => {
    alert("You clicked the button");
  }
);
```

Mental model:

```text
element
↓
addEventListener()
↓
tunggu event
↓
jalankan function
```

Contoh event yang sering dipakai:

```text
click
input
change
submit
mouseover
keydown
```

---

## 16. `removeEventListener()`

Digunakan untuk menghapus listener yang sebelumnya dipasang.

Contoh:

```js
function toggleBgColor() {
  // logic
}

btn.addEventListener(
  "click",
  toggleBgColor
);

btn.removeEventListener(
  "click",
  toggleBgColor
);
```

Hal penting:

Kita perlu memberikan **function reference yang sama**.

Karena itu:

```js
toggleBgColor
```

lebih mudah dihapus daripada callback anonymous yang tidak disimpan.

---

## 17. Inline Event Handler

Contoh:

```html
<button
  onclick="alert('Hello World!')"
>
  Show alert
</button>
```

Cara ini bisa bekerja, tetapi modern JavaScript lebih sering memakai:

```js
addEventListener()
```

karena HTML dan JavaScript menjadi lebih terpisah dan rapi.

---

# Event `change`

---

## 18. `change`

Event `change` digunakan ketika nilai sebuah input berubah dan perubahan tersebut dianggap selesai / dipilih.

Sering digunakan untuk:

- checkbox
- radio
- dropdown
- date picker

Contoh:

```html
<select class="language">
  <option value="">
    ---Select One---
  </option>
  <option value="JavaScript">
    JavaScript
  </option>
  <option value="Python">
    Python
  </option>
</select>

<p class="result"></p>
```

JavaScript:

```js
const selectEl =
  document.querySelector(
    ".language"
  );

const result =
  document.querySelector(
    ".result"
  );

selectEl.addEventListener(
  "change",
  (event) => {
    result.textContent =
      `You enjoy programming in ${event.target.value}.`;
  }
);
```

Alur:

```text
user pilih option
↓
change event
↓
event.target.value
↓
update textContent
```

---

## `input` vs `change`

Pola gampang:

```text
input
→ setiap isi berubah

change
→ pilihan / perubahan dikonfirmasi
```

Contoh character counter real-time lebih cocok memakai:

```js
"input"
```

Sedangkan dropdown filter lebih cocok memakai:

```js
"change"
```

---

# Event Bubbling

---

## 19. Event Bubbling

Event bubbling berarti event dari child dapat naik ke parent.

Contoh struktur:

```html
<div class="parent">
  <button class="child">
    Click
  </button>
</div>
```

Jika button diklik:

```text
button
↓
event terjadi
↓
event naik ke parent
```

Secara sederhana:

```text
child
→ parent
→ parent berikutnya
```

Ini disebut:

```text
event propagation
```

---

## 20. `stopPropagation()`

Digunakan untuk menghentikan event agar tidak terus bubbling ke parent.

```js
child.addEventListener(
  "click",
  (event) => {
    event.stopPropagation();
  }
);
```

Mental model:

```text
event dari child
↓
stopPropagation()
↓
jangan naik lagi
```

---

# Event Delegation

---

## 21. Event Delegation

Event delegation adalah pola memasang listener di parent daripada memasang listener satu per satu ke semua child.

Contoh mental model:

```text
parent
├── button
├── button
├── button
└── button
```

Daripada:

```text
4 child
→ 4 listener
```

bisa:

```text
1 parent
→ 1 listener
→ cek event.target
```

Contoh:

```js
container.addEventListener(
  "click",
  (event) => {
    console.log(event.target);
  }
);
```

Event delegation memanfaatkan:

```text
event bubbling
```

---

# DOMContentLoaded

---

## 22. `DOMContentLoaded`

Event ini berjalan setelah HTML selesai dimuat dan diparse.

```js
document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log(
      "HTML sudah siap"
    );
  }
);
```

Event ini tidak menunggu semua image atau stylesheet selesai dimuat.

Fokusnya:

```text
DOM sudah terbentuk
```

---

# Styling dari JavaScript

---

## 23. `Element.style`

Digunakan untuk membaca atau mengubah inline style.

```js
const paraEl =
  document.getElementById("para");

paraEl.style.color =
  "red";
```

Contoh yang sering digunakan:

```js
lightbox.style.display =
  "flex";

resetBtn.style.display =
  "none";
```

Mental model:

```text
JavaScript
↓
element.style.property
↓
inline CSS berubah
```

---

## 24. `classList`

`classList` digunakan untuk mengatur class pada elemen.

Method yang sering dipakai:

```text
add()
remove()
toggle()
contains()
```

Contoh:

```js
paraEl.classList.add(
  "highlight"
);
```

```js
paraEl.classList.remove(
  "blue-background"
);
```

```js
menu.classList.toggle(
  "show"
);
```

Perbedaan penting:

```js
document.querySelector(
  ".highlight"
);
```

butuh titik karena itu CSS selector.

Sedangkan:

```js
element.classList.add(
  "highlight"
);
```

tidak memakai titik karena kita memberikan nama class.

---

# Timer

---

## 25. `setTimeout()`

Digunakan untuk menjalankan sesuatu setelah waktu tertentu.

```js
setTimeout(() => {
  console.log(
    "This runs after 3 seconds"
  );
}, 3000);
```

`3000` berarti:

```text
3000 ms
= 3 detik
```

Pola:

```text
tunggu
↓
jalankan sekali
```

---

## 26. `setInterval()`

Digunakan untuk menjalankan sesuatu berulang pada interval waktu tertentu.

```js
setInterval(() => {
  console.log(
    "This runs every 2 seconds"
  );
}, 2000);
```

Pola:

```text
setInterval
↓
jalan
↓
tunggu
↓
jalan lagi
↓
ulang terus
```

---

## 27. `clearInterval()`

Digunakan untuk menghentikan interval.

```js
const intervalID =
  setInterval(() => {
    console.log("running");
  }, 1000);

setTimeout(() => {
  clearInterval(intervalID);
}, 5000);
```

Alurnya:

```text
interval jalan setiap 1 detik
↓
setelah 5 detik
↓
clearInterval()
↓
berhenti
```

---

# Animation

---

## 28. `requestAnimationFrame()`

Digunakan untuk menjadwalkan update animasi sebelum browser melakukan repaint berikutnya.

```js
function animate() {
  update();

  requestAnimationFrame(
    animate
  );
}
```

Pola:

```text
update frame
↓
requestAnimationFrame()
↓
browser siap repaint
↓
update frame berikutnya
```

Cocok untuk animasi JavaScript yang halus.

---

## 29. Web Animations API

Browser juga menyediakan API untuk membuat animasi langsung dari JavaScript.

Contoh:

```js
const square =
  document.querySelector(
    "#square"
  );

const animation =
  square.animate(
    [
      {
        transform:
          "translateX(0px)"
      },
      {
        transform:
          "translateX(100px)"
      }
    ],
    {
      duration: 2000,
      iterations: Infinity,
      direction: "alternate",
      easing: "ease-in-out"
    }
  );
```

Beberapa option:

```text
duration
→ lama animasi

iterations
→ jumlah pengulangan

direction
→ arah animasi

easing
→ pola percepatan
```

---

# Canvas API

---

## 30. `<canvas>`

Canvas adalah area gambar yang dapat dimanipulasi dengan JavaScript.

HTML:

```html
<canvas
  id="my-canvas"
  width="400"
  height="400"
></canvas>
```

JavaScript:

```js
const canvas =
  document.getElementById(
    "my-canvas"
  );

const ctx =
  canvas.getContext("2d");
```

`ctx` adalah drawing context.

Contoh:

```js
ctx.fillStyle =
  "crimson";

ctx.fillRect(
  1,
  1,
  150,
  100
);
```

Artinya:

```text
atur warna
↓
gambar rectangle
```

---

# Dialog dan Modal

---

## 31. `<dialog>`

HTML memiliki elemen bawaan:

```html
<dialog id="my-modal">
  <p>
    This is a modal dialog.
  </p>
</dialog>
```

Dialog dapat dibuka dan ditutup melalui JavaScript.

---

## 32. `showModal()`

Digunakan untuk membuka dialog sebagai modal.

```js
const dialog =
  document.getElementById(
    "my-modal"
  );

dialog.showModal();
```

Modal membuat user perlu berinteraksi dengan dialog terlebih dahulu sebelum kembali ke halaman utama.

---

## 33. `show()`

`show()` membuka dialog sebagai non-modal.

```js
dialog.show();
```

Artinya bagian lain dari halaman masih dapat digunakan.

---

## 34. `close()`

Digunakan untuk menutup dialog.

```js
dialog.close();
```

Contoh:

```js
openButton.addEventListener(
  "click",
  () => {
    dialog.showModal();
  }
);

closeButton.addEventListener(
  "click",
  () => {
    dialog.close();
  }
);
```

---

# Pola DOM yang Penting

Setelah mempelajari beberapa lab, pola yang sering muncul adalah:

```text
USER ACTION
↓
EVENT
↓
BACA DATA
↓
PROSES DATA
↓
UPDATE DOM
```

Contoh character counter:

```text
user mengetik
↓
input event
↓
textInput.value
↓
.length
↓
textContent
```

Contoh filter pemain:

```text
user pilih dropdown
↓
change event
↓
select.value
↓
filter()
↓
map()
↓
join()
↓
innerHTML
```

Contoh lightbox:

```text
user klik thumbnail
↓
click event
↓
item.src
↓
replace()
↓
lightboxImage.src
↓
display = flex
```

---

# Cheat Sheet — Mau Ngapain, Pakai Apa?

```text
Ambil elemen berdasarkan ID
→ getElementById()

Ambil elemen dengan CSS selector
→ querySelector()

Ambil banyak elemen
→ querySelectorAll()

Ulang banyak elemen
→ forEach()

Ubah plain text
→ textContent

Baca visible text
→ innerText

Masukkan markup HTML
→ innerHTML

Buat elemen baru
→ createElement()

Masukkan child
→ appendChild()

Hapus child
→ removeChild()

Ubah attribute
→ setAttribute()

Tunggu click
→ addEventListener("click", ...)

Perubahan input real-time
→ addEventListener("input", ...)

Dropdown berubah
→ addEventListener("change", ...)

Cari elemen yang memicu event
→ event.target

Hentikan bubbling
→ event.stopPropagation()

Ubah inline CSS
→ element.style

Tambah class
→ classList.add()

Hapus class
→ classList.remove()

Toggle class
→ classList.toggle()

Cek class
→ classList.contains()

Jalankan sekali setelah delay
→ setTimeout()

Jalankan berulang
→ setInterval()

Hentikan interval
→ clearInterval()

Animasi per frame
→ requestAnimationFrame()

Buka modal
→ showModal()

Buka dialog non-modal
→ show()

Tutup dialog
→ close()
```

---

# Yang Saya Pelajari

Dari materi ini saya belajar bahwa DOM bukan sekadar cara mengambil elemen HTML.

DOM adalah jembatan antara:

```text
HTML
↕
JavaScript
```

Dengan DOM, JavaScript bisa:

- membaca halaman
- mengubah teks
- membuat elemen
- menghapus elemen
- merespons aksi user
- mengubah class dan style
- membuka modal
- membuat animasi
- menggambar dengan Canvas

Pola yang ingin saya ingat:

```text
cari elemen
↓
pasang event
↓
baca data
↓
proses
↓
update DOM
```

---

## Catatan Pribadi

Hal yang paling sering membuat bingung bukan syntax-nya, tetapi menentukan:

```text
saya ingin melakukan apa?
↓
method apa yang cocok?
```

Karena itu lebih berguna mengingat method berdasarkan pekerjaan.

Contoh:

```text
mau cari satu elemen
→ querySelector()

mau cari banyak
→ querySelectorAll()

mau klik
→ addEventListener()

mau ambil value input
→ .value

mau ubah teks
→ textContent

mau render HTML
→ innerHTML

mau show / hide
→ style.display / classList

mau filter data
→ filter()

mau ubah data menjadi HTML
→ map()

mau gabung hasil map
→ join("")
```

Semakin sering membuat project DOM, pola tersebut akan semakin mudah dikenali.

---

**Platform:** freeCodeCamp  
**Topic:** DOM Manipulation and Event Handling  
**Language:** HTML, CSS, JavaScript
