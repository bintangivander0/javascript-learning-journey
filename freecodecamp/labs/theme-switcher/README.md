# Build a Theme Switcher

Ilustrasi:
<table align="center">
  <tr>
    <td>
      <img width="448" height="319" alt="image" src="https://github.com/user-attachments/assets/34916429-b748-4408-9794-44b3f6e73fd4" />
    </td>
    <td>
      <img width="449" height="320" alt="image" src="https://github.com/user-attachments/assets/4c3938e7-cfee-4055-be99-87eb76a5cce8" />
    </td>
  </tr>
</table>


Lab ini membuat **Theme Switcher** sederhana yang memungkinkan user mengganti tampilan halaman antara tema `light` dan `dark`.

Saat tombol **Switch Theme** diklik, menu pilihan theme akan dibuka atau ditutup. Ketika salah satu theme dipilih, JavaScript akan:

```text
mencari data theme
↓
mengubah class pada <body>
↓
CSS membaca class tersebut
↓
warna halaman berubah
↓
status message diperbarui
↓
aria-live mengumumkan perubahan
```

Project ini juga menjadi latihan penggunaan beberapa atribut accessibility seperti:

```text
aria-haspopup
aria-expanded
aria-controls
aria-labelledby
aria-live
role="menu"
role="menuitem"
hidden
```

---

## Struktur HTML

Struktur utama aplikasi:

```text
body
│
├── #theme-switcher-button
│
├── #theme-dropdown
│   ├── theme-light
│   └── theme-dark
│
└── #status
```

---

# Tombol Theme Switcher

```html
<button
  id="theme-switcher-button"
  aria-haspopup="true"
  aria-expanded="false"
  aria-controls="theme-dropdown"
>
  Switch Theme
</button>
```

Button ini merupakan kontrol utama untuk membuka dan menutup menu theme.

Ada beberapa atribut ARIA yang digunakan.

---

## `aria-haspopup`

```html
aria-haspopup="true"
```

Memberi tahu assistive technology bahwa button ini dapat membuka sebuah popup.

Dalam project ini popup tersebut adalah menu pilihan theme.

Mental model:

```text
aria-haspopup
→ "button ini punya popup"
```

---

## `aria-expanded`

```html
aria-expanded="false"
```

Menjelaskan apakah popup yang dikontrol button sedang terbuka atau tertutup.

Saat halaman pertama dibuka:

```text
false
→ menu tertutup
```

Ketika menu dibuka:

```text
true
→ menu terbuka
```

Jadi:

```text
aria-expanded
→ "sekarang terbuka atau tidak?"
```

Nilai ini nantinya diubah menggunakan JavaScript.

---

## `aria-controls`

```html
aria-controls="theme-dropdown"
```

Memberi tahu bahwa button ini mengontrol elemen dengan:

```html
id="theme-dropdown"
```

Hubungannya:

```text
BUTTON
aria-controls="theme-dropdown"
             │
             ▼
MENU
id="theme-dropdown"
```

Mental model:

```text
aria-controls
→ "elemen mana yang saya kontrol?"
```

---

# Dropdown Theme

```html
<ul
  id="theme-dropdown"
  role="menu"
  aria-labelledby="theme-switcher-button"
  hidden
>
```

Elemen `<ul>` digunakan sebagai container pilihan theme.

---

## `role="menu"`

```html
role="menu"
```

Memberikan informasi bahwa elemen tersebut berperan sebagai sebuah menu.

Di dalamnya terdapat:

```html
role="menuitem"
```

sebagai pilihan yang tersedia.

Strukturnya:

```text
role="menu"
│
├── role="menuitem"
└── role="menuitem"
```

---

## `aria-labelledby`

```html
aria-labelledby="theme-switcher-button"
```

Artinya nama dari menu ini berasal dari elemen:

```html
id="theme-switcher-button"
```

yaitu button:

```text
Switch Theme
```

Mental model:

```text
aria-labelledby
→ "siapa yang memberi saya nama?"
```

