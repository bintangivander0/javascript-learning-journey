# JavaScript and Accessibility Review

## Common ARIA Accessibility Attributes

- **`aria-expanded` attribute**: Digunakan untuk memberi tahu pengguna screen reader apakah sebuah kontrol yang bisa dibuka/tutup sedang dalam keadaan **terbuka (`true`)** atau **tertutup (`false`)**.

  Yang penting: `aria-expanded` **tidak membuka atau menutup elemen secara langsung**. Atribut ini hanya menjelaskan kondisi UI kepada assistive technology. JavaScript tetap harus mengubah keadaan sebenarnya, misalnya dengan `hidden`, class CSS, atau property lain.

```html
<button id="menuBtn" aria-expanded="false">Menu</button>

<script>
  const btn = document.getElementById("menuBtn");

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
  });
</script>
```

Cara membaca bagian ini:

```text
aria-expanded="false"
→ menu dianggap sedang tertutup

klik button
↓
getAttribute("aria-expanded")
↓
cek apakah nilainya "true"
↓
!expanded
↓
balik kondisinya
↓
setAttribute()
```

Perhatikan:

```js
btn.getAttribute("aria-expanded")
```

menghasilkan **string**, yaitu:

```text
"true"
atau
"false"
```

Karena itu dibandingkan dengan:

```js
=== "true"
```

---

- **`aria-haspopup` attribute**: Digunakan untuk memberi tahu bahwa sebuah elemen interaktif akan membuka suatu **popup** ketika diaktifkan.

  Popup yang dimaksud ARIA di sini bukan sembarang elemen yang muncul. `aria-haspopup` digunakan ketika popup tersebut memiliki role:

```text
menu
listbox
tree
grid
dialog
```

Nilainya bisa berupa salah satu role tersebut atau:

```html
aria-haspopup="true"
```

Nilai `"true"` dianggap sama seperti:

```html
aria-haspopup="menu"
```

Contohnya:

```html
<button
  id="menubutton"
  aria-haspopup="menu"
  aria-controls="filemenu"
  aria-expanded="false"
>
  File
</button>

<ul
  id="filemenu"
  role="menu"
  aria-labelledby="menubutton"
  hidden
>
  <li role="menuitem" tabindex="-1">Open</li>
  <li role="menuitem" tabindex="-1">New</li>
  <li role="menuitem" tabindex="-1">Save</li>
  <li role="menuitem" tabindex="-1">Delete</li>
</ul>

<script>
  const button = document.getElementById("menubutton");
  const menu = document.getElementById("filemenu");

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });
</script>
```

Di contoh ini beberapa atribut bekerja bersama:

```text
aria-haspopup="menu"
→ button akan membuka popup berupa menu

aria-controls="filemenu"
→ button mengontrol element id="filemenu"

aria-expanded="false"
→ menu awalnya tertutup

hidden
→ menu benar-benar tidak ditampilkan
```

Hubungannya:

```text
BUTTON
aria-controls="filemenu"
        │
        ▼
MENU
id="filemenu"
```

Saat button diklik:

```text
expanded = false

aria-expanded
→ true

menu.hidden
→ false
```

Menu terlihat dan informasi accessibility ikut diperbarui.

Jadi mudahnya:

```text
aria-haspopup
→ "akan membuka apa?"

aria-expanded
→ "sekarang terbuka atau tidak?"

aria-controls
→ "mengontrol elemen mana?"
```

---

- **`aria-checked` attribute**: Digunakan untuk menunjukkan apakah sebuah custom control sedang dalam keadaan **dicentang / aktif**.

  Atribut ini sering digunakan untuk custom:

```text
checkbox
radio button
switch
listbox option tertentu
```

Untuk checkbox HTML biasa seperti:

```html
<input type="checkbox">
```

browser sudah memiliki state `checked` bawaan. `aria-checked` terutama penting ketika kita membuat kontrol sendiri menggunakan elemen seperti `<div>`.

```html
<div
  id="checkbox"
  role="checkbox"
  aria-checked="true"
  tabindex="0"
  style="
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  "
>
  <span
    id="box"
    aria-hidden="true"
    style="
      width: 16px;
      height: 16px;
      border: 2px solid blue;
      background: blue;
      display: inline-block;
    "
  ></span>
  Checkbox
</div>

<script>
  const checkbox = document.getElementById("checkbox");
  const box = document.getElementById("box");

  const toggle = () => {
    const checked = checkbox.getAttribute("aria-checked") === "true";
    checkbox.setAttribute("aria-checked", String(!checked));
    box.style.background = checked ? "white" : "black";
  };

  checkbox.addEventListener("click", toggle);

  checkbox.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  });
</script>
```

