# Build a Todo App Using Local Storage

Workshop ini membuat aplikasi **Todo** sederhana menggunakan HTML, CSS, dan JavaScript dengan `localStorage` sebagai tempat penyimpanan data task di browser.

Project ini melatih bagaimana sebuah aplikasi dapat:

```text
menambahkan task
↓
menampilkan task
↓
mengubah task
↓
menghapus task
↓
menyimpan data secara persistent
```

Konsep utama yang digunakan:

```text
JavaScript
↓
DOM
↓
Array
↓
Object
↓
CRUD
↓
JSON
↓
localStorage
↓
Event Handling
```

---

# Struktur HTML

HTML sudah menyediakan struktur dasar aplikasi Todo.

Secara sederhana:

```text
body
│
├── main
│   │
│   ├── h1
│   │
│   └── .todo-app
│       │
│       ├── #open-task-form-btn
│       │
│       ├── #task-form
│       │   ├── #close-task-form-btn
│       │   ├── #title-input
│       │   ├── #date-input
│       │   ├── #description-input
│       │   └── #add-or-update-task-btn
│       │
│       ├── #confirm-close-dialog
│       │   ├── #cancel-btn
│       │   └── #discard-btn
│       │
│       └── #tasks-container
```

JavaScript nantinya mengambil elemen-elemen tersebut menggunakan `document.getElementById()`.

---

# Tombol Add New Task

HTML menyediakan tombol:

```html
<button id="open-task-form-btn" class="btn large-btn">
  Add New Task
</button>
```

Tombol ini digunakan untuk membuka form ketika user ingin membuat task baru.

JavaScript mengambil tombol tersebut:

```js
const openTaskFormBtn = document.getElementById("open-task-form-btn");
```

Kemudian event listener digunakan untuk merespons ketika tombol diklik.

```js
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);
```

Mental model:

```text
User klik Add New Task
↓
click event
↓
class "hidden" di-toggle
↓
Form muncul
```

---

# Task Form

Form digunakan untuk memasukkan informasi task.

Field yang tersedia:

```text
Title
Date
Description
```

HTML:

```html
<label class="task-form-label" for="title-input">Title</label>
<input required type="text" class="form-control" id="title-input" value="" />

<label class="task-form-label" for="date-input">Date</label>
<input type="date" class="form-control" id="date-input" value="" />

<label class="task-form-label" for="description-input">Description</label>
<textarea class="form-control" id="description-input" cols="30" rows="5"></textarea>
```

JavaScript mengambil ketiga input tersebut:

```js
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
```

---

# Task Object

Data yang dimasukkan user nantinya dibuat menjadi sebuah object.

Strukturnya:

```text
task object
│
├── id
├── title
├── date
└── description
```

Contohnya:

```js
const taskObj = {
  id: "learn-javascript-1720000000000",
  title: "Learn JavaScript",
  date: "2026-10-02",
  description: "Study localStorage",
};
```

Object digunakan untuk menyimpan informasi dari satu task.

---

# Array of Objects

Karena aplikasi dapat memiliki banyak task, object tersebut disimpan dalam sebuah array.

Secara sederhana:

```text
taskData
│
├── task object
│   ├── id
│   ├── title
│   ├── date
│   └── description
│
├── task object
│   ├── id
│   ├── title
│   ├── date
│   └── description
│
└── task object
    ├── id
    ├── title
    ├── date
    └── description
```

Mental model:

```text
1 task
↓
Object

Banyak task
↓
Array of Objects
```

---

# Mengambil Data dari localStorage

Data task diambil menggunakan:

```js
const taskData = JSON.parse(localStorage.getItem("data")) || [];
```

Ada beberapa proses dalam satu baris tersebut.

```text
localStorage
↓
getItem("data")
↓
JSON.parse()
↓
Array of Objects
```

`localStorage.getItem("data")` mengambil data berdasarkan key `"data"`.

Data yang tersimpan di `localStorage` berbentuk string.

Karena aplikasi membutuhkan JavaScript array kembali, string tersebut diubah menggunakan:

```js
JSON.parse()
```

Jika belum ada data:

```js
|| []
```

akan membuat `taskData` menjadi array kosong.

---

# `JSON.parse()`

`JSON.parse()` digunakan untuk mengubah JSON string kembali menjadi JavaScript value.

Contoh:

```js
const data = JSON.parse(localStorage.getItem("data"));
```

