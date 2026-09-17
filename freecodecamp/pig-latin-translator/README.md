# Implement a Pig Latin Translator

Lab ini membuat function untuk menerjemahkan sebuah kata ke bentuk sederhana **Pig Latin**.

Aturannya:

- Jika kata dimulai dengan satu atau lebih **konsonan**, pindahkan konsonan tersebut ke belakang lalu tambahkan `ay`.
- Jika kata dimulai dengan **vokal**, cukup tambahkan `way`.

Contoh:

```text
glove
↓
oveglay
```

```text
eight
↓
eightway
```

```text
algorithm
↓
algorithmway
```

---

## JavaScript

```js
function translatePigLatin(str) {
  const regexKonsonan = /^[b-df-hj-np-tv-z]+/i;
  const regexVocal = /^[aiueo]+/i;

  const match1 = str.match(regexKonsonan);
  console.log(
    `Hasil kecocokan huruf konsonan di awal string: ${match1}`
  );

  const match2 = str.match(regexVocal);
  console.log(
    `Hasil kecocokan huruf vocal di awal string: ${match2}`
  );

  if (match1) {
    const remainingCharsAfterMatch1 =
      str.slice(match1[0].length);

    console.log(
      `Sisa huruf setelah regexKonsonan pada awal kata dihilangkan: ${remainingCharsAfterMatch1}`
    );

    return remainingCharsAfterMatch1 + match1[0] + "ay";
  } else if (match2) {
    return str + "way";
  }
}

console.log(translatePigLatin("glove"));
console.log(translatePigLatin("eight"));
console.log(translatePigLatin("algorithm"));
```

Output:

```text
oveglay
eightway
algorithmway
```

---

# Alur Program

Secara sederhana:

```text
INPUT KATA
↓
cek awal kata dengan Regex
↓
dimulai konsonan?
│
├── YA
│   ↓
│   ambil konsonan di awal
│   ↓
│   potong bagian tersebut
│   ↓
│   pindahkan ke belakang
│   ↓
│   tambahkan "ay"
│
└── TIDAK
    ↓
    dimulai vokal?
    ↓
    tambahkan "way"
```

---

# Function `translatePigLatin()`

Function menerima satu parameter:

```js
function translatePigLatin(str) {

}
```

`str` merupakan kata yang akan diterjemahkan menjadi Pig Latin.

Contoh:

```js
translatePigLatin("glove");
```

Nilai:

```text
str = "glove"
```

---

# Regex Konsonan

```js
const regexKonsonan =
  /^[b-df-hj-np-tv-z]+/i;
```

Regex ini digunakan untuk mencari **satu atau lebih huruf konsonan yang berada di awal string**.

Mari pecah satu-satu:

```regex
^
```

berarti:

```text
awal string
```

Kemudian:

```regex
[b-df-hj-np-tv-z]
```

adalah character class untuk huruf-huruf konsonan.

Kemudian:

```regex
+
```

berarti:

```text
satu atau lebih
```

Terakhir:

```regex
i
```

berarti:

```text
case-insensitive
```

jadi huruf besar dan kecil tidak dibedakan.

---

# Kenapa Menggunakan `^`?

Anchor:

```regex
^
```

memastikan Regex hanya mencari konsonan yang berada **di awal kata**.

Misalnya:

```text
glove
^^
gl
```

Regex menemukan:

```text
gl
```

Tetapi pada:

```text
eight
```

huruf pertama adalah:

```text
e
```

yang merupakan vokal.

Maka `regexKonsonan` tidak menemukan match.

---

# Character Class Konsonan

Regex:

```regex
[b-df-hj-np-tv-z]
```

sebenarnya terdiri dari beberapa range:

```text
b-d
f-h
j-n
p-t
v-z
```

Tujuannya adalah mencakup huruf alfabet selain vokal:

```text
a
i
u
e
o
```

Contoh:

```text
b
c
d

f
g
h

j
k
l
m
n
```

dan seterusnya.

---

# Quantifier `+`

Pada:

```regex
[b-df-hj-np-tv-z]+
```

simbol:

```regex
+
```

berarti:

```text
satu atau lebih
```

Ini penting karena sebuah kata bisa dimulai dengan beberapa konsonan sekaligus.

Contoh:

```text
glove
^^
gl
```

