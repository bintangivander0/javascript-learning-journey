# Build an Envelope Budget App

<table align="center">
  <tr>
    <td><img src="assets/envelope-budgeter-surplus.png" alt="Envelope Budgeter saat budget masih tersisa" /></td>
    <td><img src="assets/envelope-budgeter-deficit.png" alt="Envelope Budgeter saat pengeluaran melebihi budget" /></td>
  </tr>
</table>

Workshop ini membuat aplikasi budget sederhana dengan konsep **envelope budgeting**. Pengguna memasukkan pendapatan bulanan, biaya sewa, serta pengeluaran dari kategori Food, Utilities, dan Entertainment.

Aplikasi kemudian menghitung total pengeluaran dan menunjukkan apakah budget masih tersisa atau justru sudah melebihi pendapatan.

Project ini menjadi workshop pertama saya pada bab **Form Validation** di JavaScript Certification freeCodeCamp.

## Fitur

- Memasukkan total pendapatan bulanan.
- Memasukkan biaya sewa.
- Menambahkan pengeluaran baru secara dinamis.
- Memilih kategori pengeluaran: Food, Utilities, atau Entertainment.
- Menjumlahkan seluruh pengeluaran.
- Menghitung sisa budget.
- Menampilkan status **surplus** jika masih ada sisa uang.
- Menampilkan status **deficit** jika pengeluaran melebihi pendapatan.
- Mengecek bentuk input tertentu yang tidak diinginkan.
- Mengosongkan form dan hasil perhitungan dengan tombol Clear.

## Struktur Project

```text
index.html
styles.css
script.js
assets/
├── envelope-budgeter-surplus.png
└── envelope-budgeter-deficit.png
```

## JavaScript

```js
const budgetForm = document.getElementById("budget-form");
const incomeInput = document.getElementById("income");
const rentInput = document.getElementById("rent-amount");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const category = entryDropdown.value;
  const targetInputContainer =
    document.querySelector(`#${category} .input-container`);

  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
  <label for="${category}-${entryNumber}-name">Expense ${entryNumber} Name</label>
  <input type="text" id="${category}-${entryNumber}-name" placeholder="Name" />
  <label for="${category}-${entryNumber}-amount">Expense ${entryNumber} Amount</label>
  <input
    type="number"
    min="0"
    id="${category}-${entryNumber}-amount"
    placeholder="Amount"
  />`;

  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateBudget(e) {
  e.preventDefault();
  isError = false;

  const foodInputs =
    document.querySelectorAll("#food input[type='number']");

  const utilitiesInputs =
    document.querySelectorAll("#utilities input[type='number']");

  const entertainmentInputs =
    document.querySelectorAll("#entertainment input[type='number']");

  const rent = getTotalFromInputs([rentInput]);
  const food = getTotalFromInputs(foodInputs);
  const utilities = getTotalFromInputs(utilitiesInputs);
  const entertainment = getTotalFromInputs(entertainmentInputs);
  const income = getTotalFromInputs([incomeInput]);

  if (isError) {
    return;
  }

  const expenses = rent + food + utilities + entertainment;
  const netRemaining = income - expenses;

  let statusText = "";
  let statusClass = "";

  if (netRemaining < 0) {
    statusText = `Over Budget by $${Math.abs(netRemaining)}`;
    statusClass = "deficit";
  } else {
    statusText = `$${netRemaining} Remaining`;
    statusClass = "surplus";
  }

  output.innerHTML = `
    <span class="${statusClass}">${statusText}</span>
    <hr>
    <p>$${income} Total Income</p>
    <p>$${expenses} Total Expenses</p>
  `;

  output.classList.remove("hide");
}

function getTotalFromInputs(list) {
  let total = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }

    total += Number(currVal);
  }

  return total;
}

function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  incomeInput.value = "";
  rentInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
budgetForm.addEventListener("submit", calculateBudget);
clearButton.addEventListener("click", clearForm);
```

## `cleanInputString()`

```js
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}
```

Regex:

```regex
/[+-\s]/g
```

mencari karakter `+`, `-`, dan whitespace. Semua karakter yang cocok kemudian dihapus dengan:

