# Build a Planets Tablist

Ilustrasi:

<table align="center">
  <tr>
    <td>
      <img width="461" height="290" alt="image" src="https://github.com/user-attachments/assets/bd50eb45-150a-4880-9e71-577789aae390" />
    </td>
    <td>
      <img width="460" height="316" alt="image" src="https://github.com/user-attachments/assets/9d18ecea-4a2a-48ef-8548-787404e8a575" />
    </td>
  </tr>
</table>

Workshop ini membuat **tablist planet** yang menampilkan informasi Earth, Saturn, dan Mars.

Saat salah satu tab diklik:

```text
tab tersebut menjadi aktif
↓
aria-selected berubah menjadi true
↓
panel yang berhubungan dengan tab dicari
↓
panel tersebut ditampilkan
↓
panel lainnya disembunyikan
```

Project ini juga menjadi latihan penggunaan ARIA pada interface tab, terutama:

```text
role="tablist"
role="tab"
role="tabpanel"

aria-labelledby
aria-controls
aria-selected

hidden
```

---

## Struktur Utama

HTML secara sederhana memiliki struktur:

```text
.tabs
│
├── #tabs-title
│
├── tablist
│   ├── Earth tab
│   ├── Saturn tab
│   └── Mars tab
│
├── Earth panel
├── Saturn panel
└── Mars panel
```

Bagian pentingnya adalah **tab dan panel tidak berdiri sendiri**.

Mereka dihubungkan menggunakan ID dan atribut ARIA.

---

# `role="tablist"`

Container tombol menggunakan:

```html
<div
  role="tablist"
  aria-labelledby="tabs-title"
>
```

`role="tablist"` memberi tahu assistive technology bahwa elemen ini merupakan container dari sekumpulan tab.

Jadi:

```text
tablist
├── tab Earth
├── tab Saturn
└── tab Mars
```

---

# `aria-labelledby` pada Tablist

Judulnya:

```html
<h2 id="tabs-title">
  Planets
</h2>
```

Kemudian tablist menggunakan:

```html
aria-labelledby="tabs-title"
```

Artinya:

```text
tablist ini diberi nama oleh
↓
element id="tabs-title"
↓
"Planets"
```

Jadi `aria-labelledby` menunjuk ke **ID elemen yang menjadi label atau nama**.

Mental model:

```text
aria-labelledby
→ "siapa yang memberi saya nama?"
```

---

# `role="tab"`

Setiap button menggunakan:

```html
role="tab"
```

Contoh:

```html
<button
  role="tab"
  aria-controls="panel-earth"
  aria-selected="true"
  id="tab-earth"
>
  🌍 Earth
</button>
```

Button tetap merupakan elemen `<button>`, tetapi `role="tab"` memberi tahu assistive technology bahwa button tersebut berfungsi sebagai sebuah tab.

---

# `aria-selected`

Contoh tab Earth:

```html
aria-selected="true"
```

Sedangkan Saturn:

```html
aria-selected="false"
```

dan Mars:

```html
aria-selected="false"
```

Artinya saat halaman pertama kali dibuka:

```text
Earth
→ sedang dipilih

Saturn
→ tidak dipilih

Mars
→ tidak dipilih
```

Mental model:

```text
aria-selected
→ "apakah item ini sedang dipilih?"
```

Nilainya:

```text
true
false
```

---

# `aria-controls`

Tab Earth memiliki:

```html
aria-controls="panel-earth"
```

Sedangkan panel Earth memiliki:

```html
<div id="panel-earth">
```

Hubungannya:

```text
TAB EARTH
aria-controls="panel-earth"
            │
            ▼
PANEL EARTH
id="panel-earth"
```

Begitu juga Saturn:

```text
aria-controls="panel-saturn"
↓
id="panel-saturn"
```

dan Mars:

```text
aria-controls="panel-mars"
↓
id="panel-mars"
```

Mental model:

```text
aria-controls
→ "elemen mana yang saya kontrol?"
```

Nilainya harus cocok dengan:

```html
id="..."
```

pada elemen yang dikontrol.

---

# `role="tabpanel"`

Setiap bagian isi menggunakan:

```html
role="tabpanel"
```

Contoh:

```html
<div
  id="panel-earth"
  role="tabpanel"
  aria-labelledby="tab-earth"
>
```

Artinya elemen tersebut merupakan **panel isi dari sebuah tab**.

---

# `aria-labelledby` pada Panel

Panel Earth memiliki:

```html
aria-labelledby="tab-earth"
```

Sedangkan tab Earth memiliki:

```html
id="tab-earth"
```

Hubungannya:

```text
TAB EARTH
id="tab-earth"
      ▲
      │
aria-labelledby="tab-earth"
PANEL EARTH
```

Jadi jika:

```text
aria-controls
```

dibaca:

```text
"apa yang tab ini kontrol?"
```

maka:

```text
aria-labelledby
```

dibaca:

```text
"siapa yang memberi panel ini nama?"
```

---

# Hubungan Tab dan Panel

Contoh lengkap Earth:

```text
TAB
id="tab-earth"
aria-controls="panel-earth"
aria-selected="true"

        ⇅

PANEL
id="panel-earth"
aria-labelledby="tab-earth"
```

Jadi hubungan mereka dua arah secara makna:

```text
tab
→ mengontrol panel

panel
→ diberi nama oleh tab
```

Ini bagian ARIA yang paling penting dari workshop ini.

---

# Attribute `hidden`

Panel Saturn dan Mars awalnya memiliki:

```html
hidden
```

Contoh:

```html
<div
  id="panel-saturn"
  role="tabpanel"
  aria-labelledby="tab-saturn"
  hidden
>
```

Artinya panel tersebut tidak ditampilkan.

Pada awal halaman:

```text
Earth panel
→ visible

Saturn panel
→ hidden

Mars panel
→ hidden
```

Ini sesuai dengan:

```text
Earth aria-selected="true"
Saturn aria-selected="false"
Mars aria-selected="false"
```

Jadi state visual dan state ARIA harus sesuai.

---

# Mengambil Semua Tab dan Panel

JavaScript:

```js
const tabs =
  document.querySelectorAll(
    '[role="tab"]'
  );

const panels =
  document.querySelectorAll(
    '[role="tabpanel"]'
  );
```

Di sini digunakan CSS **attribute selector**.

```js
'[role="tab"]'
```

artinya:

```text
ambil semua element
yang memiliki:

role="tab"
```

Sedangkan:

```js
'[role="tabpanel"]'
```

mengambil semua panel.

Hasil `querySelectorAll()` berupa kumpulan elemen sehingga bisa menggunakan:

```js
forEach()
```

---

# Memberikan Click Event ke Setiap Tab

```js
tabs.forEach(tab => {
  tab.addEventListener(
    "click",
    () => {

    }
  );
});
```

`tab` mewakili satu tab pada setiap perulangan.

Secara mental:

```text
Earth tab
→ listener

Saturn tab
→ listener

Mars tab
→ listener
```

---

# Reset Semua Tab Terlebih Dahulu

Ketika sebuah tab diklik:

```js
tabs.forEach(t =>
  t.setAttribute(
    "aria-selected",
    "false"
  )
);
```

Program terlebih dahulu membuat semua tab:

```text
aria-selected="false"
```

Contoh jika Saturn diklik:

```text
sebelumnya:

Earth  → true
Saturn → false
Mars   → false
```

Program reset dulu:

```text
Earth  → false
Saturn → false
Mars   → false
```

Baru nanti Saturn dibuat:

```text
true
```

---

# Menyembunyikan Semua Panel

Setelah itu:

```js
panels.forEach(p =>
  p.hidden = true
);
```

Semua panel disembunyikan terlebih dahulu.

Mental model:

```text
Earth panel  → hidden
Saturn panel → hidden
Mars panel   → hidden
```

Baru setelah itu program menentukan panel mana yang harus dibuka.

---

# Mengaktifkan Tab yang Diklik

```js
tab.setAttribute(
  "aria-selected",
  "true"
);
```

`tab` adalah tab yang sedang diklik.

Jadi misalnya user klik Saturn:

```text
Saturn
↓
aria-selected="true"
```

---

# Mengambil `aria-controls`

Bagian pentingnya:

```js
const associatedPanel =
  tab.getAttribute(
    "aria-controls"
  );
```

Misalnya tab Saturn:

```html
aria-controls="panel-saturn"
```

maka:

```js
associatedPanel
```

berisi:

```text
"panel-saturn"
```

`getAttribute()` digunakan untuk membaca nilai sebuah attribute.

Mental model:

```text
tab
↓
getAttribute("aria-controls")
↓
dapat ID panel
```

---

# Mencari Panel yang Sesuai

Setelah mendapatkan:

```text
panel-saturn
```

program mencari element dengan ID tersebut:

```js
const panel =
  document.getElementById(
    associatedPanel
  );
```

Jadi:

```text
aria-controls
↓
"panel-saturn"
↓
getElementById()
↓
<div id="panel-saturn">
```

Ini menunjukkan kenapa `aria-controls` berguna bukan hanya untuk accessibility.

Nilainya juga bisa dimanfaatkan JavaScript untuk menemukan elemen yang berhubungan.

---

# Menampilkan Panel

Setelah panel ditemukan:

```js
panel.hidden = false;
```

Artinya:

```text
hidden = true
→ sembunyi

hidden = false
→ tampil
```

Jadi kalau Saturn diklik:

```text
klik Saturn
↓
semua tab false
↓
semua panel hidden
↓
Saturn tab true
↓
ambil aria-controls
↓
"panel-saturn"
↓
cari #panel-saturn
↓
hidden = false
↓
Saturn panel muncul
```

---

# JavaScript Lengkap

```js
const tabs =
  document.querySelectorAll(
    '[role="tab"]'
  );

const panels =
  document.querySelectorAll(
    '[role="tabpanel"]'
  );

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t =>
      t.setAttribute(
        "aria-selected",
        "false"
      )
    );

    panels.forEach(p =>
      p.hidden = true
    );

    tab.setAttribute(
      "aria-selected",
      "true"
    );

    const associatedPanel =
      tab.getAttribute(
        "aria-controls"
      );

    const panel =
      document.getElementById(
        associatedPanel
      );

    panel.hidden = false;
  });
});
```