Jadi hubungan button dan menu dapat dibaca:

```text
BUTTON
→ mengontrol MENU
   lewat aria-controls

MENU
→ diberi nama oleh BUTTON
   lewat aria-labelledby
```

---

# Attribute `hidden`

Menu memiliki:

```html
hidden
```

sehingga pada awal halaman:

```text
dropdown tidak terlihat
```

JavaScript kemudian dapat mengubah property:

```js
themeDropdown.hidden
```

menjadi:

```text
true
→ sembunyi

false
→ tampil
```

---

# Menu Items

```html
<li
  id="theme-light"
  role="menuitem"
>
  light
</li>

<li
  id="theme-dark"
  role="menuitem"
>
  dark
</li>
```

Setiap pilihan memiliki:

```html
role="menuitem"
```

dan ID yang mengikuti nama theme:

```text
theme-light
theme-dark
```

Teks theme sengaja menggunakan lowercase:

```text
light
dark
```

supaya cocok dengan data JavaScript.

CSS nantinya menggunakan:

```css
text-transform: capitalize;
```

sehingga secara visual tetap ditampilkan sebagai:

```text
Light
Dark
```

---

# Status dan `aria-live`

```html
<p
  id="status"
  aria-live="polite"
></p>
```

Element ini digunakan untuk menampilkan pesan setelah theme berubah.

Contohnya:

```text
Dark theme is on!
```

Atribut:

```html
aria-live="polite"
```

membuat perubahan pesan tersebut dapat diumumkan oleh screen reader.

Nilai `polite` berarti perubahan perlu diberitahukan, tetapi tidak perlu langsung memotong informasi lain yang sedang dibacakan.

Mental model:

```text
JavaScript mengubah status
↓
aria-live="polite"
↓
screen reader diberi tahu
```

---

# Data Themes

JavaScript menyimpan data theme dalam array of objects:

```js
const themes = [
  {
    name: "light",
    message: "Light theme is on!"
  },
  {
    name: "dark",
    message: "Dark theme is on!"
  }
];
```

Setiap theme memiliki:

```text
name
message
```

Contoh:

```js
{
  name: "dark",
  message: "Dark theme is on!"
}
```

`name` digunakan untuk membuat class CSS.

Sedangkan `message` digunakan untuk mengisi status.

---

# Mengambil Element DOM

```js
const themeSwitcherButton =
  document.querySelector(
    "#theme-switcher-button"
  );

const themeDropdown =
  document.querySelector(
    "#theme-dropdown"
  );

const status =
  document.querySelector(
    "#status"
  );

const body =
  document.body;
```

Masing-masing mempunyai tugas:

```text
themeSwitcherButton
→ membuka / menutup menu

themeDropdown
→ menu theme

status
→ menampilkan message

body
→ menerima class theme
```

---

# Membuka dan Menutup Dropdown

```js
themeSwitcherButton.addEventListener(
  "click",
  () => {
    const isHidden =
      themeDropdown.hidden;

    themeDropdown.hidden =
      !isHidden;

    themeSwitcherButton.setAttribute(
      "aria-expanded",
      String(isHidden)
    );
  }
);
```

Ini bagian yang cukup penting karena kondisi visual dan ARIA harus tetap sinkron.

---

## Membaca Kondisi Menu

```js
const isHidden =
  themeDropdown.hidden;
```

Misalnya menu sedang tersembunyi:

```js
isHidden === true
```

---

## Membalik Nilai dengan `!`

```js
themeDropdown.hidden =
  !isHidden;
```

Operator:

```js
!
```

membalik boolean.

```text
!true
→ false

!false
→ true
```

Jadi:

```text
hidden = true
↓ klik
hidden = false
↓ klik
hidden = true
```

---

# Sinkronisasi `aria-expanded`

```js
themeSwitcherButton.setAttribute(
  "aria-expanded",
  String(isHidden)
);
```

Misalnya sebelum diklik:

```text
isHidden = true
```

Artinya menu sebelumnya tertutup.

Setelah:

```js
themeDropdown.hidden =
  !isHidden;
```

menu menjadi terbuka.

Kemudian:

```js
String(isHidden)
```

menghasilkan:

```text
"true"
```

sehingga:

```html
aria-expanded="true"
```

Hasil akhirnya:

```text
MENU TERBUKA

hidden = false
aria-expanded = true
```

Saat tombol diklik lagi:

```text
MENU TERTUTUP

hidden = true
aria-expanded = false
```

Ini contoh penting bahwa:

```text
hidden
→ mengubah keadaan sebenarnya

aria-expanded
→ menjelaskan keadaan tersebut
  kepada assistive technology
```

---

# Mengambil Semua Menu Item

```js
const themeMenuItems =
  document.querySelectorAll(
    '[role="menuitem"]'
  );
```

Selector:

```css
[role="menuitem"]
```

merupakan **attribute selector**.

Artinya:

```text
ambil semua element
yang memiliki
role="menuitem"
```

Karena hasilnya berupa kumpulan elemen, digunakan:

```js
forEach()
```

---

# Event pada Setiap Theme

```js
themeMenuItems.forEach((item) => {
  item.addEventListener(
    "click",
    () => {

    }
  );
});
```

Jika ada dua theme:

```text
light
dark
```

masing-masing mendapat click listener.

---

# Membaca Theme yang Dipilih

```js
const selectedTheme =
  item.textContent.trim();
```

`textContent` membaca teks dari menu item.

Contohnya:

```text
dark
```

Sedangkan:

```js
trim()
```

menghapus whitespace atau line break yang mungkin ikut terbaca dari HTML.

Contoh:

```text
"\n  dark\n"
```

menjadi:

```text
"dark"
```

---

# Mencari Data Theme dengan `find()`

Setelah mendapat nama theme:

```js
selectedTheme
```

program mencari object yang sesuai:

```js
const selectedThemeData =
  themes.find((theme) => {
    return (
      theme.name === selectedTheme
    );
  });
```

Misalnya:

```text
selectedTheme = "dark"
```

`find()` mengecek:

```text
light === dark
→ false

dark === dark
→ true
```

kemudian mengembalikan:

```js
{
  name: "dark",
  message: "Dark theme is on!"
}
```

---

## `find()` vs `filter()`

Perbedaannya:

```text
find()
→ mencari SATU item yang cocok

filter()
→ mencari SEMUA item yang cocok
  dan menghasilkan array
```

Pada project ini hanya ada satu theme dengan nama `dark`, sehingga:

```js
find()
```

lebih cocok.

---

# Mengubah Theme pada `<body>`

Setelah object theme ditemukan:

```js
body.className =
  `theme-${selectedThemeData.name}`;
```

Jika:

```js
selectedThemeData.name
```

berisi:

```text
dark
```

maka hasilnya:

```html
<body class="theme-dark">
```

Sedangkan jika memilih light:

```html
<body class="theme-light">
```

---

## Kenapa Menggunakan `className`?

```js
body.className =
  `theme-${selectedThemeData.name}`;
```

akan **mengganti class body** dengan theme terbaru.

Jadi:

```text
theme-light
↓ pilih dark
theme-dark
```

Bukan:

```text
theme-light theme-dark
```

Pada project sederhana ini hal tersebut cocok karena class pada `<body>` memang digunakan untuk theme.

---

# Mengubah Status Message

```js
status.textContent =
  selectedThemeData.message;
```

Jika theme yang dipilih:

```js
{
  name: "dark",
  message: "Dark theme is on!"
}
```

maka halaman menampilkan:

```text
Dark theme is on!
```

Karena `#status` memiliki:

```html
aria-live="polite"
```

perubahan tersebut juga dapat diberitahukan kepada pengguna screen reader.

---

# Alur Pergantian Theme

```text
USER KLIK "dark"
↓
item.textContent
↓
trim()
↓
"dark"
↓
themes.find()
↓
object dark ditemukan
↓
selectedThemeData.name
↓
body.className = "theme-dark"
↓
CSS theme-dark aktif
↓
warna halaman berubah
↓
selectedThemeData.message
↓
status.textContent
↓
aria-live="polite"
```