Kalau tidak menggunakan `+`, Regex hanya akan mengambil:

```text
g
```

Padahal yang dibutuhkan adalah seluruh kelompok konsonan awal:

```text
gl
```

---

# Regex Vokal

```js
const regexVocal =
  /^[aiueo]+/i;
```

Regex ini digunakan untuk mencari vokal di awal string.

Character class:

```regex
[aiueo]
```

berarti satu karakter berupa:

```text
a
i
u
e
atau
o
```

Digabungkan dengan:

```regex
^
```

berarti harus berada di awal string.

---

# Mencari Match dengan `match()`

```js
const match1 =
  str.match(regexKonsonan);
```

`match()` digunakan untuk mencari bagian string yang cocok dengan Regex.

Jika cocok:

```js
"glove".match(/^[b-df-hj-np-tv-z]+/i);
```

hasilnya kurang lebih:

```js
["gl"]
```

Elemen pertama:

```js
match1[0]
```

berisi teks yang benar-benar cocok:

```text
gl
```

---

# Jika Tidak Ada Match

Kalau Regex tidak menemukan kecocokan:

```js
"eight".match(
  /^[b-df-hj-np-tv-z]+/i
);
```

hasilnya:

```js
null
```

Karena itulah kode dapat menggunakan:

```js
if (match1) {

}
```

Kalau `match1` berisi array hasil match:

```text
truthy
```

maka blok `if` dijalankan.

Kalau:

```js
match1 === null
```

blok tersebut dilewati.

---

# Mengambil Hasil Match

Untuk kata:

```text
glove
```

hasil:

```js
match1[0]
```

adalah:

```text
gl
```

Sedangkan:

```js
match1[0].length
```

adalah:

```text
2
```

Karena:

```text
"gl"
↓
panjang = 2
```

Nilai panjang ini digunakan untuk menentukan dari indeks mana string harus dipotong.

---

# Menggunakan `slice()`

```js
const remainingCharsAfterMatch1 =
  str.slice(match1[0].length);
```

Misalnya:

```text
str = "glove"

match1[0] = "gl"

match1[0].length = 2
```

Maka:

```js
str.slice(2);
```

menghasilkan:

```text
ove
```

Secara visual:

```text
g l o v e
0 1 2 3 4
    ↑
  mulai slice
```

Hasil:

```text
ove
```

---

# Memindahkan Konsonan ke Belakang

Setelah bagian awal dipotong:

```text
glove
↓
gl + ove
```

kita memiliki:

```text
match1[0]
→ "gl"

remainingCharsAfterMatch1
→ "ove"
```

Kemudian urutannya dibalik:

```js
remainingCharsAfterMatch1
+ match1[0]
+ "ay"
```

Sehingga:

```text
"ove"
+
"gl"
+
"ay"
```

menjadi:

```text
oveglay
```

---

# Jika Kata Dimulai dengan Vokal

Bagian:

```js
else if (match2) {
  return str + "way";
}
```

digunakan ketika kata dimulai dengan vokal.

Contoh:

```text
eight
```

Regex konsonan:

```text
tidak cocok
→ null
```

Regex vokal:

```text
cocok dengan "e"
```

Maka:

```js
str + "way"
```

menjadi:

```text
eightway
```

---

# Contoh `glove`

Input:

```text
glove
```

### 1. Cek konsonan

```regex
/^[b-df-hj-np-tv-z]+/i
```

Match:

```text
gl
```

### 2. Ambil panjang match

```text
"gl".length
↓
2
```

### 3. Slice string

```js
"glove".slice(2)
```

hasil:

```text
ove
```

### 4. Susun ulang

```text
ove
+
gl
+
ay
```

hasil:

```text
oveglay
```

---

# Contoh `eight`

Input:

```text
eight
```

Konsonan awal:

```text
tidak ada
```

Vokal awal:

```text
e
```

Maka:

```text
eight
+
way
```

hasil:

```text
eightway
```

---

# Contoh `algorithm`

Input:

```text
algorithm
```

Huruf pertama:

```text
a
```

Regex vokal cocok.

Maka:

```text
algorithm
+
way
```

hasil:

```text
algorithmway
```

---

# Hubungan Regex dan String Method

Lab ini menggabungkan dua hal:

```text
Regex
→ menentukan bagian teks mana yang cocok

String Method
→ mengubah teks berdasarkan hasil Regex
```

Alurnya:

```text
str
↓
match(regex)
↓
dapat bagian konsonan/vokal
↓
slice()
↓
susun ulang string
↓
return
```

Jadi Regex tidak melakukan seluruh proses translasi.

Regex hanya membantu menjawab:

```text
"Bagian awal kata ini terdiri dari apa?"
```

Setelah itu JavaScript menggunakan hasil tersebut untuk memanipulasi string.

---

# Kenapa Menggunakan `match1[0]`?

`match()` menghasilkan array.

Contoh:

```js
const match1 =
  "glove".match(
    /^[b-df-hj-np-tv-z]+/i
  );
```

Kurang lebih:

```js
["gl"]
```

Karena itu:

```js
match1[0]
```

mengambil:

```text
gl
```

Bagian inilah yang nanti:

```text
dihapus dari depan
↓
dipindahkan ke belakang
```

---

# Ringkasan Regex

### Konsonan

```regex
/^[b-df-hj-np-tv-z]+/i
```

| Bagian | Arti |
|---|---|
| `^` | Awal string |
| `[...]` | Character class |
| `b-d` | Huruf b sampai d |
| `f-h` | Huruf f sampai h |
| `j-n` | Huruf j sampai n |
| `p-t` | Huruf p sampai t |
| `v-z` | Huruf v sampai z |
| `+` | Satu atau lebih |
| `i` | Abaikan uppercase/lowercase |

### Vokal

```regex
/^[aiueo]+/i
```

| Bagian | Arti |
|---|---|
| `^` | Awal string |
| `[aiueo]` | Salah satu huruf vokal |
| `+` | Satu atau lebih |
| `i` | Case-insensitive |

---

# Yang Saya Pelajari

Dari lab ini saya belajar:

- Membuat Pig Latin Translator.
- Menggunakan Regex pada awal string.
- Anchor `^`.
- Character class.
- Range dalam character class.
- Quantifier `+`.
- Flag `i`.
- `String.prototype.match()`.
- Hasil `match()` berupa array atau `null`.
- Mengambil hasil match menggunakan `[0]`.
- Menggunakan `.length`.
- `String.prototype.slice()`.
- Menggunakan kondisi `if / else if`.
- Menggabungkan Regex dengan manipulasi string.
- Memindahkan sebagian karakter dari awal string ke belakang.

---

## Catatan Pribadi

Hal paling penting dari lab ini adalah memahami bahwa:

```js
str.match(regex)
```

tidak hanya memberikan:

```text
true / false
```

tetapi memberikan **bagian teks yang benar-benar cocok**.

Contohnya:

```text
glove
```

dengan:

```regex
/^[b-df-hj-np-tv-z]+/i
```

menghasilkan:

```text
gl
```

Hasil tersebut bisa dipakai lagi:

```js
match1[0]
```

Kemudian panjangnya:

```js
match1[0].length
```

digunakan sebagai posisi untuk:

```js
str.slice(...)
```

Jadi pola berpikirnya:

```text
CARI POLA
↓
match()
↓
AMBIL HASIL MATCH
↓
match[0]
↓
GUNAKAN PANJANGNYA
↓
slice()
↓
SUSUN STRING BARU
```

Untuk kata yang dimulai konsonan:

```text
glove
↓
match = "gl"
↓
sisa = "ove"
↓
"ove" + "gl" + "ay"
↓
oveglay
```

Untuk kata yang dimulai vokal:

```text
eight
↓
vokal ditemukan di awal
↓
"eight" + "way"
↓
eightway
```

Perbedaan yang perlu saya ingat:

```js
regex.test(str)
```

biasanya digunakan ketika saya hanya ingin tahu:

```text
cocok atau tidak?
→ true / false
```

Sedangkan:

```js
str.match(regex)
```

berguna ketika saya membutuhkan:

```text
bagian mana yang cocok?
```

Karena di lab ini hasil match tersebut digunakan lagi untuk memotong dan menyusun ulang string.

---

**Platform:** freeCodeCamp  
**Lab:** Implement a Pig Latin Translator  
**Language:** JavaScript  
**Topic:** Regular Expressions, String Methods, Conditionals