```js
str.replace(regex, "");
```

Function ini menghasilkan versi string input yang sudah dibersihkan sebelum nilainya diubah menjadi number.

## `isInvalidInput()`

```js
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
```

Regex:

```regex
/\d+e\d+/i
```

mencari pola angka yang menggunakan huruf `e`, seperti bentuk scientific notation.

Bagian-bagiannya:

```text
\d+  = satu atau lebih digit
e    = huruf e
\d+  = satu atau lebih digit
i    = tidak membedakan e dan E
```

`match()` menghasilkan data kecocokan jika pola ditemukan dan `null` jika tidak ditemukan.

## Menambahkan Expense Secara Dinamis

```js
function addEntry() {
  const category = entryDropdown.value;
```

Nilai dropdown menentukan kategori yang dipilih:

```text
food
utilities
entertainment
```

Container tujuan kemudian dicari dengan:

```js
document.querySelector(`#${category} .input-container`);
```

Jika `category` bernilai:

```text
utilities
```

selector yang dibentuk menjadi:

```css
#utilities .input-container
```

Input baru akan dimasukkan ke kategori tersebut.

### Menentukan nomor expense

```js
const entryNumber =
  targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
```

Program menghitung jumlah input nama expense yang sudah ada.

Jika belum ada input:

```text
length = 0
```

maka:

```text
entryNumber = 1
```

Expense berikutnya menjadi `Expense 2`, kemudian `Expense 3`, dan seterusnya.

### Membuat HTML dari JavaScript

```js
const HTMLString = `...`;
```

Template literal digunakan untuk membuat pasangan label dan input baru.

Nilai:

```js
${category}
```

dan:

```js
${entryNumber}
```

dimasukkan langsung ke dalam HTML string.

Setelah itu:

```js
targetInputContainer.insertAdjacentHTML(
  "beforeend",
  HTMLString
);
```

menambahkan HTML baru ke bagian akhir container tanpa mengganti input yang sudah ada.

## Form `submit` dan `preventDefault()`

Perhitungan dijalankan ketika form dikirim:

```js
budgetForm.addEventListener(
  "submit",
  calculateBudget
);
```

Di awal `calculateBudget()` terdapat:

```js
e.preventDefault();
```

Submit form mempunyai perilaku bawaan browser. Pada aplikasi ini perilaku tersebut dihentikan karena seluruh perhitungan dilakukan langsung dengan JavaScript.

Setelah `preventDefault()` dipanggil, function `calculateBudget()` tetap lanjut menjalankan kode di bawahnya.

## Mengambil Input dari Tiap Kategori

```js
const foodInputs =
  document.querySelectorAll("#food input[type='number']");
```

Pola yang sama digunakan untuk Utilities dan Entertainment.

Jika pengguna menambahkan beberapa pengeluaran pada kategori Food, seluruh input number di dalam `#food` masuk ke `foodInputs`.

## `getTotalFromInputs()`

```js
function getTotalFromInputs(list) {
  let total = 0;

  for (const item of list) {
    ...
  }

  return total;
}
```

Function menerima kumpulan input lalu membaca setiap elemen dengan `for...of`.

Setiap nilai diproses dengan urutan:

```text
item.value
cleanInputString()
isInvalidInput()
Number()
ditambahkan ke total
```

### Kenapa Rent dan Income dibungkus array?

```js
getTotalFromInputs([rentInput]);
getTotalFromInputs([incomeInput]);
```

Rent dan Income masing-masing hanya memiliki satu elemen input.

Namun `getTotalFromInputs()` dirancang menerima sesuatu yang bisa di-loop menggunakan:

```js
for...of
```

Karena itu satu elemen tersebut dibungkus menjadi array agar function yang sama tetap dapat digunakan.

## `isError`

Di awal file:

```js
let isError = false;
```

Saat perhitungan baru dimulai:

```js
isError = false;
```

Jika ditemukan input tidak valid:

```js
isError = true;
```

Kemudian `calculateBudget()` melakukan pengecekan:

```js
if (isError) {
  return;
}
```