---

# CSS Variables

CSS menggunakan custom properties:

```css
:root {
  --bg-color: #f4f7fb;
  --surface-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #cbd5e1;
  --accent-color: #8299cb;
  --hover-color: #e2e8f0;
}
```

Variable tersebut kemudian digunakan seperti:

```css
background-color:
  var(--bg-color);

color:
  var(--text-color);
```

Mental model:

```text
--bg-color
→ menyimpan value

var(--bg-color)
→ menggunakan value
```

---

# Theme Light dan Dark

Theme light:

```css
body.theme-light {
  --bg-color: #f4f7fb;
  --surface-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #cbd5e1;
  --accent-color: #8299cb;
  --hover-color: #e2e8f0;
}
```

Theme dark:

```css
body.theme-dark {
  --bg-color: #111827;
  --surface-color: #1f2937;
  --text-color: #f9fafb;
  --border-color: #475569;
  --accent-color: #8299cb;
  --hover-color: #334155;
}
```

JavaScript tidak perlu mengubah semua warna satu per satu.

Cukup mengubah:

```text
class body
```

Kemudian CSS variables menyesuaikan tampilan.

---

# Hubungan JavaScript dan CSS

JavaScript:

```js
body.className =
  "theme-dark";
```

CSS:

```css
body.theme-dark {
  --bg-color: #111827;
  --text-color: #f9fafb;
}
```

Lalu `body` menggunakan:

```css
background-color:
  var(--bg-color);

color:
  var(--text-color);
```

Alurnya:

```text
JavaScript
↓
ubah class
↓
CSS selector aktif
↓
CSS variables berubah
↓
tampilan berubah
```

Jadi pembagian tugasnya:

```text
JavaScript
→ behavior dan state

CSS
→ visual / tampilan
```

---

# Flexbox pada Body

```css
body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

`display: flex` membuat body menjadi flex container.

Karena:

```css
flex-direction: column;
```

elemen disusun vertikal:

```text
Switch Theme
↓
Dropdown
↓
Status
```

Sedangkan:

```css
align-items: center;
```

menempatkan elemen di tengah secara horizontal.

---

# `100vh`

```css
min-height: 100vh;
```

`vh` berarti **viewport height**.

```text
100vh
→ setinggi viewport browser
```

Ini membuat background theme memenuhi seluruh layar.

---

# Transition

Body menggunakan:

```css
transition:
  background-color 0.3s ease,
  color 0.3s ease;
```

Ketika theme berubah:

```text
warna lama
↓
transisi 0.3 detik
↓
warna baru
```

sehingga pergantian theme terlihat lebih halus.

---

# Hover dan Transform

Button:

```css
#theme-switcher-button:hover {
  background-color:
    var(--hover-color);

  transform:
    translateY(-2px);
}
```

Saat mouse berada di atas button:

```text
warna berubah
+
button naik 2px
```

Memberikan feedback visual kepada user.

---

# `focus-visible`

```css
#theme-switcher-button:focus-visible {
  outline:
    3px solid var(--accent-color);

  outline-offset: 3px;
}
```

`focus-visible` membantu user keyboard mengetahui elemen mana yang sedang mendapat focus.

Ini penting untuk accessibility.

---

# Styling Berdasarkan ARIA Role

CSS juga menggunakan:

```css
#theme-dropdown
[role="menuitem"]
```

Artinya:

```text
di dalam #theme-dropdown
↓
cari elemen
role="menuitem"
```

Jadi ARIA role tidak hanya digunakan oleh assistive technology, tetapi juga dapat dipakai sebagai CSS selector.

---

# Attribute `[hidden]`

```css
[hidden] {
  display: none;
}
```

Selector tersebut memilih semua elemen yang memiliki attribute:

```html
hidden
```

Jadi ketika JavaScript membuat:

```js
themeDropdown.hidden = true;
```

menu mendapat kondisi hidden dan CSS memastikan elemen tidak ditampilkan.

---

# Hubungan ARIA pada Project Ini

Cara mudah mengingatnya:

```text
aria-haspopup
→ "punya popup?"