Mental model:

```text
JSON String
↓
JSON.parse()
↓
JavaScript Array / Object
```

---

# `JSON.stringify()`

Ketika JavaScript value ingin disimpan ke `localStorage`, data perlu diubah menjadi JSON string.

Contohnya:

```js
localStorage.setItem("data", JSON.stringify(taskData));
```

Mental model:

```text
JavaScript Array
↓
JSON.stringify()
↓
JSON String
↓
localStorage
```

---

# Hubungan `JSON.parse()` dan `JSON.stringify()`

Kedua method tersebut bekerja berlawanan arah.

```text
MENYIMPAN

Array / Object
↓
JSON.stringify()
↓
String
↓
localStorage
```

Sedangkan:

```text
MENGAMBIL

localStorage
↓
String
↓
JSON.parse()
↓
Array / Object
```

Ini menjadi salah satu pola utama dalam project.

---

# Function `removeSpecialChars()`

Function ini digunakan untuk membersihkan karakter tertentu dari sebuah value.

```js
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};
```

`trim()` menghapus whitespace di awal dan akhir string.

Sedangkan `replace()` digunakan bersama regular expression untuk menghapus karakter yang tidak sesuai pola.

Function ini nantinya digunakan ketika membuat ID task.

---

# Membuat ID Task

Setiap task membutuhkan ID.

ID dibuat menggunakan:

```js
id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
```

Secara sederhana:

```text
Title
↓
removeSpecialChars()
↓
toLowerCase()
↓
split(" ")
↓
join("-")
↓
Date.now()
↓
ID
```

Contohnya:

```text
Learn JavaScript
↓
learn-javascript
↓
learn-javascript-<timestamp>
```

`Date.now()` digunakan sebagai bagian dari ID agar task mendapatkan nilai yang berbeda berdasarkan waktu pembuatan.

---

# Function `addOrUpdateTask()`

Function utama untuk menambahkan atau memperbarui task adalah:

```js
const addOrUpdateTask = () => {
  ...
};
```

Function ini menangani dua kondisi:

```text
addOrUpdateTask()
        ↓
   ┌────┴────┐
   ↓         ↓
  Add      Update
   ↓         ↓
Task baru  Task lama
```

---

# Validasi Title

Sebelum task diproses, title diperiksa terlebih dahulu.

```js
if (!titleInput.value.trim()) {
  alert("Please provide a title");
  return;
}
```

Jika title kosong, function dihentikan menggunakan `return`.

Mental model:

```text
Title kosong?
↓
YA
↓
alert()
↓
return
↓
Task tidak dibuat
```

---

# Mencari Task dengan `findIndex()`

Program perlu mengetahui apakah task yang sedang diproses merupakan task baru atau task lama.

Untuk itu digunakan:

```js
const dataArrIndex = taskData.findIndex(
  (item) => item.id === currentTask.id
);
```

`findIndex()` mencari index element yang memenuhi kondisi.

Jika task tidak ditemukan:

```text
-1
```

Jika ditemukan:

```text
0
1
2
3
...
```

Mental model:

```text
findIndex()
│
├── -1
│   → task belum ada
│
└── index
    → task ditemukan
```

---

# Membuat Task Object

Setelah validasi dan pencarian index selesai, object task dibuat.

```js
const taskObj = {
  id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
  title: titleInput.value,
  date: dateInput.value,
  description: descriptionInput.value,
};
```

Object tersebut mengambil data dari form.

```text
titleInput.value
↓
title

dateInput.value
↓
date

descriptionInput.value
↓
description
```

---

# Menambahkan Task Baru

Jika task belum ditemukan:

```js
if (dataArrIndex === -1) {
  taskData.unshift(taskObj);
}
```

`unshift()` menambahkan object ke bagian awal array.

Mental model:

```text
taskData

Task A
Task B

↓ unshift(Task C)

Task C
Task A
Task B
```

---

# Memperbarui Task

Jika task sudah ditemukan:

```js
else {
  taskData[dataArrIndex] = taskObj;
}
```

Object task lama diganti dengan object baru pada index yang sama.

Mental model:

```text
taskData[index]
↓
task lama

        ↓ update

taskData[index]
↓
task baru
```

---

# Menyimpan Task

Setelah task ditambahkan atau diperbarui:

```js
localStorage.setItem("data", JSON.stringify(taskData));
```

