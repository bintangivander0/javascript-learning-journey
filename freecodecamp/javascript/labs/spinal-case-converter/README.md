# Implement a Spinal Case Converter

Lab ini membuat function untuk mengubah sebuah string menjadi format **spinal case**.

Spinal case adalah format teks di mana:

- Semua huruf menjadi lowercase.
- Setiap kata dipisahkan dengan tanda `-`.
- Spasi dan underscore dihilangkan.
- CamelCase juga dipisahkan menjadi kata-kata.

Contoh:

```text
This Is Spinal Tap
↓
this-is-spinal-tap
```

```text
ThisIsSpinalTap
↓
this-is-spinal-tap
```

```text
The_Andy_Griffith_Show
↓
the-andy-griffith-show
```

---

## JavaScript

```js
function spinalCase(str) {
  return str
    .trim()
    .split(/(?=[A-Z])|\s+|_+/)
    .join("-")
    .toLowerCase();
}

console.log(spinalCase("This Is Spinal Tap"));

console.log(spinalCase("ThisIsSpinalTap"));

console.log(spinalCase("The_Andy_Griffith_Show"));
```

Output:

```text
this-is-spinal-tap
this-is-spinal-tap
the-andy-griffith-show
```

---

# Alur Program

Secara sederhana:

```text
STRING
↓
trim()
↓
split menggunakan Regex
↓
menjadi array kata
↓
join("-")
↓
gabungkan menggunakan tanda -
↓
toLowerCase()
↓
SPINAL CASE
```

Contoh:

```text
"This Is Spinal Tap"
↓
["This", "Is", "Spinal", "Tap"]
↓
"This-Is-Spinal-Tap"
↓
"this-is-spinal-tap"
```

---

# Function `spinalCase()`

Function menerima satu parameter:

```js
function spinalCase(str) {

}
```

`str` merupakan string yang ingin diubah menjadi spinal case.

Contoh:

```js
spinalCase("This Is Spinal Tap");
```

Nilai `str`:

```text
This Is Spinal Tap
```

Kemudian string tersebut diproses menggunakan beberapa method yang dirangkai dengan **method chaining**.

---

# Method Chaining

Kode utama:

```js
return str
  .trim()
  .split(/(?=[A-Z])|\s+|_+/)
  .join("-")
  .toLowerCase();
```

Disebut method chaining karena hasil dari satu method langsung digunakan oleh method berikutnya.

Mental model:

```text
str
↓
trim()
↓
split()
↓
join()
↓
toLowerCase()
↓
return
```

Jadi data terus berubah sampai akhirnya menjadi format yang diinginkan.

---

# `trim()`

Bagian pertama:

```js
str.trim()
```

`trim()` menghapus whitespace yang berada di:

```text
awal string
dan
akhir string
```

Contoh:

```js
"   Hello World   ".trim();
```

menjadi:

```text
Hello World
```

`trim()` tidak menghapus spasi yang berada di tengah string.

Contoh:

```text
"Hello World"
      ↑
spasi ini tetap ada
```

---

# `split()`

Setelah dibersihkan dengan `trim()`, string dipecah menggunakan:

```js
.split(/(?=[A-Z])|\s+|_+/)
```

Biasanya `split()` bisa menggunakan string sederhana:

```js
"hello world".split(" ");
```

hasilnya:

```js
["hello", "world"]
```

Tetapi pada lab ini kita harus menangani beberapa bentuk pemisah sekaligus:

```text
CamelCase
spasi
underscore
```

Karena itu digunakan **Regular Expression**.

---

# Regex yang Digunakan

Regex:

```regex
/(?=[A-Z])|\s+|_+/
```

Jika dipisahkan, terdapat tiga pola:

```regex
(?=[A-Z])
```

atau:

```regex
\s+
```

atau:

```regex
_+
```

Operator:

```regex
|
```

berarti:

```text
ATAU
```

Jadi Regex tersebut dapat dibaca:

```text
pisahkan string ketika:

menemukan posisi sebelum huruf kapital

ATAU

menemukan satu atau lebih whitespace

ATAU

menemukan satu atau lebih underscore
```

---

# Positive Lookahead `(?=...)`

Bagian yang paling menarik adalah:

```regex
(?=[A-Z])
```

Ini disebut **positive lookahead**.

Strukturnya:

```regex
(?=...)
```

berarti:

> Cek apakah setelah posisi sekarang terdapat pola tertentu.

Pada kode ini:

```regex
(?=[A-Z])
```

artinya:

> Cari posisi yang tepat sebelum huruf kapital `A-Z`.

Yang perlu diperhatikan:

**lookahead hanya mengecek posisi.**

Huruf kapitalnya tidak ikut dihapus.

