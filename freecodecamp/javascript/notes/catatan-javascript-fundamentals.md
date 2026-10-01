# JavaScript Fundamentals

Catatan ini berisi beberapa konsep dasar JavaScript yang penting untuk dipahami. Fokusnya bukan menghafal syntax, tetapi memahami **apa fungsi tiap fitur dan kapan biasanya dipakai**.

---

## String Constructor dan `toString()`

### `String` Constructor

JavaScript punya constructor `String` untuk membuat object string.

```js
const greetingObject = new String("Hello, world!");

console.log(typeof greetingObject); // "object"
```

Perlu diperhatikan bahwa:

```js
new String("Hello")
```

menghasilkan **object**, bukan string primitive biasa.

Dalam penggunaan sehari-hari, kita lebih sering memakai string biasa seperti:

```js
const greeting = "Hello";
```

### Method `toString()`

`toString()` digunakan untuk mengubah suatu nilai menjadi bentuk string.

Contoh dengan number:

```js
const num = 10;

console.log(num.toString()); // "10"
```

Contoh dengan array:

```js
const arr = [1, 2, 3];

console.log(arr.toString()); // "1,2,3"
```

Untuk number, `toString()` juga bisa menerima **radix**, yaitu basis angka dari `2` sampai `36`.

Contoh mengubah angka desimal menjadi biner:

```js
const num = 10;

console.log(num.toString(2)); // "1010"
```

Di sini:

```text
2 = biner
8 = oktal
10 = desimal
16 = heksadesimal
```

Kalau radix tidak ditulis, JavaScript menggunakan basis `10`.

---

## Number Constructor

`Number` digunakan untuk membuat atau mengubah nilai menjadi number.

Jika memakai `new Number()`, hasilnya berupa object:

```js
const myNum = new Number("34");

console.log(typeof myNum); // "object"
```

Tetapi yang lebih sering dipakai adalah `Number()` tanpa `new` untuk melakukan konversi:

```js
const num = Number("100");

console.log(num);        // 100
console.log(typeof num); // "number"
```

Contoh lain:

```js
Number("25");   // 25
Number("3.14"); // 3.14
Number(true);   // 1
Number(false);  // 0
```

Jadi salah satu kegunaan utama `Number()` adalah **mengubah tipe data lain menjadi number**.

---

## Penamaan Variable dan Function

Nama variable dan function sebaiknya menjelaskan isi atau pekerjaannya.

### camelCase

JavaScript biasanya memakai gaya penulisan `camelCase`.

Contoh:

```js
let userName = "Bintang";
let totalPrice = 10000;
let isLoading = true;
```

Kata pertama menggunakan huruf kecil, sedangkan kata berikutnya dimulai dengan huruf besar.

### Penamaan Boolean

Untuk variable boolean, biasanya digunakan awalan seperti:

```text
is
has
can
```

Contoh:

```js
let isLoading = true;
let hasPermission = false;
let canEdit = true;
```

Nama tersebut membuat maksud variable lebih mudah dibaca.

### Penamaan Function

Nama function sebaiknya menggambarkan pekerjaan yang dilakukan.

Contoh:

```js
function getUserData() {
  // mengambil data user
}

function isValidEmail(email) {
  // mengecek apakah email valid
}

function setUserPreferences(preferences) {
  // mengatur preferensi user
}

function handleClick() {
  // menangani event click
}
```

Beberapa pola nama yang sering digunakan:

```text
get...    = mengambil data
set...    = mengatur atau mengubah data
is...     = mengecek kondisi true/false
has...    = mengecek apakah sesuatu tersedia
can...    = mengecek apakah sesuatu boleh dilakukan
handle... = menangani event
```

### Variable pada Loop

Untuk index loop biasanya digunakan:

```js
i
j
k
```

Contoh:

```js
for (let i = 0; i < array.length; i++) {
  // ...
}
```

Kalau ada nested loop:

```js
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    // ...
  }
}
```