Alurnya:

```text
taskData
↓
JSON.stringify()
↓
JSON string
↓
localStorage
```

Setelah data tersimpan:

```js
updateTaskContainer();
reset();
```

`updateTaskContainer()` memperbarui tampilan.

`reset()` mengembalikan form ke kondisi awal.

---

# Function `updateTaskContainer()`

Function ini bertugas menampilkan task ke halaman.

```js
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(({id, title, date, description}) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
      </div>
    `;
  });
};
```

Function ini menghubungkan data JavaScript dengan HTML.

---

# Mengosongkan Container

Sebelum task ditampilkan:

```js
tasksContainer.innerHTML = "";
```

Container dikosongkan terlebih dahulu.

Tujuannya agar task tidak ditambahkan berkali-kali ketika function dipanggil kembali.

Mental model:

```text
Data berubah
↓
Container dikosongkan
↓
Data dirender ulang
```

---

# `forEach()` dan Object Destructuring

Task diproses menggunakan:

```js
taskData.forEach(({id, title, date, description}) => {
  ...
});
```

Di sini digunakan `forEach()` untuk memproses setiap task.

Selain itu terdapat **object destructuring**:

```js
{id, title, date, description}
```

Property object langsung diambil menjadi variable.

Tanpa destructuring, secara konsep kita bisa membayangkan:

```text
item.id
item.title
item.date
item.description
```

Dengan destructuring:

```text
id
title
date
description
```

---

# Template Literal

HTML task dibuat menggunakan template literal:

```js
`
  <div class="task" id="${id}">
    ...
  </div>
`
```

Nilai JavaScript dapat dimasukkan ke dalam template literal menggunakan:

```js
${...}
```

Contohnya:

```js
${title}
```

akan mengambil nilai dari variable `title`.

---

# Function `deleteTask()`

Function ini digunakan untuk menghapus task.

```js
const deleteTask = (buttonEl) => {
  ...
};
```

Function menerima parameter:

```text
buttonEl
```

yang merupakan tombol Delete yang diklik.

---

# Mencari Task yang Akan Dihapus

Task dicari berdasarkan ID parent element tombol.

```js
const dataArrIndex = taskData.findIndex(
  (item) => item.id === buttonEl.parentElement.id
);
```

`buttonEl.parentElement` mengarah ke:

```text
<div class="task">
```

ID dari element tersebut kemudian dibandingkan dengan ID task dalam array.

Mental model:

```text
Delete button
↓
parentElement
↓
task ID
↓
findIndex()
↓
task index
```

---

# Menghapus Task dari DOM

Setelah task ditemukan, element task dihapus dari halaman.

```js
buttonEl.parentElement.remove();
```

Ini menghapus element dari DOM.

---

# Menghapus Task dari Array

Task juga harus dihapus dari array.

```js
taskData.splice(dataArrIndex, 1);
```

`splice()` digunakan untuk menghapus element berdasarkan index.

Angka `1` berarti satu element dihapus.

Mental model:

```text
taskData
↓
findIndex()
↓
index task
↓
splice(index, 1)
↓
task terhapus
```

---

# Menyimpan Perubahan Setelah Delete

Setelah task dihapus dari array, `localStorage` juga harus diperbarui.

```js
localStorage.setItem("data", JSON.stringify(taskData));
```

Jika tidak dilakukan, task yang sudah dihapus dari halaman masih dapat muncul kembali setelah browser melakukan reload.

---

# Function `editTask()`

Function ini digunakan ketika user ingin mengubah task.

```js
const editTask = (buttonEl) => {
  ...
};
```

Task dicari menggunakan ID parent element.

```js
const dataArrIndex = taskData.findIndex(
  (item) => item.id === buttonEl.parentElement.id
);
```

---

# `currentTask`

Variable berikut digunakan untuk menyimpan task yang sedang diedit.

```js
let currentTask = {};
```

Ketika user memilih Edit:

```js
currentTask = taskData[dataArrIndex];
```

Sekarang `currentTask` berisi task yang sedang diproses.

Mental model:

```text
User klik Edit
↓
Cari task
↓
currentTask = task tersebut
↓
Form diisi
↓
User mengubah data
↓
Submit
```

---

# Mengisi Form Saat Edit

Data dari `currentTask` dimasukkan kembali ke form.

```js
titleInput.value = currentTask.title;
dateInput.value = currentTask.date;
descriptionInput.value = currentTask.description;
```

Dengan demikian user dapat melihat dan mengubah data task sebelumnya.

---

# Mengubah Tombol Menjadi Update

Ketika mode edit aktif:

```js
addOrUpdateTaskBtn.innerText = "Update Task";
```

Teks tombol berubah dari:

```text
Add Task
```

menjadi:

```text
Update Task
```

Hal tersebut memberikan tanda bahwa form sedang digunakan untuk memperbarui task.

---

# Menampilkan Form Edit

Form ditampilkan menggunakan:

```js
taskForm.classList.toggle("hidden");
```

Class `hidden` digunakan oleh CSS untuk menyembunyikan form.

Secara sederhana:

```text
hidden ada
↓
form tersembunyi