Contoh:

```text
ThisIsSpinalTap
```

Regex melihat:

```text
This|Is|Spinal|Tap
    ↑ ↑      ↑
 posisi sebelum huruf kapital
```

Sehingga:

```js
"ThisIsSpinalTap".split(/(?=[A-Z])/);
```

menghasilkan:

```js
["This", "Is", "Spinal", "Tap"]
```

Ini berbeda dengan Regex yang benar-benar mengambil karakter sebagai pemisah.

---

# Character Class `[A-Z]`

Di dalam:

```regex
(?=[A-Z])
```

terdapat:

```regex
[A-Z]
```

Ini merupakan **character class**.

Artinya:

```text
satu karakter
dari huruf A sampai Z
```

Contoh yang cocok:

```text
A
B
C
D
...
Z
```

Digabung dengan lookahead:

```regex
(?=[A-Z])
```

berarti:

```text
cari posisi sebelum huruf kapital
```

---

# Memisahkan CamelCase

Contoh:

```text
ThisIsSpinalTap
```

Regex:

```regex
(?=[A-Z])
```

menemukan posisi sebelum:

```text
I
S
T
```

Secara konsep:

```text
This|Is|Spinal|Tap
```

Setelah `split()`:

```js
[
  "This",
  "Is",
  "Spinal",
  "Tap"
]
```

Dengan begitu CamelCase dapat diubah menjadi beberapa kata.

---

# `\s+`

Bagian kedua:

```regex
\s+
```

`\s` berarti:

```text
whitespace
```

Contohnya:

```text
spasi
tab
line break
```

Sedangkan:

```regex
+
```

berarti:

```text
satu atau lebih
```

Jadi:

```regex
\s+
```

berarti:

> Satu atau lebih whitespace berturut-turut.

Contoh:

```text
This Is Spinal Tap
```

akan dipisahkan menjadi:

```js
["This", "Is", "Spinal", "Tap"]
```

Bahkan jika terdapat beberapa spasi:

```text
This    Is    Spinal    Tap
```

`\s+` tetap dapat menangkapnya sebagai pemisah.

---

# `_+`

Bagian ketiga:

```regex
_+
```

Artinya:

```text
satu atau lebih karakter _
```

Contoh:

```text
The_Andy_Griffith_Show
```

secara konsep menjadi:

```text
The|Andy|Griffith|Show
```

Kemudian:

```js
[
  "The",
  "Andy",
  "Griffith",
  "Show"
]
```

Jadi underscore digunakan sebagai pemisah kata.

---

# Operator Alternation `|`

Regex:

```regex
/(?=[A-Z])|\s+|_+/
```

memakai:

```regex
|
```

yang berarti:

```text
ATAU
```

Maka dapat dibaca:

```text
(?=[A-Z])
ATAU
\s+
ATAU
_+
```

Mental model:

```text
huruf kapital berikutnya?
        │
        ├── YA → pisahkan
        │
whitespace?
        │
        ├── YA → pisahkan
        │
underscore?
        │
        └── YA → pisahkan
```

---

# Hasil dari `split()`

Misalnya:

```js
"This Is Spinal Tap"
  .split(/(?=[A-Z])|\s+|_+/);
```

hasil:

```js
[
  "This",
  "Is",
  "Spinal",
  "Tap"
]
```

Sedangkan:

```js
"ThisIsSpinalTap"
  .split(/(?=[A-Z])|\s+|_+/);
```

hasilnya juga:

```js
[
  "This",
  "Is",
  "Spinal",
  "Tap"
]
```

Dan:

```js
"The_Andy_Griffith_Show"
  .split(/(?=[A-Z])|\s+|_+/);
```

juga menghasilkan:

```js
[
  "The",
  "Andy",
  "Griffith",
  "Show"
]
```

Jadi meskipun format input berbeda, hasil array-nya bisa dibuat sama.

---

# `join("-")`

Setelah string berubah menjadi array:

```js
[
  "This",
  "Is",
  "Spinal",
  "Tap"
]
```

kita menggunakan:

```js
.join("-")
```

untuk menggabungkannya kembali.

Hasil:

```text
This-Is-Spinal-Tap
```

`"-"` digunakan sebagai pemisah setiap elemen array.

Perbandingan:

```js
["This", "Is"].join(" ");
```

hasil:

```text
This Is
```

Sedangkan:

```js
["This", "Is"].join("-");
```

hasil:

```text
This-Is
```

---

# `toLowerCase()`

Langkah terakhir:

```js
.toLowerCase()
```

mengubah seluruh huruf menjadi lowercase.

Sebelumnya:

```text
This-Is-Spinal-Tap
```

setelah:

```js
.toLowerCase()
```