Bagian:

```html
role="checkbox"
```

memberi tahu bahwa `<div>` tersebut berfungsi sebagai checkbox.

Sedangkan:

```html
aria-checked="true"
```

memberi tahu state-nya:

```text
true
→ checked

false
→ unchecked
```

`tabindex="0"` membuat custom control tersebut dapat menerima keyboard focus.

Kemudian JavaScript juga menyediakan dukungan keyboard:

```js
if (e.key === " " || e.key === "Enter")
```

karena custom `<div>` tidak otomatis memiliki perilaku keyboard seperti checkbox native.

Bagian:

```html
aria-hidden="true"
```

pada `<span>` berarti bagian visual kotak tersebut tidak perlu dibacakan oleh screen reader, karena informasi pentingnya sudah diberikan oleh:

```text
role="checkbox"
+
aria-checked
```

---

- **`aria-disabled` attribute**: Digunakan untuk memberi tahu assistive technology bahwa sebuah elemen berada dalam kondisi **disabled / tidak tersedia untuk digunakan**.

  Perbedaan penting: `aria-disabled="true"` **tidak benar-benar menonaktifkan elemen** seperti attribute HTML `disabled`.

```html
<div
  id="editBtn"
  role="button"
  tabindex="-1"
  aria-disabled="true"
  style="opacity: 0.5; cursor: not-allowed;"
>
  Edit
</div>

<button id="toggle">Toggle Disabled</button>

<script>
  const editBtn = document.getElementById("editBtn");
  const toggleBtn = document.getElementById("toggle");

  toggleBtn.addEventListener("click", () => {
    const disabled = editBtn.getAttribute("aria-disabled") === "true";

    editBtn.setAttribute("aria-disabled", String(!disabled));
    editBtn.tabIndex = disabled ? 0 : -1;
    editBtn.style.opacity = disabled ? "1" : "0.5";
    editBtn.style.cursor = disabled ? "pointer" : "not-allowed";
  });
</script>
```

Di sini:

```text
aria-disabled
→ informasi accessibility

opacity
→ tampilan visual

cursor
→ feedback visual

tabIndex
→ apakah elemen masuk urutan keyboard focus
```

Perhatikan ternary:

```js
editBtn.tabIndex = disabled ? 0 : -1;
```

Jika sebelumnya:

```text
disabled = true
```

berarti sekarang kontrol sedang diaktifkan kembali, maka:

```text
tabIndex = 0
opacity = 1
cursor = pointer
```

Jika sebelumnya aktif:

```text
disabled = false
```

maka sekarang dibuat disabled:

```text
tabIndex = -1
opacity = 0.5
cursor = not-allowed
```

Mental model:

```text
aria-disabled
→ "kontrol ini tersedia atau tidak?"
```

Tetapi developer tetap harus mengatur behavior yang sebenarnya.

---

- **`aria-selected` attribute**: Digunakan untuk menunjukkan item mana yang sedang **dipilih** pada custom control seperti tab, listbox, atau grid.

```html
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
  <button role="tab" aria-selected="false">Tab 3</button>
</div>

<script>
  const tabs = document.querySelectorAll('[role="tab"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
    });
  });
</script>
```

Pada keadaan awal:

```text
Tab 1 → true
Tab 2 → false
Tab 3 → false
```

Saat Tab 2 diklik, pola yang digunakan adalah:

```text
reset semua tab
aria-selected = false
↓
tab yang diklik
aria-selected = true
```

Jadi hanya satu tab yang dianggap terpilih.

Mental model:

```text
aria-selected
→ "yang mana yang sedang dipilih?"
```

Jangan tertukar dengan:

```text
aria-expanded
→ "terbuka atau tertutup?"
```

Contoh:

```text
Tab aktif
→ aria-selected

Dropdown terbuka
→ aria-expanded
```

---

- **`aria-controls` attribute**: Digunakan untuk menghubungkan suatu elemen dengan elemen lain yang **dikontrol olehnya**.

  Nilai `aria-controls` adalah **ID dari elemen yang dikontrol**.

