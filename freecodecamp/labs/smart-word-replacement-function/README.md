# Search and Replace with Case Preservation

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-Regex-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript Regex" />
  <img src="https://img.shields.io/badge/freeCodeCamp-Lab-0A0A23?logo=freecodecamp&logoColor=white" alt="freeCodeCamp Lab" />
  <img src="https://img.shields.io/badge/Topic-String%20Manipulation-4B5563" alt="String Manipulation" />
</p>

> **Milestone:** Lab Regex terakhir sebelum review materi dan Certification Project pertama.

Function `myReplace()` digunakan untuk mencari sebuah kata di dalam string, menggantinya dengan kata baru, dan tetap memperhatikan kapitalisasi kata yang ditemukan.

Contohnya:

```js
myReplace(
  "He is Sleeping on the couch",
  "Sleeping",
  "sitting"
);
```

menghasilkan:

```text
He is Sitting on the couch
```

Walaupun kata pengganti yang diberikan adalah:

```text
sitting
```

huruf `S` dibuat kapital karena kata yang digantikan sebelumnya adalah:

```text
Sleeping
```

---

## Source Code

```js
function myReplace(str, wordToBeReplaced, wordToReplaceItWith) {
  const regex = new RegExp(wordToBeReplaced, `gi`);

  return str.replace(regex, function(kataYangKetemu) {
    if (
      kataYangKetemu[0] ===
      kataYangKetemu[0].toUpperCase()
    ) {
      return (
        wordToReplaceItWith.charAt(0).toUpperCase() +
        wordToReplaceItWith.slice(1).toLowerCase()
      );
    }

    return wordToReplaceItWith.toLowerCase();
  });
}

console.log(
  myReplace(
    "Let us go to the store",
    "store",
    "mall"
  )
);

console.log(
  myReplace(
    "He is Sleeping on the couch",
    "Sleeping",
    "sitting"
  )
);

console.log(
  myReplace(
    "I think we should look up there",
    "up",
    "Down"
  )
);

console.log(
  myReplace(
    "This has a spellngi error",
    "spellngi",
    "spelling"
  )
);

console.log(
  myReplace(
    "His name is Tom",
    "Tom",
    "john"
  )
);
```

---

## Apa yang Dilakukan Function Ini?

Function menerima tiga parameter:

```js
function myReplace(
  str,
  wordToBeReplaced,
  wordToReplaceItWith
)
```

| Parameter | Fungsi |
|---|---|
| `str` | Kalimat asli |
| `wordToBeReplaced` | Kata yang ingin dicari dan diganti |
| `wordToReplaceItWith` | Kata penggantinya |

Contoh:

```js
myReplace(
  "His name is Tom",
  "Tom",
  "john"
);
```

Berarti:

| Data | Nilai |
|---|---|
| String asli | `"His name is Tom"` |
| Dicari | `"Tom"` |
| Pengganti | `"john"` |

Karena `"Tom"` dimulai dengan huruf kapital, `"john"` juga harus disesuaikan menjadi:

```text
John
```

Hasil akhirnya:

```text
His name is John
```

---

## 1. Membuat Regex Secara Dinamis

```js
const regex =
  new RegExp(wordToBeReplaced, `gi`);
```

Sebelumnya saya lebih sering membuat Regex seperti:

```js
/store/gi
```

Tetapi kali ini kata yang dicari berasal dari parameter:

```js
wordToBeReplaced
```

Karena nilainya baru diketahui ketika function dipanggil, Regex dibuat menggunakan:

```js
new RegExp()
```

Contoh:

```js
wordToBeReplaced = "store";
```

maka:

```js
new RegExp(wordToBeReplaced, "gi");
```

secara konsep menghasilkan:

```regex
/store/gi
```

### Flag yang digunakan

```text
g = global
i = case-insensitive
```

`g` membuat Regex mencari semua kecocokan.

`i` membuat pencarian tidak membedakan huruf besar dan kecil.

Jadi Regex:

```regex
/store/gi
```

dapat mengenali:

```text
store
Store
STORE
```

---

## 2. `replace()` Tidak Harus Menerima String

Bagian yang paling menarik dari lab ini:

```js
str.replace(regex, function(kataYangKetemu) {
  // ...
});
```

Sebelumnya saya mengenal bentuk seperti:

```js
str.replace(regex, "mall");
```

Tetapi parameter kedua `replace()` ternyata juga bisa berupa **callback function**.

```js
replace(regex, callback)
```