hidden di-toggle
↓
form tampil
```

---

# Function `reset()`

Function `reset()` mengembalikan form ke kondisi awal.

```js
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};
```

Beberapa hal terjadi:

```text
Button
↓
Add Task

Title
↓
kosong

Date
↓
kosong

Description
↓
kosong

Form
↓
hidden

currentTask
↓
{}
```

---

# Menampilkan Task Saat Halaman Dibuka

Ketika halaman dimuat, program memeriksa apakah ada data task.

```js
if (taskData.length) {
  updateTaskContainer();
}
```

Jika array memiliki data, function `updateTaskContainer()` dipanggil.

Mental model:

```text
Halaman dibuka
↓
localStorage.getItem()
↓
JSON.parse()
↓
taskData
↓
Ada task?
│
├── TIDAK
│   → tidak melakukan render
│
└── YA
    ↓
    updateTaskContainer()
```

---

# Confirm Close Dialog

Project juga memiliki dialog untuk memastikan user benar-benar ingin membuang perubahan.

HTML menyediakan:

```html
<dialog id="confirm-close-dialog">
  <form method="dialog">
    <p class="discard-message-text">Discard unsaved changes?</p>

    <div class="confirm-close-dialog-btn-container">
      <button id="cancel-btn" class="btn">
        Cancel
      </button>

      <button id="discard-btn" class="btn">
        Discard
      </button>
    </div>
  </form>
</dialog>
```

Dialog ini digunakan ketika user menutup form setelah melakukan perubahan yang belum disimpan.

---

# Menutup Form

Ketika tombol close diklik:

```js
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});
```

Logic tersebut membedakan dua kondisi:

```text
Tidak ada perubahan
↓
reset()

Ada perubahan yang belum disimpan
↓
showModal()
```

---

# Cancel

Tombol Cancel hanya menutup dialog.

```js
cancelBtn.addEventListener("click", () =>
  confirmCloseDialog.close()
);
```

Perubahan pada form tidak langsung dibuang.

---

# Discard

Tombol Discard digunakan untuk membuang perubahan.

```js
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});
```

Alurnya:

```text
Discard
↓
dialog ditutup
↓
reset()
↓
form kembali ke kondisi awal
```

---

# Submit Form

Form menggunakan event `submit`.

```js
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});
```

`preventDefault()` digunakan agar browser tidak menjalankan perilaku submit form secara default.

Setelah itu:

```js
addOrUpdateTask();
```

dipanggil.

Function tersebut kemudian menentukan apakah data akan ditambahkan atau diperbarui.

---

# CRUD pada Todo App

Workshop ini memperlihatkan konsep CRUD secara langsung.

```text
CREATE
↓
addOrUpdateTask()
↓
taskData.unshift()
↓
localStorage.setItem()

READ
↓
localStorage.getItem()
↓
JSON.parse()
↓
updateTaskContainer()

UPDATE
↓
findIndex()
↓
taskData[dataArrIndex] = taskObj
↓
localStorage.setItem()