Jadi hasil budget tidak dilanjutkan jika proses pembacaan input menemukan error.

## Menghitung Expenses dan Sisa Budget

```js
const expenses =
  rent + food + utilities + entertainment;
```

Semua kategori pengeluaran dijumlahkan.

Kemudian:

```js
const netRemaining =
  income - expenses;
```

menghasilkan sisa budget.

## Surplus dan Deficit

Jika:

```js
netRemaining < 0
```

pengeluaran sudah melebihi pendapatan.

```js
statusText =
  `Over Budget by $${Math.abs(netRemaining)}`;

statusClass = "deficit";
```

`Math.abs()` mengubah nilai negatif menjadi nilai positif untuk kebutuhan tampilan.

Contoh:

```text
netRemaining = -300
```

maka:

```js
Math.abs(-300)
```

menghasilkan:

```text
300
```

sehingga output menjadi:

```text
Over Budget by $300
```

Jika hasil tidak negatif:

```js
statusText =
  `$${netRemaining} Remaining`;

statusClass = "surplus";
```

## Menampilkan Hasil

```js
output.innerHTML = `
  <span class="${statusClass}">${statusText}</span>
  <hr>
  <p>$${income} Total Income</p>
  <p>$${expenses} Total Expenses</p>
`;
```

`innerHTML` digunakan karena output yang dibuat mengandung elemen HTML.

Class hasil dimasukkan secara dinamis:

```text
surplus
```

atau:

```text
deficit
```

Setelah itu:

```js
output.classList.remove("hide");
```

membuat output yang sebelumnya tersembunyi menjadi terlihat.

## Tombol Clear

```js
function clearForm() {
```

Semua `.input-container` diambil dengan:

```js
document.querySelectorAll(".input-container")
```

lalu diubah menjadi array:

```js
Array.from(...)
```

Setiap container kemudian dikosongkan:

```js
container.innerHTML = "";
```

Ini menghapus input dinamis dari Food, Utilities, dan Entertainment.

Income dan Rent tidak berada di dalam `.input-container`, sehingga nilainya dikosongkan secara terpisah:

```js
incomeInput.value = "";
rentInput.value = "";
```

Output juga direset:

```js
output.innerText = "";
output.classList.add("hide");
```

## Event Listener yang Digunakan

Project mempunyai tiga interaksi utama:

```js
addEntryButton.addEventListener(
  "click",
  addEntry
);
```

untuk menambahkan expense baru.

```js
budgetForm.addEventListener(
  "submit",
  calculateBudget
);
```

untuk menghitung budget.

```js
clearButton.addEventListener(
  "click",
  clearForm
);
```

untuk mengembalikan form ke kondisi awal.

## Alur Program

```text
Input income dan expense
        |
        v
Tambahkan expense bila diperlukan
        |
        v
Submit form
        |
        v
calculateBudget()
        |
        v
Ambil semua input setiap kategori
        |
        v
getTotalFromInputs()
        |
        +-- input tidak valid?
        |       |
        |       +--> alert + hentikan perhitungan
        |
        v
Jumlahkan semua expense
        |
        v
income - expenses
      /       \
     /         \
 >= 0          < 0
   |             |
   v             v
Surplus        Deficit
```

## Contoh Hasil

### Budget masih tersisa

Pada screenshot pertama:

```text
Total Income   = $4000
Rent           = $500
Food           = $1000
Utilities      = $300
```

Total expenses:

```text
500 + 1000 + 300 = 1800
```

Sisa budget:

```text
4000 - 1800 = 2200
```

Hasil:

```text
$2200 Remaining
```

### Over budget

Pada screenshot kedua:

```text
Total Income   = $1500
Total Expenses = $1800
```

Perhitungan:

```text
1500 - 1800 = -300
```

Hasil:

```text
Over Budget by $300
```

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <link rel="stylesheet" href="styles.css" />
    <title>Envelope Budgeter</title>
  </head>

  <body>
    <main>
      <h1>Envelope Budgeter</h1>

      <div class="container">
        <form id="budget-form">
          <label for="income">Total Monthly Income</label>

          <input
            type="number"
            min="0"
            id="income"
            placeholder="e.g. 2000"
            required
          />

          <fieldset id="rent">
            <legend>Rent</legend>

            <label for="rent-amount">Amount</label>

            <input
              type="number"
              min="0"
              id="rent-amount"
              placeholder="e.g. 1000"
            />
          </fieldset>

          <fieldset id="food">
            <legend>Food</legend>
            <div class="input-container"></div>
          </fieldset>

          <fieldset id="utilities">
            <legend>Utilities</legend>
            <div class="input-container"></div>
          </fieldset>

          <fieldset id="entertainment">
            <legend>Entertainment</legend>
            <div class="input-container"></div>
          </fieldset>

          <div class="controls">
            <span>
              <label for="entry-dropdown">Add expense to:</label>

              <select id="entry-dropdown" name="options">
                <option value="food" selected>Food</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
              </select>

              <button type="button" id="add-entry">
                Add Entry
              </button>
            </span>
          </div>

          <div>
            <button type="submit">
              Calculate Remaining Budget
            </button>

            <button type="button" id="clear">
              Clear
            </button>
          </div>
        </form>

        <div id="output" class="output hide"></div>
      </div>
    </main>

    <script src="./script.js"></script>
  </body>
</html>
```

## Tentang CSS

CSS pada workshop ini sudah disediakan oleh freeCodeCamp.

Styling tersebut menangani layout form, input, fieldset, button, responsive layout, hasil perhitungan, serta warna untuk kondisi surplus dan deficit.

Class yang langsung berhubungan dengan JavaScript adalah:

```css
.surplus {
  color: var(--light-green);
}

.deficit {
  color: var(--light-pink);
}

.hide {
  display: none;
}
```

JavaScript memilih:

```js
statusClass = "surplus";
```

atau:

```js
statusClass = "deficit";
```

berdasarkan hasil perhitungan.

## Konsep yang Dilatih

| Konsep | Digunakan untuk |
|---|---|
| DOM Selection | Mengambil form, input, dropdown, button, dan output |
| Event Listener | Menangani click dan submit |
| `preventDefault()` | Menghentikan submit bawaan browser |
| Regex | Membersihkan dan memeriksa input |
| `replace()` | Menghapus karakter tertentu |
| `match()` | Mendeteksi pola input tidak valid |
| Template Literal | Membuat dynamic HTML dan output |
| `querySelectorAll()` | Mengambil beberapa input sekaligus |
| `for...of` | Membaca setiap input |
| `Number()` | Mengubah string menjadi number |
| `insertAdjacentHTML()` | Menambahkan field baru |
| `classList` | Mengatur visibilitas output |
| `Math.abs()` | Menampilkan nilai deficit tanpa tanda minus |
| `Array.from()` | Mengubah NodeList menjadi array |
| Conditional | Menentukan surplus atau deficit |

## Catatan Pribadi

Workshop ini berada di bab Form Validation, tetapi kode yang digunakan ternyata menggabungkan banyak fundamental JavaScript yang sudah dipelajari sebelumnya.

Contohnya:

```js
e.preventDefault();
```

digunakan pada form submission.

```js
/[+-\s]/g
```

dan:

```js
/\d+e\d+/i
```

menggunakan Regex.

```js
document.querySelectorAll(...)
```

menggunakan DOM manipulation.

```js
for (const item of list)
```

menggunakan loop.

Sedangkan:

```js
insertAdjacentHTML(...)
```

membuat bagian form berubah secara dinamis.

Bagian yang paling penting untuk saya pahami ulang adalah alur datanya:

```text
input DOM
-> dibaca
-> dibersihkan
-> diperiksa
-> diubah menjadi number
-> dijumlahkan
-> dibandingkan dengan income
-> hasil ditampilkan
```

Jadi walaupun saya belum sepenuhnya menguasai bab Form Validation, workshop ini menunjukkan bagaimana materi baru tetap terhubung dengan fundamental JavaScript sebelumnya.

## Status Workshop

**Platform:** freeCodeCamp  
**Section:** Form Validation  
**Workshop:** Build an Envelope Budget App  
**Language:** HTML, CSS, JavaScript
