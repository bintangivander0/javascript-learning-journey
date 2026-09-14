# Build a Spam Filter

<table align="center">
  <tr>
    <td align="center">
      <img width="713" height="390" alt="image" src="https://github.com/user-attachments/assets/cc48cecb-c00a-40f4-94ed-68da4af220c3" />
    </td>
    <td align="center">
      <img width="716" height="401" alt="image" src="https://github.com/user-attachments/assets/c8d1b7bc-0654-404b-9f84-c493d57f1c04" />
    </td>
  </tr>
</table>

Project ini membuat **spam filter sederhana menggunakan Regular Expressions (Regex)**.

User memasukkan sebuah pesan ke dalam textarea, kemudian program akan mengecek apakah pesan tersebut cocok dengan salah satu pola spam yang sudah disimpan.

Jika ada pola yang cocok:

```text
Oh no! This looks like a spam message.
```

Jika tidak:

```text
This message does not seem to contain any spam.
```

Project ini menjadi latihan penggunaan beberapa konsep Regex seperti:

```text
character class
quantifier
alternation |
non-capturing group
whitespace \s
case-insensitive flag i
```

Selain Regex, project ini juga menggunakan:

```text
Array
some()
test()
DOM
event listener
ternary operator
```

---

## Struktur Program

Secara sederhana alur aplikasinya:

```text
User menulis pesan
↓
Klik "Check message"
↓
isSpam(message)
↓
cek seluruh Regex dalam denyList
↓
ada satu pola yang cocok?
│
├── YA
│   → tampilkan spam warning
│
└── TIDAK
    → tampilkan pesan aman
↓
textarea dikosongkan
```

---

# Mengambil Elemen DOM

JavaScript mengambil beberapa elemen dari HTML:

```js
const messageInput =
  document.getElementById("message-input");

const result =
  document.getElementById("result-message");

const checkMessageButton =
  document.getElementById("check-message-btn");
```

Masing-masing mempunyai tugas:

```text
messageInput
→ mengambil pesan user

result
→ menampilkan hasil pengecekan

checkMessageButton
→ menjalankan pengecekan ketika diklik
```

---

# Regex untuk Meminta Bantuan

```js
const helpRegex =
  /please help|assist me/i;
```

Operator:

```regex
|
```

berarti:

```text
ATAU
```

Jadi pola tersebut cocok dengan:

```text
please help
ATAU
assist me
```

Flag:

```regex
i
```

berarti pencarian tidak membedakan huruf besar dan kecil.

Jadi:

```text
PLEASE HELP
Please Help
please help
```

semuanya dapat cocok.

---

# Regex untuk Uang

```js
const dollarRegex =
  /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
```

Regex ini lebih panjang, jadi lebih mudah dibaca per bagian.

```regex
[0-9]+
```

artinya:

```text
satu atau lebih angka
```

Contoh:

```text
1
50
500
100000
```

---

## `\s*`

```regex
\s*
```

`\s` berarti whitespace seperti spasi, tab, atau line break.

Sedangkan:

```regex
*
```

berarti:

```text
0 kali atau lebih
```

Jadi:

```regex
\s*
```

berarti whitespace:

```text
boleh tidak ada
boleh satu
boleh banyak
```

---

## Non-Capturing Group

```regex
(?:hundred|thousand|million|billion)?
```

Bagian:

```regex
(?:...)
```

adalah **non-capturing group**.

Digunakan untuk mengelompokkan pilihan tanpa menyimpan hasilnya sebagai capture group.

Di dalamnya:

```text
hundred
ATAU
thousand
ATAU
million
ATAU
billion
```

Kemudian ada:

```regex
?
```

yang berarti:

```text
boleh ada
atau
boleh tidak ada
```

Contohnya:

```text
500 dollars
2 million dollars
10 thousand dollars
```

---

## `\s+`

```regex
\s+dollars
```

`+` berarti:

```text
minimal satu kali
```

Jadi harus ada whitespace sebelum:

```text
dollars
```

---

# Regex untuk "Free Money"

```js
const freeRegex =
  /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
```

Regex ini dibuat supaya spammer yang mengganti huruf dengan angka tetap dapat terdeteksi.

---

## Character Class `[e3]`

```regex
[e3]
```

berarti:

```text
satu karakter
yang boleh berupa:

e
atau
3
```

Jadi:

```text
free
fr33
fre3
```

masih dapat cocok.

---

## Character Class `[o0]`

```regex
[o0]
```

berarti:

```text
o
atau
0
```

Sehingga:

```text
money
m0ney
mon3y
m0n3y
```

dapat dikenali.

---

# Batas Awal dan Akhir

Pola:

```regex
(?:^|\s)
```

berarti:

```text
awal string
ATAU
whitespace
```

Sedangkan:

```regex
(?:$|\s)
```

berarti:

```text
akhir string
ATAU
whitespace
```

Ini membuat phrase dapat ditemukan baik di awal, tengah, maupun akhir kalimat.

Contoh:

```text
free money
```

atau:

```text
I want free money now
```

---

# Regex untuk "Stock Alert"

```js
const stockRegex =
  /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
```

Regex ini menggunakan banyak character class agar variasi huruf yang diganti simbol atau angka tetap dapat dikenali.

Contohnya:

```regex
[s5]
```

berarti:

```text
s atau 5
```

```regex
[t7]
```

berarti:

```text
t atau 7
```

```regex
[o0]
```

berarti:

```text
o atau 0
```

```regex
[a@4]
```

berarti:

```text
a
@
atau 4
```

```regex
[e3]
```

berarti:

```text
e atau 3
```

Tujuannya adalah menangkap pola spam yang mencoba menghindari filter dengan mengganti karakter.

---

# Regex untuk "Dear Friend"

```js
const dearRegex =
  /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;
```

Contoh character class:

```regex
[e3]
```

```text
e atau 3
```

```regex
[a@4]
```

```text
a atau @ atau 4
```

```regex
[i1|]
```

```text
i atau 1 atau |
```

Jadi beberapa bentuk seperti:

```text
dear friend
d3ar friend
d3@r fr13nd
```

dapat dianggap cocok dengan pola.

---

# Menyimpan Semua Regex

Semua pola spam dimasukkan ke array:

```js
const denyList = [
  helpRegex,
  dollarRegex,
  freeRegex,
  stockRegex,
  dearRegex
];
```

Jadi:

```text
denyList
│
├── helpRegex
├── dollarRegex
├── freeRegex
├── stockRegex
└── dearRegex
```

Keuntungan cara ini adalah kita tidak perlu membuat banyak `if`.

---

# Function `isSpam()`

```js
const isSpam = (msg) =>
  denyList.some(
    (regex) => regex.test(msg)
  );
```

Ini salah satu bagian terpenting project.

Function menerima:

```js
msg
```

kemudian mengecek semua Regex dalam:

```js
denyList
```

menggunakan:

```js
some()
```

---

# Cara Kerja `some()`

`some()` menghasilkan:

```text
true
```

jika **minimal satu elemen** memenuhi kondisi.

Contohnya:

```text
helpRegex      → false
dollarRegex    → false
freeRegex      → true
stockRegex     → tidak perlu menentukan hasil akhir
dearRegex
```

Karena sudah ada satu:

```text
true
```

maka:

```js
denyList.some(...)
```

menghasilkan:

```js
true
```

Mental model:

```text
apakah ADA SATU SAJA
regex yang cocok?
```

---

# `regex.test(msg)`

Setiap Regex menjalankan:

```js
regex.test(msg)
```

`test()` menghasilkan boolean:

```text
true
→ pola ditemukan

false
→ pola tidak ditemukan
```

Contoh:

```js
/free money/i.test(
  "I want free money"
);
```

hasilnya:

```text
true
```

---

# Hubungan `some()` dan `test()`

Gabungannya:

```js
denyList.some(
  (regex) => regex.test(msg)
);
```

bisa dibaca:

```text
untuk setiap regex di denyList
↓
test pesan
↓
apakah ada minimal satu
yang menghasilkan true?
```

Jika iya:

```text
isSpam() → true
```

---

# Event Tombol Check Message

```js
checkMessageButton.addEventListener(
  "click",
  () => {

  }
);
```

Program baru menjalankan pemeriksaan ketika user menekan:

```text
Check message
```

---

# Mengecek Input Kosong

```js
if (messageInput.value === "") {
  alert("Please enter a message.");
  return;
}
```

Jika textarea kosong:

```text
alert muncul
↓
return
↓
function berhenti
```

`return` penting supaya program tidak melanjutkan proses pengecekan spam.

---

# Menampilkan Hasil dengan Ternary Operator

```js
result.textContent =
  isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
```

Ternary mempunyai pola:

```text
condition
?
hasil jika true
:
hasil jika false
```

Dalam project ini:

```text
isSpam(message)
?
spam warning
:
safe message
```

---

# Mengosongkan Input

Setelah pengecekan selesai:

```js
messageInput.value = "";
```

Textarea kembali kosong supaya user dapat memasukkan pesan baru.

Urutannya penting:

```text
gunakan messageInput.value
↓
cek spam
↓
tampilkan hasil
↓
baru kosongkan input
```

Jangan mengosongkannya sebelum menjalankan `isSpam()` karena pesan yang diperiksa malah menjadi string kosong.

---

# CSS