menjadi:

```text
this-is-spinal-tap
```

Dan inilah hasil akhir spinal case.

---

# Contoh Proses Lengkap

Input:

```text
This Is Spinal Tap
```

### 1. `trim()`

```text
This Is Spinal Tap
```

### 2. `split()`

```js
["This", "Is", "Spinal", "Tap"]
```

### 3. `join("-")`

```text
This-Is-Spinal-Tap
```

### 4. `toLowerCase()`

```text
this-is-spinal-tap
```

---

# Contoh CamelCase

Input:

```text
ThisIsSpinalTap
```

Regex:

```regex
(?=[A-Z])
```

membantu menemukan posisi sebelum huruf kapital.

```text
This|Is|Spinal|Tap
```

Kemudian:

```text
ThisIsSpinalTap

↓ split()

["This", "Is", "Spinal", "Tap"]

↓ join("-")

This-Is-Spinal-Tap

↓ toLowerCase()

this-is-spinal-tap
```

---

# Contoh Underscore

Input:

```text
The_Andy_Griffith_Show
```

Bagian:

```regex
_+
```

menangani underscore.

```text
The_Andy_Griffith_Show

↓ split()

["The", "Andy", "Griffith", "Show"]

↓ join("-")

The-Andy-Griffith-Show

↓ toLowerCase()

the-andy-griffith-show
```

---

# Kenapa Tidak Cukup `split(" ")`?

Jika hanya menggunakan:

```js
str.split(" ")
```

maka:

```text
This Is Spinal Tap
```

bisa dipisahkan.

Tetapi:

```text
ThisIsSpinalTap
```

tidak bisa.

Begitu juga:

```text
The_Andy_Griffith_Show
```

tidak bisa.

Karena itu digunakan Regex:

```regex
/(?=[A-Z])|\s+|_+/
```

agar beberapa bentuk pemisah dapat ditangani sekaligus.

---

# Ringkasan Regex

```regex
/(?=[A-Z])|\s+|_+/
```

| Bagian | Arti |
|---|---|
| `(?=...)` | Positive lookahead |
| `[A-Z]` | Huruf kapital A sampai Z |
| `(?=[A-Z])` | Posisi sebelum huruf kapital |
| `\s` | Whitespace |
| `+` | Satu atau lebih |
| `\s+` | Satu atau lebih whitespace |
| `_+` | Satu atau lebih underscore |
| `\|` | Alternation / ATAU |

> Catatan: pada regex aslinya operator alternation ditulis `|`. Backslash pada tabel di atas hanya digunakan agar simbol pipe dapat ditampilkan dengan aman dalam tabel Markdown.

---

# Yang Saya Pelajari

Dari lab ini saya belajar:

- Membuat function yang mengubah format sebuah string.
- Method chaining.
- `trim()`.
- `split()`.
- `join()`.
- `toLowerCase()`.
- Regular Expressions.
- Positive lookahead `(?=...)`.
- Character class `[A-Z]`.
- Whitespace `\s`.
- Quantifier `+`.
- Alternation `|`.
- Memisahkan CamelCase menggunakan Regex.
- Menangani beberapa format input dengan satu pola Regex.

---

## Catatan Pribadi

Hal yang paling ingin saya ingat dari lab ini adalah:

```regex
(?=[A-Z])
```

Ini bukan berarti:

> ambil huruf kapital.

Tetapi:

> cari **posisi tepat sebelum** huruf kapital.

Karena itu:

```text
ThisIsSpinalTap
```

dapat dipandang sebagai:

```text
This|Is|Spinal|Tap
```

tanpa menghapus huruf:

```text
I
S
T
```

Pola utama function:

```text
INPUT STRING
↓
trim
↓
split dengan Regex
↓
ARRAY OF WORDS
↓
join dengan "-"
↓
lowercase
↓
SPINAL CASE
```

Kode ringkasnya:

```js
function spinalCase(str) {
  return str
    .trim()
    .split(/(?=[A-Z])|\s+|_+/)
    .join("-")
    .toLowerCase();
}
```

Yang menarik, satu Regex:

```regex
/(?=[A-Z])|\s+|_+/
```

bisa menangani tiga bentuk input berbeda:

```text
This Is Spinal Tap
→ berdasarkan spasi

ThisIsSpinalTap
→ berdasarkan huruf kapital

The_Andy_Griffith_Show
→ berdasarkan underscore
```

Semua akhirnya menjadi:

```text
this-is-spinal-tap
```

atau format spinal case yang setara.

---

**Platform:** freeCodeCamp  
**Lab:** Implement a Spinal Case Converter  
**Language:** JavaScript  
**Topic:** Regular Expressions, String Methods, Method Chaining