Callback tersebut akan dijalankan ketika Regex menemukan kecocokan.

---

## Apa Isi `kataYangKetemu`?

Pada kode:

```js
function(kataYangKetemu) {
```

`kataYangKetemu` berisi teks yang benar-benar ditemukan oleh Regex.

Misalnya:

```js
myReplace(
  "He is Sleeping on the couch",
  "Sleeping",
  "sitting"
);
```

Regex menemukan:

```text
Sleeping
```

maka di dalam callback:

```js
kataYangKetemu === "Sleeping"
```

Ini berguna karena program bisa melihat **bagaimana bentuk kata aslinya**, termasuk kapitalisasinya.

---

## 3. Mengecek Huruf Pertama

Kode berikut:

```js
kataYangKetemu[0]
```

mengambil karakter pertama.

Contoh:

```js
"Sleeping"[0]
```

hasil:

```text
S
```

Sedangkan:

```js
"store"[0]
```

hasil:

```text
s
```

---

## 4. Apakah Huruf Pertamanya Kapital?

Pengecekan dilakukan dengan:

```js
if (
  kataYangKetemu[0] ===
  kataYangKetemu[0].toUpperCase()
)
```

Misalnya:

```js
kataYangKetemu = "Sleeping";
```

maka:

```js
kataYangKetemu[0]
```

adalah:

```text
S
```

dan:

```js
kataYangKetemu[0].toUpperCase()
```

juga:

```text
S
```

Perbandingannya:

```js
"S" === "S"
```

menghasilkan:

```js
true
```

Artinya kata asli dimulai dengan huruf kapital.

---

## 5. Menyesuaikan Kapitalisasi Kata Pengganti

Jika kata asli dimulai dengan kapital:

```js
return (
  wordToReplaceItWith.charAt(0).toUpperCase() +
  wordToReplaceItWith.slice(1).toLowerCase()
);
```

Misalnya:

```text
wordToReplaceItWith = "sitting"
```

### Karakter pertama

```js
wordToReplaceItWith.charAt(0)
```

menghasilkan:

```text
s
```

Kemudian:

```js
.toUpperCase()
```

menjadi:

```text
S
```

### Sisa katanya

```js
wordToReplaceItWith.slice(1)
```

menghasilkan:

```text
itting
```

Kemudian dibuat lowercase:

```js
.toLowerCase()
```

tetap:

```text
itting
```

Terakhir keduanya digabung:

```text
S + itting
```

menjadi:

```text
Sitting
```

---

## 6. Jika Kata Asli Tidak Kapital

Jika kondisi sebelumnya `false`, program menjalankan:

```js
return wordToReplaceItWith.toLowerCase();
```

Contoh:

```js
myReplace(
  "I think we should look up there",
  "up",
  "Down"
);
```

Kata yang ditemukan:

```text
up
```

Huruf pertama:

```text
u
```

bukan kapital.

Walaupun replacement diberikan sebagai:

```text
Down
```

program mengubahnya menjadi:

```text
down
```

Hasil:

```text
I think we should look down there
```

---

## Trace Beberapa Contoh

### `"store"` menjadi `"mall"`

```js
myReplace(
  "Let us go to the store",
  "store",
  "mall"
);
```

| Tahap | Nilai |
|---|---|
| Match | `"store"` |
| Huruf pertama | `"s"` |
| Kapital? | Tidak |
| Replacement | `"mall"` |

Hasil:

```text
Let us go to the mall
```

---

### `"Sleeping"` menjadi `"sitting"`

```js
myReplace(
  "He is Sleeping on the couch",
  "Sleeping",
  "sitting"
);
```

| Tahap | Nilai |
|---|---|
| Match | `"Sleeping"` |
| Huruf pertama | `"S"` |
| Kapital? | Ya |
| Replacement awal | `"sitting"` |
| Replacement akhir | `"Sitting"` |

Hasil:

```text
He is Sitting on the couch
```

---

### `"up"` menjadi `"Down"`

```js
myReplace(
  "I think we should look up there",
  "up",
  "Down"
);
```

| Tahap | Nilai |
|---|---|
| Match | `"up"` |
| Huruf pertama | `"u"` |
| Kapital? | Tidak |
| Replacement awal | `"Down"` |
| Replacement akhir | `"down"` |

Hasil:

```text
I think we should look down there
```

---

### `"Tom"` menjadi `"john"`

```js
myReplace(
  "His name is Tom",
  "Tom",
  "john"
);
```