```html
<div role="tablist">
  <button 
    role="tab"
    id="tab1"
    aria-controls="section1"
    aria-selected="true"
  >
    Tab 1
  </button>
  <button
    role="tab"
    id="tab2"
    aria-controls="section2"
    aria-selected="false"
  >
    Tab 2
  </button>
  <button
    role="tab"
    id="tab3"
    aria-controls="section3"
    aria-selected="false"
  >
    Tab 3
  </button>
</div>
```

Contoh:

```html
aria-controls="section1"
```

berarti:

```text
button ini mengontrol
↓
element dengan
id="section1"
```

Hubungannya:

```text
Tab 1
aria-controls="section1"
           │
           ▼
<section id="section1">
```

Cara mengingat:

```text
aria-controls
→ "saya mengontrol siapa?"
```

Pada JavaScript, nilai tersebut juga bisa dibaca:

```js
const panelId =
  tab.getAttribute("aria-controls");

const panel =
  document.getElementById(panelId);
```

Jadi ARIA relationship juga dapat dimanfaatkan untuk mencari elemen yang berhubungan.

---

- **`hidden` attribute**: Digunakan untuk menyembunyikan elemen yang sedang tidak aktif.

```html
<div id="panel1">
  Visible panel
</div>

<div id="panel2" hidden>
  Hidden panel
</div>
```

`hidden` bukan atribut ARIA, tetapi sangat sering dipakai bersama ARIA.

Contohnya pada tab:

```text
TAB AKTIF
aria-selected="true"
↓
PANEL
tidak punya hidden
```

Sedangkan:

```text
TAB TIDAK AKTIF
aria-selected="false"
↓
PANEL
hidden
```

JavaScript dapat mengaturnya lewat:

```js
panel.hidden = true;
```

atau:

```js
panel.hidden = false;
```

Mental model:

```text
hidden
→ kondisi nyata elemen terlihat / tidak

ARIA
→ menjelaskan keadaan dan hubungan UI
```

---

## Working with Live Regions and Dynamic Content

- **`aria-live` attribute**: Membuat suatu bagian halaman menjadi **live region**.

  Live region adalah area yang isinya bisa berubah secara dinamis dan perubahan tersebut dapat diumumkan oleh screen reader tanpa user harus memindahkan focus ke area tersebut.

Contohnya:

```text
upload berhasil
score berubah
status proses berubah
pesan konfirmasi muncul
```

Tanpa live region, user screen reader mungkin tidak mengetahui bahwa isi halaman berubah di tempat lain.

- **`polite` value**: Digunakan jika perubahan tersebut penting untuk diketahui tetapi **tidak darurat**.

```html
aria-live="polite"
```

berarti kira-kira:

```text
"Beritahu user tentang perubahan ini,
tetapi jangan memotong pengumuman
yang sedang berlangsung."
```

Sebagian besar status biasa cocok menggunakan:

```text
polite
```

Berbeda dengan:

```text
assertive
```

yang digunakan untuk informasi sangat penting atau mendesak dan dapat memotong pengumuman screen reader yang sedang berlangsung.

Here is an example of a live region that is dynamically updated by JavaScript:

```html
<div aria-live="polite" id="status"></div>

<button id="updateStatus">Update Status</button>

<script>
  const statusEl = document.getElementById("status");
  const btn = document.getElementById("updateStatus");

  btn.addEventListener("click", () => {
    statusEl.textContent = "Your file has been successfully uploaded.";
  });
</script>
```

Alurnya:

```text
user klik button
↓
JavaScript mengubah textContent
↓
#status berubah
↓
aria-live="polite"
↓
screen reader dapat mengumumkan:
"Your file has been successfully uploaded."
```

Yang melakukan perubahan tetap:

```js
statusEl.textContent = ...
```

Sedangkan:

```html
aria-live="polite"
```

memberikan informasi kepada assistive technology bahwa perubahan tersebut perlu diumumkan.

---

- **`contenteditable` attribute**: Membuat sebuah elemen HTML dapat diedit langsung oleh user seperti area input teks.

