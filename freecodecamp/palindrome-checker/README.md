# Build a Palindrome Checker

Lab ini membuat aplikasi **Palindrome Checker** untuk mengecek apakah sebuah teks tetap sama ketika dibaca dari depan maupun dari belakang.

Contoh:

```text
eye
→ palindrome

race car
→ palindrome

hello
→ bukan palindrome
```

Sebelum dibandingkan, program akan membersihkan input terlebih dahulu dengan:

```text
menghapus spasi
menghapus tanda baca
menghapus simbol
mengabaikan huruf besar/kecil
```

Jadi teks seperti:

```text
A man, a plan, a canal. Panama
```

akan diproses menjadi:

```text
amanaplanacanalpanama
```

dan hasil tersebut tetap sama ketika dibalik.

---

## Alur Program

```text
User memasukkan teks
↓
Klik Check
↓
Input kosong?
│
├── YA
│   → tampilkan alert
│   → hentikan function
│
└── TIDAK
    ↓
    simpan teks asli
    ↓
    bersihkan teks dengan Regex
    ↓
    ubah menjadi lowercase
    ↓
    balik teks
    ↓
    bandingkan
    ↓
    tampilkan hasil
```

---

# Mengambil Elemen DOM

```js
const textInput =
  document.querySelector("#text-input");

const checkButton =
  document.querySelector("#check-btn");

const result =
  document.querySelector("#result");
```

Masing-masing mempunyai tugas:

```text
textInput
→ mengambil input user

checkButton
→ menjalankan pengecekan

result
→ menampilkan hasil
```

---

# Event Tombol Check

```js
checkButton.addEventListener("click", () => {
  // logic palindrome
});
```

Program menjalankan pengecekan setelah user menekan tombol.

---

# Mengecek Input Kosong

```js
if (textInput.value === "") {
  alert("Please input a value");
  return;
}
```

Jika user belum memasukkan teks:

```text
alert muncul
↓
return
↓
function berhenti
```

`return` mencegah kode selanjutnya ikut dijalankan.

---

# Menyimpan Teks Asli

```js
const originalText =
  textInput.value;
```

Teks asli tetap disimpan karena nanti digunakan untuk menampilkan hasil.

Misalnya input:

```text
race car
```

hasil yang ingin ditampilkan adalah:

```text
race car is a palindrome.
```

bukan:

```text
racecar is a palindrome.
```

Karena itu kita membutuhkan dua versi:

```text
originalText
→ untuk ditampilkan

cleanedText
→ untuk diperiksa
```

---

# Membersihkan Input dengan Regex

```js
const cleanedText = originalText
  .replace(/[^a-z0-9]/gi, "")
  .toLowerCase();
```

Ini bagian utama Regex pada project.

Regex:

```regex
/[^a-z0-9]/gi
```

digunakan untuk mencari semua karakter yang **bukan huruf atau angka**.

---

## Character Class

```regex
[a-z0-9]
```

berarti:

```text
huruf a sampai z
ATAU
angka 0 sampai 9
```

Tetapi kita menambahkan:

```regex
^
```

di dalam character class:

```regex
[^a-z0-9]
```

Artinya:

```text
semua karakter
KECUALI
huruf a-z dan angka 0-9
```

Jadi karakter seperti:

```text
spasi
,
.
_
-
:
(
)
```

akan cocok dengan Regex tersebut.

---

# Flag `g`

```regex
g
```

berarti:

```text
global
```

Artinya pencarian dilakukan terhadap **semua karakter yang cocok**, bukan hanya karakter pertama.

---

# Flag `i`

```regex
i
```

berarti:

```text
case-insensitive
```

Huruf besar dan kecil dianggap sama.

Jadi:

```text
A
a
```

tidak perlu dibedakan.

---

# Menghapus Karakter yang Tidak Dibutuhkan

```js
.replace(
  /[^a-z0-9]/gi,
  ""
)
```

Replacement-nya adalah:

```js
""
```

atau string kosong.

Artinya karakter yang cocok dengan Regex akan **dihapus**.

Contoh:

```text
race car
↓
racecar
```

atau:

```text
A man, a plan!
↓
Amanaplan
```

---

# `toLowerCase()`

Setelah karakter yang tidak diperlukan dihapus:

```js
.toLowerCase()
```

mengubah semua huruf menjadi lowercase.

Contoh:

```text
RaceCar
↓
racecar
```

Sehingga kapitalisasi tidak memengaruhi pengecekan palindrome.

---

# Membalik Teks

```js
const reverseText = cleanedText
  .split("")
  .reverse()
  .join("");
```

Prosesnya terdiri dari tiga method.