Biasanya `i` untuk loop luar dan `j` untuk loop di dalamnya.

---

## Sparse Array

JavaScript memungkinkan array mempunyai slot kosong.

Contoh:

```js
const sparseArray = [1, , , 4];

console.log(sparseArray.length); // 4
```

Array tersebut mempunyai panjang `4`, walaupun ada dua posisi yang kosong.

Slot kosong berbeda dengan nilai `undefined`.

Contoh:

```js
const a = [1, , 3];
const b = [1, undefined, 3];
```

Keduanya terlihat mirip, tetapi secara internal tidak sama.

Array yang memiliki slot kosong seperti ini disebut **sparse array**.

---

## Linters dan Formatters

### Linter

Linter membantu memeriksa kode untuk menemukan:

- kemungkinan bug,
- kesalahan penulisan,
- pola kode yang mencurigakan,
- masalah style.

Contoh linter yang populer:

```text
ESLint
```

Linter bisa dianggap seperti pemeriksa kode.

### Formatter

Formatter bertugas merapikan tampilan kode secara otomatis.

Contoh formatter populer:

```text
Prettier
```

Misalnya kode:

```js
const nama="Bintang"
```

bisa dirapikan menjadi:

```js
const nama = "Bintang";
```

Singkatnya:

```text
ESLint   → memeriksa kode
Prettier → merapikan kode
```

---

## Memory Management

Memory management adalah proses mengatur penggunaan memory oleh program.

Program membutuhkan memory untuk menyimpan hal seperti:

```text
variable
array
object
function
data sementara
```

JavaScript menggunakan **automatic memory management**.

Artinya, kita tidak perlu menghapus memory secara manual setiap kali sebuah variable sudah tidak digunakan.

JavaScript engine akan mengurus proses tersebut secara otomatis.

Proses membersihkan data yang sudah tidak digunakan lagi disebut:

```text
garbage collection
```

Gambaran sederhananya:

```text
data masih digunakan
→ tetap disimpan

data sudah tidak bisa digunakan lagi
→ bisa dibersihkan oleh garbage collector
```

---

## Closures

Closure terjadi ketika sebuah function masih bisa mengakses variable dari scope luar, meskipun function luarnya sudah selesai dijalankan.

Contoh:

```js
function outerFunction(x) {
  let y = 10;

  function innerFunction() {
    console.log(x + y);
  }

  return innerFunction;
}

let closure = outerFunction(5);

closure(); // 15
```

Alurnya:

```text
outerFunction(5)
↓
x = 5
y = 10
↓
innerFunction dikembalikan
↓
outerFunction selesai
↓
innerFunction tetap bisa mengingat x dan y
```

Saat:

```js
closure();
```

dipanggil, hasilnya:

```text
5 + 10 = 15
```

Jadi inti closure adalah:

> Sebuah function dapat tetap "mengingat" variable dari lingkungan tempat function itu dibuat.

---

## `var` dan Hoisting

### `var`

Sebelum `let` dan `const` diperkenalkan, JavaScript banyak menggunakan `var`.

Sekarang, kode JavaScript modern biasanya lebih memilih:

```js
let
const
```

karena aturan scope-nya lebih mudah dipahami.

### Redeclare dengan `var`

`let` tidak boleh dideklarasikan ulang pada scope yang sama:

```js
let num = 19;
let num = 18; // SyntaxError
```

Sedangkan `var` memperbolehkannya:

```js
var myNum = 5;
var myNum = 10;

console.log(myNum); // 10
```

Hal seperti ini bisa membuat kode lebih mudah menimbulkan bug.

### Scope pada `var`

`var` tidak mengikuti block scope seperti `let` dan `const`.

Contoh:

```js
if (true) {
  var num = 5;
}

console.log(num); // 5
```

Walaupun `num` dibuat di dalam block `if`, variable tersebut masih bisa digunakan di luar block.

Dengan `let`:

```js
if (true) {
  let num = 5;
}

console.log(num); // ReferenceError
```

---

## Hoisting