DELETE
↓
findIndex()
↓
splice()
↓
localStorage.setItem()
```

---

# Alur Data

Bagian yang paling penting dari project ini adalah memahami bagaimana data bergerak.

Ketika membuat task:

```text
Form
↓
Input value
↓
Task Object
↓
Array
↓
JSON.stringify()
↓
localStorage
```

Ketika halaman dibuka kembali:

```text
localStorage
↓
getItem()
↓
JSON.parse()
↓
Array
↓
Object
↓
DOM
```

Mental model utama:

```text
FORM
↓
OBJECT
↓
ARRAY
↓
JSON
↓
localStorage
↓
JSON
↓
ARRAY
↓
DOM
```

---

# Hubungan Function

Project ini mulai menunjukkan bahwa function dapat saling bekerja sama.

Contohnya:

```text
addOrUpdateTask()
│
├── findIndex()
├── membuat task object
├── unshift() / update array
├── JSON.stringify()
├── localStorage.setItem()
│
├── updateTaskContainer()
│
└── reset()
```

Sedangkan saat edit:

```text
editTask()
↓
currentTask
↓
form
↓
submit
↓
addOrUpdateTask()
↓
findIndex()
↓
update task
```

Artinya sebuah function tidak selalu bekerja sendirian.

---

# State dengan `currentTask`

Variable:

```js
let currentTask = {};
```

digunakan sebagai state sederhana untuk mengetahui task yang sedang diedit.

Ketika tidak ada task yang sedang diedit:

```js
currentTask = {};
```

Ketika user memilih Edit:

```js
currentTask = taskData[dataArrIndex];
```

Setelah selesai:

```js
currentTask = {};
```

Mental model:

```text
Tidak sedang edit
↓
{}

User klik Edit
↓
currentTask = task

User selesai
↓
{}
```

---

# Hubungan HTML, CSS, dan JavaScript

Project ini memperlihatkan hubungan ketiga bagian utama web development.

```text
HTML
↓
menyediakan struktur
↓
Form
Task container
Dialog
Button
```

```text
CSS
↓
mengatur tampilan
↓
Layout
Button
Form
Hidden state
Responsive design
```

```text
JavaScript
↓
mengatur behavior
↓
Event
CRUD
Data
localStorage
DOM
```

Contohnya:

```text
HTML
↓
#task-form

CSS
↓
.hidden {
  display: none;
}

JavaScript
↓
classList.toggle("hidden")
```

Ketiganya bekerja bersama untuk membuat aplikasi menjadi interaktif.

---

# Alur Create

```text
User
↓
Add New Task
↓
Form muncul
↓
User mengisi data
↓
Submit
↓
addOrUpdateTask()
↓
Validasi title
↓
Buat task object
↓
unshift()
↓
JSON.stringify()
↓
localStorage
↓
updateTaskContainer()
↓
reset()
```

---

# Alur Read

```text
Halaman dibuka
↓
localStorage.getItem("data")
↓
JSON.parse()
↓
taskData
↓
taskData.length
↓
updateTaskContainer()
↓
forEach()
↓
HTML dibuat
↓
Task tampil
```

---

# Alur Update

```text
User klik Edit
↓
editTask()
↓
findIndex()
↓
currentTask
↓
Form diisi
↓
User mengubah data
↓
Submit
↓
addOrUpdateTask()
↓
findIndex()
↓
taskData[index] = taskObj
↓
JSON.stringify()
↓
localStorage
↓
Render ulang
```

---

# Alur Delete

```text
User klik Delete
↓
deleteTask()
↓
findIndex()
↓
Task ditemukan
↓
DOM element dihapus
↓
splice()
↓
localStorage diperbarui
```

---

# Alur Close Form

```text
User klik Close
↓
Cek isi form
↓
Cek perubahan
│
├── Tidak ada perubahan
│   ↓
│   reset()
│
└── Ada perubahan
    ↓
    showModal()
    │
    ├── Cancel
    │   ↓
    │   kembali ke form
    │
    └── Discard
        ↓
        reset()