```html
<div
  contenteditable="true"
  aria-label="Note editor"
  id="editor"
  style="border: 1px solid #ccc; padding: 8px;"
>
  Editable content goes here
</div>

<p id="status" aria-live="polite"></p>

<script>
  const editor = document.getElementById("editor");
  const status = document.getElementById("status");

  editor.addEventListener("input", () => {
    status.textContent = "Content updated";
  });
</script>
```

Secara default:

```html
<div>
```

tidak bisa diketik.

Tetapi:

```html
contenteditable="true"
```

membuat user dapat:

```text
klik
↓
cursor muncul
↓
edit isi
```

Karena `<div>` tidak memiliki label bawaan seperti form control tertentu, digunakan:

```html
aria-label="Note editor"
```

agar screen reader mengetahui tujuan area tersebut.

Mental model:

```text
contenteditable
→ "elemen ini bisa diedit"

aria-label
→ "nama / tujuan elemen ini apa?"

aria-live
→ "kalau status berubah, perlu diumumkan"
```

Pada contoh JavaScript:

```js
editor.addEventListener("input", ...)
```

event `input` terjadi setiap kali isi editable region berubah.

---

## `focus` and `blur` Events

- **`blur` event**: Terjadi ketika sebuah elemen **kehilangan focus**.

```html
<input
  id="nameInput"
  type="text"
  placeholder="Type here and click outside"
  aria-label="Name input"
/>

<p id="status" aria-live="polite"></p>

<script>
  const input = document.getElementById("nameInput");
  const status = document.getElementById("status");

  input.addEventListener("blur", () => {
    status.textContent = "Input lost focus";
  });
</script>
```

Contohnya:

```text
user klik input
↓
input mendapat focus
↓
user mengetik
↓
user klik di luar input
↓
input kehilangan focus
↓
blur event
```

Jadi cara mengingat:

```text
blur
→ KELUAR dari elemen
```

Event ini berguna misalnya untuk:

```text
validasi setelah user selesai mengetik
save note setelah user keluar dari editor
menampilkan pesan status
```

---

- **`focus` event**: Terjadi ketika sebuah elemen **mendapat focus**.

```html
<input
  id="emailInput"
  type="email"
  placeholder="Click or tab into this field"
  aria-label="Email input"
/>

<p id="status" aria-live="polite"></p>

<script>
  const input = document.getElementById("emailInput");
  const status = document.getElementById("status");

  input.addEventListener("focus", () => {
    status.textContent = "Input received focus";
  });
</script>
```

Focus bisa diperoleh melalui:

```text
mouse click
atau
keyboard Tab
```

Cara mengingat:

```text
focus
→ MASUK ke elemen

blur
→ KELUAR dari elemen
```

Contoh alurnya:

```text
Tab menuju input
↓
focus

ketik sesuatu
↓

Tab ke elemen berikutnya
↓
blur
```

---

## Ringkasan Mental Sebelum Final Test

Kalau mulai ketuker atribut ARIA, jangan hafal namanya sebagai daftar panjang. Tanyakan fungsi UI-nya.

```text
Apakah popup terbuka?
→ aria-expanded

Apakah elemen akan membuka popup?
→ aria-haspopup

Elemen ini mengontrol siapa?
→ aria-controls

Item mana yang dipilih?
→ aria-selected

Custom checkbox sedang dicentang?
→ aria-checked

Kontrol sedang disabled?
→ aria-disabled

Kalau teks berubah, perlu diumumkan?
→ aria-live

Elemen perlu nama yang bisa dibaca screen reader?
→ aria-label

Elemen sedang tidak dipakai / tidak terlihat?
→ hidden
```

Pola besar yang paling penting:

```text
JavaScript
→ mengubah kondisi sebenarnya

ARIA
→ menjelaskan kondisi tersebut
  kepada assistive technology
```

Contoh:

```text
themeDropdown.hidden = false
→ menu benar-benar terbuka

aria-expanded="true"
→ screen reader tahu menu terbuka
```

Atau:

```text
panel.hidden = false
→ panel benar-benar tampil

aria-selected="true"
→ screen reader tahu tab tersebut dipilih
```

Dan untuk konten dinamis:

```text
JavaScript mengubah textContent
↓
aria-live
↓
screen reader mengetahui perubahan
```

Kalau pola ini sudah kebayang, atribut ARIA jadi lebih gampang dibedakan karena masing-masing sebenarnya menjawab **pertanyaan yang berbeda tentang keadaan UI**.