| Tahap | Nilai |
|---|---|
| Match | `"Tom"` |
| Huruf pertama | `"T"` |
| Kapital? | Ya |
| Replacement awal | `"john"` |
| Replacement akhir | `"John"` |

Hasil:

```text
His name is John
```

---

<details>
<summary><strong>Kenapa pakai callback di replace()?</strong></summary>

<br>

Kalau hanya menulis:

```js
str.replace(regex, wordToReplaceItWith);
```

replacement akan langsung dimasukkan tanpa kita sempat memeriksa bentuk teks yang ditemukan.

Dengan callback:

```js
str.replace(regex, function(kataYangKetemu) {
  // ...
});
```

saya mendapatkan akses ke:

```js
kataYangKetemu
```

sehingga saya bisa mengecek:

- Apakah huruf pertamanya kapital?
- Apakah replacement juga perlu dikapitalisasi?
- String apa yang akhirnya harus dikembalikan?

Callback membuat `replace()` menjadi lebih fleksibel daripada sekadar mengganti satu string dengan string lainnya.

</details>

---

## `charAt(0)` vs `[0]`

Di lab ini saya memakai keduanya:

```js
kataYangKetemu[0]
```

dan:

```js
wordToReplaceItWith.charAt(0)
```

Keduanya dapat digunakan untuk mengambil karakter pertama.

```js
"hello"[0]
```

hasil:

```text
h
```

dan:

```js
"hello".charAt(0)
```

juga:

```text
h
```

Jadi pada kasus ini fungsinya hampir sama, hanya cara penulisannya berbeda.

---

## Method yang Dipakai

| Method / Syntax | Kegunaan |
|---|---|
| `new RegExp()` | Membuat Regex dari nilai yang dinamis |
| `replace()` | Mengganti bagian string yang cocok |
| Callback `function(...)` | Memproses hasil match sebelum replacement |
| `[0]` | Mengambil karakter pertama |
| `charAt(0)` | Mengambil karakter pertama |
| `toUpperCase()` | Mengubah menjadi huruf kapital |
| `toLowerCase()` | Mengubah menjadi lowercase |
| `slice(1)` | Mengambil string mulai dari karakter kedua |

---

## Bagian yang Paling Penting Buat Saya

Ada tiga hal yang paling ingin saya ingat dari lab ini.

### `new RegExp()` untuk pola dinamis

Kalau pola sudah diketahui sejak awal:

```js
/store/gi
```

bisa menggunakan Regex literal.

Kalau pola berasal dari variable:

```js
wordToBeReplaced
```

bisa menggunakan:

```js
new RegExp(wordToBeReplaced, "gi");
```

---

### `replace()` bisa menerima callback

Bukan cuma:

```js
replace(regex, "replacement")
```

tetapi juga:

```js
replace(regex, function(match) {
  return "...";
});
```

Dengan cara ini saya bisa memeriksa match terlebih dahulu sebelum menentukan replacement.

---

### Callback mendapatkan teks yang ditemukan

Pada:

```js
str.replace(regex, function(kataYangKetemu) {
```

`kataYangKetemu` bukan seluruh string.

Isinya adalah **bagian yang cocok dengan Regex**.

Misalnya:

```text
He is Sleeping on the couch
```

Regex mencari:

```text
Sleeping
```

maka:

```js
kataYangKetemu
```

bernilai:

```text
Sleeping
```

Konsep ini penting karena hasil Regex ternyata bisa langsung digunakan untuk menentukan logic berikutnya.

---

## Catatan Kecil

Implementasi ini mempertahankan kapitalisasi berdasarkan **huruf pertama kata yang ditemukan**.

Jadi yang diperiksa adalah:

```js
kataYangKetemu[0]
```

bukan seluruh pola kapitalisasi kata.

Untuk kebutuhan lab ini, pendekatan tersebut sudah cukup untuk menentukan apakah replacement harus dimulai dengan uppercase atau lowercase.

---

## What I Practiced

```text
Regular Expressions
Dynamic RegExp
String.replace()
Replace callback
Case handling
String indexing
charAt()
slice()
toUpperCase()
toLowerCase()
Conditional logic
```

---

<p align="center">
  <strong>Regex Section — Completed</strong><br>
  <sub>Next stop: review questions & first Certification Project.</sub>
</p>

---

**Platform:** freeCodeCamp  
**Lab:** Search and Replace  
**Language:** JavaScript  
**Focus:** Regular Expressions & String Manipulation
