# Build an Emoji Reactor

Workshop ini membuat aplikasi sederhana untuk memberi rating pada beberapa emoji.

Setiap tombol emoji memiliki nilai awal:

```text
0/10
```

Saat tombol diklik, nilainya bertambah satu sampai maksimal:

```text
10/10
```

Fokus utama workshop ini ada di DOM, event listener, `querySelectorAll()`, `forEach()`, dan manipulasi `textContent`.

## JavaScript

```js
function updateCount(btn) {
  const countEl = btn.querySelector(".count");
  let currCount = +countEl.textContent.split("/")[0];

  if (currCount === 10) return;

  currCount++;
  countEl.textContent = `${currCount}/10`;
}

const btns = document.querySelectorAll(".emoji-btn");

btns.forEach((btn) => {
  btn.addEventListener("click", () => updateCount(btn));
});
```

## `querySelectorAll()`

Semua tombol emoji diambil menggunakan:

```js
const btns =
  document.querySelectorAll(".emoji-btn");
```

`querySelectorAll()` mengambil semua elemen yang memiliki class:

```css
.emoji-btn
```

Hasilnya berupa `NodeList`.

Karena ada beberapa tombol, `forEach()` digunakan untuk membaca tombol satu per satu:

```js
btns.forEach((btn) => {
  // ...
});
```

Di sini `btn` mewakili satu tombol yang sedang diproses.

## Event Listener

Setiap tombol diberi event:

```js
btn.addEventListener(
  "click",
  () => updateCount(btn)
);
```

Saat sebuah tombol diklik, tombol tersebut dikirim ke:

```js
updateCount(btn)
```

Jadi function yang sama bisa digunakan untuk semua tombol emoji.

## `updateCount()`

Function ini bertugas membaca dan memperbarui angka pada tombol yang diklik.

```js
function updateCount(btn) {
  // ...
}
```

Pertama, elemen `.count` dicari di dalam tombol tersebut:

```js
const countEl =
  btn.querySelector(".count");
```

Misalnya tombol berisi:

```html
<span class="count">6/10</span>
```

maka `countEl` menunjuk ke elemen tersebut.

## Mengambil Angka dari `"6/10"`

Nilai `textContent` masih berupa string:

```text
"6/10"
```

Kode berikut memisahkannya:

```js
countEl.textContent.split("/")
```

Hasilnya:

```js
["6", "10"]
```

Kemudian `[0]` mengambil bagian pertama:

```js
countEl.textContent.split("/")[0]
```

hasil:

```text
"6"
```

Tanda `+` di depan digunakan untuk mengubah string menjadi number:

```js
+countEl.textContent.split("/")[0]
```

Jadi:

```text
"6"
↓
6
```

## Membatasi Nilai Maksimal

Kalau nilai sudah `10`, function langsung dihentikan:

```js
if (currCount === 10) return;
```

Ini mencegah rating menjadi:

```text
11/10
12/10
```

dan seterusnya.

Kalau belum `10`, nilai ditambah:

```js
currCount++;
```

lalu ditampilkan kembali:

```js
countEl.textContent =
  `${currCount}/10`;
```

## Alur Program

```text
ambil semua tombol
↓
forEach()
↓
pasang click event pada setiap tombol
↓
user klik tombol
↓
updateCount(btn)
↓
ambil .count dari tombol
↓
ambil angka sebelum "/"
↓
cek apakah sudah 10
↓
tambah 1
↓
update textContent
```

## Yang Saya Pelajari

- `querySelectorAll()` untuk mengambil banyak elemen sekaligus.
- `NodeList` dan `forEach()` untuk membaca elemen satu per satu.
- `addEventListener()` untuk menangani klik.
- Mengirim elemen DOM sebagai argument function.
- `querySelector()` untuk mencari elemen di dalam elemen lain.
- `textContent` untuk membaca dan mengubah teks.
- `split()` untuk memisahkan string.
- `[0]` untuk mengambil elemen pertama dari hasil array.
- Unary plus `+` untuk mengubah string menjadi number.
- `return` untuk menghentikan function lebih awal.
- Template literal untuk membuat teks seperti:

```js
`${currCount}/10`
```

## Catatan

Bagian yang paling penting dari workshop ini adalah memahami bahwa:

```js
btn
```

bukan sekadar nama variable, tetapi mewakili **tombol yang sedang diproses atau diklik**.

Karena tombol tersebut dikirim ke:

```js
updateCount(btn)
```

satu function bisa menangani semua emoji tanpa perlu membuat function terpisah untuk setiap tombol.

**Platform:** freeCodeCamp  
**Workshop:** Build an Emoji Reactor  
**Language:** JavaScript