CSS membuat halaman menggunakan warna gelap dengan tombol berwarna kuning.

Variable warna disimpan menggunakan CSS Custom Properties:

```css
:root {
  --dark-grey: #1b1b32;
  --light-grey: #f5f6f7;
  --golden-yellow: #fecc4c;
  --yellow: #ffcc4c;
  --gold: #feac32;
  --orange: #ffac33;
  --dark-orange: #f89808;
}
```

Kemudian digunakan melalui:

```css
var(--dark-grey)
```

dan:

```css
var(--light-grey)
```

---

# Button Gradient

Button menggunakan:

```css
background-image:
  linear-gradient(
    var(--golden-yellow),
    var(--orange)
  );
```

Saat hover:

```css
.btn:hover {
  background-image:
    linear-gradient(
      var(--yellow),
      var(--dark-orange)
    );
}
```

Sehingga user mendapatkan feedback visual ketika mouse berada di atas button.

---

# Cara Mengetes Spam Filter

Beberapa contoh input yang bisa digunakan:

| Input | Hasil |
|---|---|
| `please help` | Spam |
| `assist me` | Spam |
| `500 dollars` | Spam |
| `2 million dollars` | Spam |
| `free money` | Spam |
| `fr33 m0n3y` | Spam |
| `I want free money now` | Spam |
| `stock alert` | Spam |
| `dear friend` | Spam |
| `d3@r fr13nd` | Spam |
| `Hello, how are you?` | Not Spam |
| `I am learning JavaScript` | Not Spam |

Project ini merupakan filter berbasis aturan sederhana, sehingga hasilnya tidak selalu memahami konteks kalimat.

Contohnya:

```text
I saved 500 dollars this month.
```

tetap dapat terdeteksi sebagai spam karena:

```text
500 dollars
```

cocok dengan `dollarRegex`.

---

# Alur Program Keseluruhan

```text
USER MENULIS PESAN
↓
KLIK CHECK MESSAGE
↓
input kosong?
│
├── YA
│   → alert
│   → return
│
└── TIDAK
    ↓
    isSpam(message)
    ↓
    denyList.some()
    ↓
    setiap regex menjalankan test()
    ↓
    ada yang true?
    │
    ├── YA
    │   → spam warning
    │
    └── TIDAK
        → safe message
    ↓
    textarea dikosongkan
```

---

# Regex yang Digunakan

```text
helpRegex
→ please help / assist me

dollarRegex
→ angka + dollar pattern

freeRegex
→ free money + variasi karakter

stockRegex
→ stock alert + variasi karakter

dearRegex
→ dear friend + variasi karakter
```

---

# Yang Saya Pelajari

Dari workshop ini saya belajar:

- Regular Expressions.
- `test()`.
- Character class.
- `[e3]`.
- `[o0]`.
- `[a@4]`.
- Quantifier `+`.
- Quantifier `*`.
- Quantifier `?`.
- Whitespace `\s`.
- Alternation `|`.
- Non-capturing group `(?:...)`.
- Start anchor `^`.
- End anchor `$`.
- Flag `i`.
- Array of regular expressions.
- `Array.prototype.some()`.
- DOM manipulation.
- `addEventListener()`.
- Ternary operator.
- Early return.
- Membuat rule-based spam detection.

---

## Catatan Pribadi

Workshop ini membantu memahami bahwa Regex tidak hanya digunakan untuk mencari satu teks yang sama persis.

Regex bisa mendeskripsikan **sebuah pola**.

Contohnya:

```regex
[e3]
```

bukan berarti mencari:

```text
e3
```

tetapi:

```text
e ATAU 3
```

Begitu juga:

```regex
\s+
```

berarti:

```text
whitespace
minimal satu kali
```

dan:

```regex
(?:^|\s)
```

berarti:

```text
awal string
ATAU
whitespace
```

Pola utama project:

```text
MESSAGE
↓
REGEX RULES
↓
test()
↓
true / false
↓
some()
↓
SPAM / NOT SPAM
```

Hal lain yang penting adalah penggunaan:

```js
denyList.some(
  (regex) => regex.test(msg)
);
```

Daripada membuat banyak kondisi seperti:

```js
if (
  helpRegex.test(msg) ||
  dollarRegex.test(msg) ||
  freeRegex.test(msg) ||
  ...
)
```

semua Regex dapat dikumpulkan dalam array lalu diperiksa menggunakan `some()`.

Ini membuat kode lebih ringkas dan lebih mudah ditambah jika nanti ada pola spam baru.

---

**Platform:** freeCodeCamp  
**Workshop:** Build a Spam Filter  
**Language:** HTML, CSS, JavaScript  
**Topic:** Regular Expressions, DOM, Array Methods, Event Handling