---

# Alur Program

```text
USER KLIK TAB
↓
reset semua aria-selected menjadi false
↓
hide semua panel
↓
tab yang diklik:
aria-selected = true
↓
baca aria-controls
↓
dapat ID panel
↓
getElementById()
↓
panel ditemukan
↓
hidden = false
↓
panel tampil
```

---

# CSS Tablist

```css
.tabs [role="tablist"] {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
```

Tablist menggunakan:

```css
display: flex;
```

sehingga tab tersusun secara horizontal.

```text
Earth | Saturn | Mars
```

---

# Styling Tab

```css
[role="tab"] {
  padding: 0.5rem 1rem;
  background: #eee;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: bold;
}
```

Selector:

```css
[role="tab"]
```

memilih semua elemen yang memiliki:

```html
role="tab"
```

---

# Styling Tab yang Sedang Aktif

CSS juga memanfaatkan ARIA state:

```css
[role="tab"]
[aria-selected="true"] {
  background: #fff;
  border-bottom:
    2px solid dodgerblue;
}
```

Artinya:

```text
cari element:
role="tab"

DAN

aria-selected="true"
```

Hanya tab aktif yang mendapatkan style tersebut.

Jadi:

```text
JavaScript
↓
ubah aria-selected
↓
CSS selector mendeteksi perubahan
↓
tampilan tab ikut berubah
```

Ini contoh bagus bahwa ARIA state juga bisa digunakan CSS untuk mencerminkan state visual.

---

# Styling Tab Panel

```css
[role="tabpanel"] {
  border: 1px solid #ccc;
  padding: 1rem;
}
```

Semua panel mendapatkan border dan padding yang sama.

---

# Cara Membedakan ARIA pada Project Ini

Bagian yang ingin saya ingat:

```text
role="tablist"
→ "ini kumpulan tab"

role="tab"
→ "ini sebuah tab"

role="tabpanel"
→ "ini isi dari tab"
```

```text
aria-selected
→ "tab mana yang sedang dipilih?"
```

```text
aria-controls
→ "tab ini mengontrol panel mana?"
```

```text
aria-labelledby
→ "elemen ini diberi nama oleh siapa?"
```

```text
hidden
→ "panel ini sedang ditampilkan atau tidak?"
```

---

# Hubungan yang Paling Penting

Daripada menghafal semua atribut secara terpisah, lebih mudah mengingat hubungan:

```text
TAB
│
├── role="tab"
│
├── id="tab-earth"
│
├── aria-selected="true"
│
└── aria-controls="panel-earth"
                     │
                     ▼
PANEL
├── role="tabpanel"
├── id="panel-earth"
└── aria-labelledby="tab-earth"
                       │
                       └──── kembali ke TAB
```

Bisa dibaca sebagai kalimat:

```text
Earth adalah sebuah tab.

Earth sedang dipilih.

Earth mengontrol panel-earth.

Panel-earth adalah sebuah tab panel.

Panel-earth diberi nama oleh tab-earth.
```

Dengan cara ini ARIA lebih mudah dipahami daripada hanya menghafal nama attribute.

---

# Yang Saya Pelajari

Dari workshop ini saya belajar:

- `role="tablist"`.
- `role="tab"`.
- `role="tabpanel"`.
- `aria-labelledby`.
- `aria-controls`.
- `aria-selected`.
- attribute `hidden`.
- hubungan ID antar elemen.
- CSS attribute selector.
- `querySelectorAll()`.
- `forEach()`.
- `addEventListener()`.
- `setAttribute()`.
- `getAttribute()`.
- `getElementById()`.
- mengubah property `.hidden`.
- menjaga state ARIA dan tampilan tetap sinkron.
- menghubungkan satu control dengan content yang dikontrolnya.

---

## Catatan

Bagian terpenting dari workshop ini bukan sekadar membuat tab berpindah.

Saya mulai memahami bahwa ARIA memberi **informasi tambahan tentang makna dan keadaan interface**.

JavaScript tetap melakukan perubahan sebenarnya:

```js
panel.hidden = false;
```

Sedangkan ARIA menjelaskan state tersebut:

```html
aria-selected="true"
```

Pola yang ingin saya ingat:

```text
JavaScript
→ mengubah UI

ARIA
→ menjelaskan kondisi UI
  kepada assistive technology
```

Untuk tablist:

```text
klik tab
↓
ubah aria-selected
↓
baca aria-controls
↓
temukan panel
↓
ubah hidden
```

Dan mental model paling sederhana:

```text
role
→ "elemen ini apa?"

aria-selected
→ "sedang dipilih?"

aria-controls
→ "mengontrol siapa?"

aria-labelledby
→ "diberi nama oleh siapa?"

hidden
→ "sedang terlihat?"
```

---

**Platform:** freeCodeCamp  
**Workshop:** Build a Planets Tablist  
**Language:** HTML, CSS, JavaScript  
**Topic:** DOM, Event Handling, ARIA, Accessible Tabs