```

---

# Konsep JavaScript yang Dilatih

| Konsep | Penggunaan |
|---|---|
| DOM | Mengakses dan mengubah HTML |
| `getElementById()` | Mengambil element berdasarkan ID |
| `addEventListener()` | Menangani event |
| `localStorage` | Menyimpan data browser |
| `setItem()` | Menyimpan data |
| `getItem()` | Mengambil data |
| `JSON.stringify()` | Mengubah JavaScript value menjadi JSON string |
| `JSON.parse()` | Mengubah JSON string menjadi JavaScript value |
| Array | Menyimpan banyak task |
| Object | Menyimpan satu task |
| `findIndex()` | Mencari index task |
| `forEach()` | Memproses setiap task |
| `unshift()` | Menambahkan task ke awal array |
| `splice()` | Menghapus task |
| Object Destructuring | Mengambil property object |
| Template Literal | Membentuk HTML |
| `Date.now()` | Membantu membuat ID |
| `classList.toggle()` | Mengubah visibility form |
| `preventDefault()` | Mencegah submit default |
| `showModal()` | Menampilkan dialog |
| `return` | Menghentikan function |

---

# Yang Saya Pelajari

### JavaScript

- `localStorage` digunakan untuk menyimpan data secara persistent di browser.
- `setItem()` digunakan untuk menyimpan data berdasarkan key.
- `getItem()` digunakan untuk mengambil data berdasarkan key.
- `JSON.stringify()` digunakan sebelum array atau object disimpan ke `localStorage`.
- `JSON.parse()` digunakan untuk mengubah JSON string kembali menjadi JavaScript value.
- Array dapat berisi banyak object.
- Object dapat digunakan untuk merepresentasikan satu task.
- `findIndex()` dapat digunakan untuk mencari posisi task.
- `unshift()` dapat digunakan untuk menambahkan task ke awal array.
- `splice()` dapat digunakan untuk menghapus task dari array.
- `forEach()` dapat digunakan untuk memproses setiap task.
- Object destructuring dapat mengambil property object secara langsung.
- Template literal dapat digunakan untuk membuat HTML secara dinamis.
- Event listener membuat aplikasi dapat merespons tindakan user.
- Function dapat saling memanggil dan bekerja sebagai satu alur aplikasi.
- `currentTask` dapat digunakan untuk menyimpan state sederhana.

### DOM

- JavaScript dapat mengambil element HTML menggunakan ID.
- JavaScript dapat mengubah isi element menggunakan `innerText` atau `innerHTML`.
- JavaScript dapat menghapus element menggunakan `.remove()`.
- JavaScript dapat mengubah class menggunakan `classList.toggle()`.
- JavaScript dapat menampilkan dialog menggunakan `showModal()`.

### CRUD

```text
Create
→ membuat task

Read
→ membaca task

Update
→ mengubah task

Delete
→ menghapus task
```

CRUD ternyata tidak berdiri sendiri.

CRUD bekerja bersama:

```text
Array
+
Object
+
DOM
+
JSON
+
localStorage
+
Event
```

---

# Catatan Pribadi

Workshop ini memiliki **66 steps**, sehingga beberapa bagian terasa cukup panjang karena function yang sudah dibuat sebelumnya terus digunakan kembali ketika fitur baru ditambahkan.

Pada awalnya saya sudah memahami penggunaan dasar:

```js
localStorage.setItem()
localStorage.getItem()
JSON.stringify()
JSON.parse()
```

Namun setelah masuk ke project ini, saya mulai menemukan bahwa memahami syntax satu per satu belum cukup.

Tantangan sebenarnya mulai muncul ketika beberapa bagian harus bekerja bersama.

```text
Form
↓
Object
↓
Array
↓
Function
↓
JSON
↓
localStorage
↓
DOM
↓
Event
↓
Function lainnya
```

Saya sempat merasa hang ketika harus membongkar kembali function lama untuk membuat fitur baru.

Namun dari workshop ini saya mulai memahami bahwa hal tersebut merupakan bagian dari proses membangun aplikasi.

Saya tidak harus menghafalkan seluruh code.

Yang lebih penting adalah memahami:

```text
Data disimpan di mana?
↓
Data berubah di mana?
↓
Function mana yang mengubahnya?
↓
Kapan data disimpan?
↓
Kapan DOM dirender ulang?
↓
Bagaimana user berinteraksi dengan aplikasi?
```

Mental model yang ingin saya bawa ke project berikutnya:

```text
USER ACTION
↓
EVENT
↓
FUNCTION
↓
UPDATE DATA
↓
SAVE DATA
↓
UPDATE DOM
```

Workshop ini juga membuat saya mulai melihat bahwa project JavaScript yang lebih besar bukan sekadar kumpulan syntax.

Setiap function mempunyai tugas tertentu dan beberapa function dapat bekerja bersama untuk membentuk satu fitur.

Untuk project berikutnya, saya ingin lebih fokus memahami **alur data dan hubungan antar-function**, bukan hanya menghafalkan syntax.

---

**Platform:** freeCodeCamp  
**Workshop:** Build a Todo App Using Local Storage  
**Language:** JavaScript  
**Main Concepts:** DOM, CRUD, Array, Object, JSON, localStorage, Event Handling