Hoisting adalah perilaku JavaScript yang memproses declaration sebelum kode dijalankan.

Contoh dengan `var`:

```js
console.log(num); // undefined

var num = 5;

console.log(num); // 5
```

Secara sederhana, declaration `var num` sudah diketahui JavaScript lebih dulu, tetapi nilainya belum `5`.

Kurang lebih bisa dibayangkan seperti:

```js
var num;

console.log(num); // undefined

num = 5;
```

### Hoisting pada Function Declaration

Function declaration bisa dipanggil sebelum ditulis:

```js
sayHello();

function sayHello() {
  console.log("Hello, World!");
}
```

Hasil:

```text
Hello, World!
```

Karena nama dan isi function declaration ikut diproses saat hoisting.

### `let`, `const`, dan Temporal Dead Zone

`let` dan `const` juga diproses oleh JavaScript sebelum eksekusi, tetapi tidak boleh digunakan sebelum baris deklarasinya.

Contoh:

```js
console.log(num);

let num = 10;
```

Hasilnya:

```text
ReferenceError
```

Area sebelum deklarasi `let` atau `const` dapat digunakan disebut **Temporal Dead Zone (TDZ)**.

Untuk pemakaian sehari-hari, aturan paling aman adalah:

> Deklarasikan variable terlebih dahulu sebelum digunakan.

---

## Imports, Exports, dan Modules

Module digunakan untuk membagi program JavaScript menjadi beberapa file agar kode tidak menumpuk di satu tempat.

Misalnya:

```text
project/
├── math.js
└── main.js
```

### Export

`export` digunakan agar variable, function, atau class dari satu file bisa digunakan oleh file lain.

Ada dua jenis yang umum:

```text
named export
default export
```

### Named Export

Di `math.js`:

```js
export function add(num1, num2) {
  return num1 + num2;
}
```

Untuk mengambilnya:

```js
import { add } from "./math.js";
```

Nama import harus sama dengan nama yang di-export.

---

### Default Export

Di `math.js`:

```js
export default function subtract(num1, num2) {
  return num1 - num2;
}
```

Import-nya:

```js
import subtractFunc from "./math.js";
```

Pada default import, nama yang dipakai saat import boleh berbeda.

---

### Namespace Import

Kalau ingin mengambil semua export dari satu file:

```js
import * as Math from "./math.js";
```

Kemudian digunakan seperti:

```js
console.log(Math.add(5, 3));
```

---

## Contoh Lengkap Module

`math.js`:

```js
export function add(num1, num2) {
  return num1 + num2;
}

export default function subtract(num1, num2) {
  return num1 - num2;
}
```

`main.js`:

```js
import subtractFunc, { add } from "./math.js";
import * as Math from "./math.js";

console.log(add(5, 3));          // 8
console.log(subtractFunc(5, 3)); // 2
console.log(Math.add(5, 3));     // 8
```

Mental model sederhananya:

```text
export
= file menyediakan sesuatu

import
= file lain memakai sesuatu
```

---

## Ringkasan

Beberapa hal utama dari catatan ini:

- `String()` dan `Number()` bisa digunakan untuk melakukan konversi tipe data.
- `toString()` mengubah nilai menjadi string.
- Gunakan nama variable dan function yang menjelaskan maksudnya.
- Sparse array adalah array yang memiliki slot kosong.
- ESLint membantu memeriksa kode, sedangkan Prettier membantu merapikannya.
- JavaScript mengatur memory secara otomatis melalui garbage collection.
- Closure membuat function dapat mengingat variable dari scope luarnya.
- `var` memiliki aturan scope dan hoisting yang berbeda dari `let` dan `const`.
- Function declaration dapat dipanggil sebelum ditulis karena hoisting.
- `let` dan `const` tidak boleh digunakan sebelum deklarasinya.
- `export` menyediakan kode untuk file lain dan `import` mengambilnya.
- Modules membantu memecah program menjadi beberapa file dengan tanggung jawab yang lebih jelas.