---

## `split("")`

```js
cleanedText.split("")
```

mengubah string menjadi array karakter.

Contoh:

```text
"eye"
```

menjadi:

```js
["e", "y", "e"]
```

---

## `reverse()`

```js
.reverse()
```

membalik urutan array.

Contoh:

```js
["h", "e", "l", "l", "o"]
```

menjadi:

```js
["o", "l", "l", "e", "h"]
```

---

## `join("")`

```js
.join("")
```

menggabungkan array kembali menjadi string.

Contoh:

```js
["o", "l", "l", "e", "h"]
```

menjadi:

```text
olleh
```

Jadi alurnya:

```text
STRING
↓
split("")
↓
ARRAY
↓
reverse()
↓
ARRAY TERBALIK
↓
join("")
↓
STRING TERBALIK
```

---

# Mengecek Palindrome

```js
const isPalindrome =
  cleanedText === reverseText;
```

Perbandingan ini menghasilkan boolean:

```text
true
atau
false
```

Contoh:

```text
cleanedText:
racecar

reverseText:
racecar

↓
true
```

Sedangkan:

```text
cleanedText:
hello

reverseText:
olleh

↓
false
```

---

# Menampilkan Hasil dengan Ternary

```js
result.textContent = isPalindrome
  ? `${originalText} is a palindrome.`
  : `${originalText} is not a palindrome.`;
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
isPalindrome
?
"palindrome"
:
"not palindrome"
```

---

# Contoh Pengujian

Beberapa input yang bisa digunakan:

| Input | Hasil |
|---|---|
| `eye` | Palindrome |
| `race car` | Palindrome |
| `_eye` | Palindrome |
| `A man, a plan, a canal. Panama` | Palindrome |
| `0_0 (: /-\ :) 0-0` | Palindrome |
| `never odd or even` | Palindrome |
| `not a palindrome` | Not Palindrome |
| `hello` | Not Palindrome |

---

# Alur Contoh

Misalnya user memasukkan:

```text
A man, a plan, a canal. Panama
```

Program melakukan:

```text
originalText
↓
"A man, a plan, a canal. Panama"

replace()
↓
"AmanaplanacanalPanama"

toLowerCase()
↓
"amanaplanacanalpanama"

split()
↓
array karakter

reverse()
↓
array dibalik

join()
↓
"amanaplanacanalpanama"

compare
↓
true
```

Hasil:

```text
A man, a plan, a canal. Panama is a palindrome.
```

---

# Pola Program

Project ini mengikuti pola:

```text
INPUT
↓
VALIDATION
↓
NORMALIZE DATA
↓
TRANSFORM DATA
↓
COMPARE
↓
OUTPUT
```

Pada project ini:

```text
textInput.value
↓
cek kosong
↓
replace() + toLowerCase()
↓
split() + reverse() + join()
↓
===
↓
result.textContent
```

---

# Yang Saya Pelajari

Dari lab ini saya belajar:

- DOM selector.
- `addEventListener()`.
- Validasi input.
- Early return.
- Regex.
- Character class.
- Negated character class.
- Flag `g`.
- Flag `i`.
- `replace()`.
- `toLowerCase()`.
- `split()`.
- `reverse()`.
- `join()`.
- Strict equality `===`.
- Boolean.
- Ternary operator.
- Template literal.
- Memisahkan data asli dengan data yang sudah diproses.

---

## Catatan Pribadi

Bagian paling penting dari lab ini adalah memahami bahwa sebelum data dibandingkan, data sering kali perlu **dinormalisasi terlebih dahulu**.

Pada palindrome checker:

```text
"A man, a plan!"
```

tidak langsung dibandingkan.

Program terlebih dahulu mengubahnya menjadi format yang konsisten:

```text
amanaplan
```

Baru setelah itu dilakukan pengecekan.

Pola yang ingin saya ingat:

```text
ORIGINAL DATA
↓
CLEAN / NORMALIZE
↓
TRANSFORM
↓
COMPARE
```

Regex di project ini digunakan bukan untuk mencari kata tertentu, tetapi untuk menentukan karakter mana yang harus dibuang:

```regex
[^a-z0-9]
```

yang berarti:

```text
semua yang BUKAN
huruf atau angka
```

Dan proses membalik string menggunakan pola:

```text
split
→ reverse
→ join
```

yang sangat sering digunakan di latihan JavaScript dasar.

---

**Platform:** freeCodeCamp  
**Lab:** Build a Palindrome Checker  
**Language:** HTML, CSS, JavaScript  
**Topic:** Regular Expressions, String Methods, DOM, Event Handling