aria-expanded
→ "popup sedang terbuka?"

aria-controls
→ "mengontrol elemen mana?"

aria-labelledby
→ "diberi nama oleh elemen mana?"

aria-live
→ "kalau isi berubah,
   perlu diumumkan?"
```

Dalam project:

```text
BUTTON
│
├── aria-haspopup
├── aria-expanded
└── aria-controls
        │
        ▼
      MENU
        │
        ├── aria-labelledby
        └── menuitem
```

Kemudian:

```text
STATUS
└── aria-live="polite"
```

---

# Alur Program Keseluruhan

```text
HALAMAN DIBUKA
↓
dropdown hidden
↓
aria-expanded = false
↓

USER KLIK SWITCH THEME
↓
baca .hidden
↓
balik boolean
↓
update hidden
↓
update aria-expanded
↓

USER KLIK THEME
↓
ambil textContent
↓
trim()
↓
find() data theme
↓
ubah body.className
↓
CSS variables berubah
↓
tampilan berubah
↓
ambil message
↓
status.textContent
↓
aria-live mengumumkan perubahan
```

---

# Yang Saya Pelajari

Dari lab ini saya belajar:

- Array of objects.
- `find()`.
- `textContent`.
- `trim()`.
- `querySelector()`.
- `querySelectorAll()`.
- `forEach()`.
- `addEventListener()`.
- `document.body`.
- Property `.hidden`.
- Operator `!`.
- `setAttribute()`.
- `className`.
- Template literal.
- CSS Custom Properties.
- `var()`.
- Flexbox.
- `100vh`.
- `transition`.
- `transform`.
- `focus-visible`.
- CSS attribute selector.
- `aria-haspopup`.
- `aria-expanded`.
- `aria-controls`.
- `aria-labelledby`.
- `aria-live`.
- `role="menu"`.
- `role="menuitem"`.
- Menjaga tampilan dan accessibility state tetap sinkron.

---

## Catatan Pribadi

Bagian penting dari lab ini adalah mulai memahami bahwa ARIA tidak melakukan perubahan UI secara langsung.

Contohnya:

```html
aria-expanded="true"
```

tidak membuka menu.

Yang benar-benar membuka menu adalah:

```js
themeDropdown.hidden = false;
```

Sedangkan:

```html
aria-expanded="true"
```

memberi tahu assistive technology bahwa menu sekarang terbuka.

Jadi:

```text
HTML / JavaScript
→ mengatur kondisi sebenarnya

ARIA
→ menjelaskan kondisi tersebut
```

Begitu juga dengan theme:

```text
JavaScript
→ mengganti class body

CSS
→ menentukan tampilan theme

aria-live
→ mengumumkan perubahan status
```

Pola aplikasi yang ingin saya ingat:

```text
USER ACTION
↓
EVENT
↓
READ STATE
↓
UPDATE STATE
↓
UPDATE DOM
↓
SYNC ACCESSIBILITY
```

Dan pola theme switcher:

```text
theme data
↓
find()
↓
body class
↓
CSS variables
↓
visual theme

       +

theme message
↓
status
↓
aria-live
```

---

## Catatan Debugging

Pada kode selama pengerjaan terdapat:

```js
console.log(themes);
console.log(selectedTheme);
console.log(selectedThemeData);
```

`console.log()` tersebut berguna untuk melihat alur data ketika belajar dan debugging.

Setelah aplikasi sudah selesai, log tersebut boleh dihapus karena tidak diperlukan untuk functionality utama.

---

**Platform:** freeCodeCamp  
**Lab:** Build a Theme Switcher  
**Language:** HTML, CSS, JavaScript  
**Topic:** DOM, Events, Accessibility, ARIA, CSS Variables, Theme Switching
