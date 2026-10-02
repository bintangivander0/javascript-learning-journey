# Build a Todo App Using Local Storage

```{=html}
<p align="center">
```
Todo application sederhana berbasis
`<strong>`{=html}JavaScript`</strong>`{=html} yang menggunakan
`<strong>`{=html}localStorage`</strong>`{=html} untuk menyimpan data
task secara persisten di browser.
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<strong>`{=html}JavaScript`</strong>`{=html} ·
`<strong>`{=html}DOM`</strong>`{=html} ·
`<strong>`{=html}localStorage`</strong>`{=html} ·
`<strong>`{=html}JSON`</strong>`{=html} ·
`<strong>`{=html}CRUD`</strong>`{=html} · `<strong>`{=html}Array
Methods`</strong>`{=html} · `<strong>`{=html}Event
Handling`</strong>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## Tentang Project

Project ini merupakan workshop **freeCodeCamp "Build a Todo App Using
Local Storage"**.

Workshop ini digunakan untuk memahami bagaimana data dari sebuah
aplikasi web dapat disimpan di browser menggunakan `localStorage`.

Aplikasi Todo memungkinkan pengguna untuk menambahkan task baru,
mengubah task, menghapus task, serta menampilkan kembali task yang sudah
tersimpan ketika halaman dimuat ulang.

Berbeda dengan latihan sebelumnya yang lebih berfokus pada penggunaan
`Map` dan `Set`, project ini mulai menggabungkan beberapa konsep
JavaScript sekaligus, terutama **DOM manipulation, event handling, array
methods, object, localStorage, JSON, dan CRUD**.

Workshop ini terdiri dari **66 steps**, sehingga beberapa function yang
sudah dibuat sebelumnya kembali digunakan, diubah, atau dikembangkan
untuk memenuhi kebutuhan fitur berikutnya.

------------------------------------------------------------------------

## Fitur

-   Menambahkan task baru melalui form.
-   Menyimpan task ke `localStorage`.
-   Menampilkan task yang tersimpan ketika halaman dibuka kembali.
-   Mengubah task yang sudah ada.
-   Menghapus task.
-   Mencegah task dengan title kosong disimpan.
-   Membuat ID unik berdasarkan title dan waktu.
-   Menampilkan dialog konfirmasi ketika form ditutup dengan perubahan
    yang belum disimpan.
-   Menyimpan seluruh task dalam bentuk JSON.
-   Mengambil kembali data JSON dari `localStorage`.

------------------------------------------------------------------------

## Struktur Data

Data task disimpan sebagai array yang berisi object.

``` js
const taskData = JSON.parse(localStorage.getItem("data")) || [];
```

Secara sederhana, struktur datanya dapat dibayangkan seperti:

``` text
taskData
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

Array digunakan untuk menyimpan banyak task.

Setiap task disimpan sebagai object dengan property `id`, `title`,
`date`, dan `description`.

------------------------------------------------------------------------

## Struktur Project

``` text
build-a-todo-app-using-local-storage/
├── index.html
├── styles.css
└── script.js
```

Pada workshop freeCodeCamp ini, fokus pengerjaan JavaScript dilakukan
pada file `script.js`, sedangkan HTML dan CSS telah disediakan.

------------------------------------------------------------------------

# JavaScript

## Mengambil Elemen HTML

Project dimulai dengan mengambil berbagai elemen HTML menggunakan
`document.getElementById()`.

``` js
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
```

Setiap variable menyimpan reference ke element tertentu pada halaman.

Dengan reference tersebut, JavaScript dapat mengubah isi, value, class,
atau perilaku element melalui code.

------------------------------------------------------------------------

## Mengambil Data dari localStorage

Data task diambil dari `localStorage` ketika JavaScript dijalankan.

``` js
const taskData = JSON.parse(localStorage.getItem("data")) || [];
```

Ada beberapa proses yang terjadi pada satu baris ini:

``` text
localStorage
    ↓
getItem("data")
    ↓
JSON.parse()
    ↓
Array task
```

`localStorage.getItem("data")` mengambil data berdasarkan key `"data"`.

Data yang disimpan di `localStorage` berbentuk string.

`JSON.parse()` mengubah string JSON kembali menjadi JavaScript value.

Jika belum ada data yang tersimpan, `|| []` membuat `taskData`
menggunakan array kosong.

------------------------------------------------------------------------

## Menyimpan Task yang Sedang Diedit

Variable berikut digunakan untuk menyimpan task yang sedang diproses
ketika mode edit digunakan.

``` js
let currentTask = {};
```

Pada awalnya `currentTask` merupakan object kosong.

Ketika pengguna memilih task untuk diedit, variable ini kemudian berisi
object task tersebut.

------------------------------------------------------------------------

# Function `removeSpecialChars()`

Function ini digunakan untuk membersihkan karakter tertentu dari value.

``` js
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};
```

`trim()` menghapus whitespace pada bagian awal dan akhir string.

`replace()` digunakan bersama regular expression untuk menghapus
karakter yang tidak termasuk huruf, angka, tanda `-`, atau whitespace.

Function ini kemudian digunakan saat membuat ID task.

------------------------------------------------------------------------

# Function `addOrUpdateTask()`

Function utama untuk menambahkan atau memperbarui task adalah:

``` js
const addOrUpdateTask = () => {
  ...
};
```

Function ini menangani dua kondisi:

``` text
                addOrUpdateTask()
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
        Task baru          Task lama
              ↓                 ↓
          Add Task         Update Task
```

------------------------------------------------------------------------

## Validasi Title

Sebelum task diproses, title diperiksa terlebih dahulu.

``` js
if (!titleInput.value.trim()) {
  alert("Please provide a title");
  return;
}
```

`trim()` digunakan untuk memastikan input yang hanya berisi whitespace
dianggap kosong.

Jika title kosong, function dihentikan menggunakan `return`.

------------------------------------------------------------------------

## Mencari Task yang Sedang Diproses

Task dicari berdasarkan `id`.

``` js
const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
```

`findIndex()` mencari index element pertama yang memenuhi kondisi.

Dalam kasus ini, JavaScript membandingkan:

``` text
item.id
   ↓
currentTask.id
```

Jika ditemukan, index task dikembalikan.

Jika tidak ditemukan, hasilnya adalah:

``` text
-1
```

Nilai tersebut kemudian digunakan untuk membedakan mode **add** dan
**update**.

------------------------------------------------------------------------

## Membuat Object Task

Object baru dibuat menggunakan data dari form.

``` js
const taskObj = {
  id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
  title: titleInput.value,
  date: dateInput.value,
  description: descriptionInput.value,
};
```

Object tersebut memiliki empat property:

``` text
id
title
date
description
```

ID dibuat dari title yang telah dibersihkan dan waktu saat task dibuat.

`Date.now()` menghasilkan nilai waktu saat function dijalankan dan
digunakan sebagai bagian dari ID.

------------------------------------------------------------------------

## Menambahkan Task Baru

Jika `dataArrIndex` bernilai `-1`, berarti task belum ditemukan.

``` js
if (dataArrIndex === -1) {
  taskData.unshift(taskObj);
}
```

`unshift()` menambahkan task ke bagian awal array.

------------------------------------------------------------------------

## Memperbarui Task

Jika task sudah ditemukan, element array pada index tersebut diganti.

``` js
else {
  taskData[dataArrIndex] = taskObj;
}
```

Dengan cara tersebut, task lama digantikan oleh object task yang baru.

------------------------------------------------------------------------

## Menyimpan Data ke localStorage

Setelah task ditambahkan atau diperbarui, data disimpan kembali.

``` js
localStorage.setItem("data", JSON.stringify(taskData));
```

`JSON.stringify()` mengubah JavaScript array menjadi string JSON.

Kemudian `localStorage.setItem()` menyimpan string tersebut dengan key
`"data"`.

Alurnya:

``` text
JavaScript Array
       ↓
JSON.stringify()
       ↓
JSON String
       ↓
localStorage.setItem()
```

------------------------------------------------------------------------

## Memperbarui Tampilan dan Mereset Form

Setelah data tersimpan:

``` js
updateTaskContainer();
reset();
```

`updateTaskContainer()` memperbarui tampilan daftar task.

`reset()` mengembalikan form ke kondisi awal.

------------------------------------------------------------------------

# Function `updateTaskContainer()`

Function ini bertanggung jawab menampilkan seluruh task ke halaman.

``` js
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

------------------------------------------------------------------------

## Mengosongkan Container

Sebelum task ditampilkan kembali:

``` js
tasksContainer.innerHTML = "";
```

Container dikosongkan terlebih dahulu agar daftar tidak ditambahkan
berulang kali.

------------------------------------------------------------------------

## `forEach()` pada Array

Setiap task diproses menggunakan:

``` js
taskData.forEach(({id, title, date, description}) => {
  ...
});
```

Di sini digunakan **object destructuring**.

Daripada menulis:

``` text
item.id
item.title
item.date
item.description
```

property langsung diambil menjadi variable:

``` text
id
title
date
description
```

------------------------------------------------------------------------

## Template Literal

HTML task dibentuk menggunakan template literal:

``` js
`
  <div class="task" id="${id}">
    ...
  </div>
`
```

Nilai JavaScript dapat dimasukkan ke dalam template literal menggunakan
`${...}`.

------------------------------------------------------------------------

# Function `deleteTask()`

Function ini digunakan untuk menghapus task.

``` js
const deleteTask = (buttonEl) => {
  ...
};
```

Function menerima `buttonEl`, yaitu element tombol Delete yang diklik.

------------------------------------------------------------------------

## Mencari Index Task

Task yang akan dihapus dicari berdasarkan ID parent element tombol.

``` js
const dataArrIndex = taskData.findIndex(
  (item) => item.id === buttonEl.parentElement.id
);
```

`buttonEl.parentElement` mengarah ke `<div class="task">` yang berisi
tombol tersebut.

ID dari parent tersebut kemudian dibandingkan dengan ID task pada array.

------------------------------------------------------------------------

## Menghapus dari Tampilan

Element task dihapus dari DOM:

``` js
buttonEl.parentElement.remove();
```

------------------------------------------------------------------------

## Menghapus dari Array

Task juga harus dihapus dari `taskData`.

``` js
taskData.splice(dataArrIndex, 1);
```

`splice()` digunakan untuk menghapus element dari array berdasarkan
index.

Angka `1` menunjukkan bahwa satu element dihapus.

------------------------------------------------------------------------

## Memperbarui localStorage

Setelah array berubah, `localStorage` juga diperbarui.

``` js
localStorage.setItem("data", JSON.stringify(taskData));
```

Dengan begitu data yang sudah dihapus tidak akan muncul kembali setelah
halaman dimuat ulang.

------------------------------------------------------------------------

# Function `editTask()`

Function ini digunakan untuk mengisi kembali form dengan data task yang
ingin diedit.

``` js
const editTask = (buttonEl) => {
  ...
};
```

Task dicari menggunakan cara yang sama seperti pada `deleteTask()`.

``` js
const dataArrIndex = taskData.findIndex(
  (item) => item.id === buttonEl.parentElement.id
);
```

------------------------------------------------------------------------

## Menyimpan Task Aktif

Task yang dipilih disimpan ke `currentTask`.

``` js
currentTask = taskData[dataArrIndex];
```

Variable tersebut kemudian digunakan untuk mengetahui task mana yang
sedang diedit.

------------------------------------------------------------------------

## Mengisi Form

Value form diisi dari object task:

``` js
titleInput.value = currentTask.title;
dateInput.value = currentTask.date;
descriptionInput.value = currentTask.description;
```

Dengan demikian data task lama muncul kembali di dalam form.

------------------------------------------------------------------------

## Mengubah Tombol Menjadi Update

Text tombol diubah:

``` js
addOrUpdateTaskBtn.innerText = "Update Task";
```

Hal tersebut memberikan tanda bahwa form sedang berada dalam mode
update.

------------------------------------------------------------------------

## Membuka Form

Class `hidden` di-toggle:

``` js
taskForm.classList.toggle("hidden");
```

Form kemudian ditampilkan.

------------------------------------------------------------------------

# Function `reset()`

Function `reset()` mengembalikan form ke kondisi awal.

``` js
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};
```

Beberapa hal dilakukan sekaligus:

``` text
Button
  ↓
Add Task

Input
  ↓
Kosong

Form
  ↓
Hidden

currentTask
  ↓
{}
```

------------------------------------------------------------------------

# Menampilkan Data Saat Halaman Dibuka

Bagian berikut memastikan task yang sudah tersimpan ditampilkan ketika
halaman dimuat.

``` js
if (taskData.length) {
  updateTaskContainer();
}
```

Jika array `taskData` memiliki data, `updateTaskContainer()` dipanggil.

Dengan demikian task yang sebelumnya disimpan di `localStorage` dapat
muncul kembali.

------------------------------------------------------------------------

# Event Listener

Project menggunakan event listener untuk merespons interaksi pengguna.

## Membuka Form

``` js
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);
```

Ketika tombol Add New Task diklik, class `hidden` di-toggle.

------------------------------------------------------------------------

## Menutup Form

Tombol close memiliki logic tambahan karena form dapat berisi perubahan
yang belum disimpan.

``` js
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

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

Logic tersebut membedakan antara:

``` text
Tidak ada perubahan
       ↓
     reset()

Ada perubahan yang belum disimpan
       ↓
showModal()
```

------------------------------------------------------------------------

# Confirm Close Dialog

Jika terdapat perubahan yang belum disimpan, dialog konfirmasi
ditampilkan.

``` js
confirmCloseDialog.showModal();
```

Dialog tersebut memberikan dua pilihan:

``` text
Cancel
   ↓
Tetap di form

Discard
   ↓
Buang perubahan
```

------------------------------------------------------------------------

## Cancel

``` js
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
```

`close()` digunakan untuk menutup dialog.

Perubahan pada form tidak dibuang.

------------------------------------------------------------------------

## Discard

``` js
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});
```

Dialog ditutup dan form di-reset.

------------------------------------------------------------------------

# Submit Form

Form memiliki event listener:

``` js
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});
```

`preventDefault()` mencegah browser menjalankan perilaku submit form
secara default.

Setelah itu:

``` js
addOrUpdateTask();
```

dipanggil untuk menjalankan logic penambahan atau pembaruan task.

------------------------------------------------------------------------

# Alur CRUD

Workshop ini memperlihatkan pola CRUD melalui Todo App.

``` text
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
taskData.splice()
  ↓
localStorage.setItem()
```

------------------------------------------------------------------------

# Hubungan Array, Object, JSON, dan localStorage

Bagian yang paling penting dari workshop ini adalah memahami bahwa
beberapa jenis data bekerja bersama.

``` text
Task Object
    ↓
Array of Objects
    ↓
JSON.stringify()
    ↓
String
    ↓
localStorage
```

Ketika data ingin digunakan kembali:

``` text
localStorage
    ↓
JSON String
    ↓
JSON.parse()
    ↓
Array of Objects
    ↓
JavaScript
```

------------------------------------------------------------------------

# Konsep JavaScript yang Dilatih

  -----------------------------------------------------------------------
  Konsep                              Digunakan untuk
  ----------------------------------- -----------------------------------
  DOM                                 Mengakses dan mengubah element HTML

  `getElementById()`                  Mengambil element berdasarkan ID

  `addEventListener()`                Menangani event pengguna

  `localStorage`                      Menyimpan data di browser

  `setItem()`                         Menyimpan key-value ke localStorage

  `getItem()`                         Mengambil data dari localStorage

  `JSON.stringify()`                  Mengubah JavaScript value menjadi
                                      JSON string

  `JSON.parse()`                      Mengubah JSON string kembali
                                      menjadi JavaScript value

  Array                               Menyimpan banyak task

  Object                              Menyimpan data setiap task

  `findIndex()`                       Mencari index task

  `forEach()`                         Memproses setiap task

  `unshift()`                         Menambahkan task di awal array

  `splice()`                          Menghapus task dari array

  Object Destructuring                Mengambil property object

  Template Literal                    Membentuk HTML secara dinamis

  `Date.now()`                        Membantu membuat ID unik

  `classList.toggle()`                Menampilkan atau menyembunyikan
                                      form

  `preventDefault()`                  Mencegah perilaku default submit

  `showModal()`                       Menampilkan dialog

  `return`                            Menghentikan atau mengembalikan
                                      hasil function
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Hal yang Saya Pelajari

## 1. localStorage Menyimpan String

`localStorage` tidak menyimpan JavaScript array atau object secara
langsung.

Karena itu data perlu diubah menjadi JSON string terlebih dahulu:

``` js
localStorage.setItem("data", JSON.stringify(taskData));
```

Kemudian saat digunakan kembali:

``` js
const taskData = JSON.parse(localStorage.getItem("data")) || [];
```

Pola yang perlu saya ingat:

``` text
Simpan:
JavaScript Value
↓
JSON.stringify()
↓
localStorage

Ambil:
localStorage
↓
JSON.parse()
↓
JavaScript Value
```

------------------------------------------------------------------------

## 2. CRUD Tidak Berdiri Sendiri

CRUD ternyata bukan hanya empat function terpisah.

Dalam project ini CRUD melibatkan beberapa konsep sekaligus:

``` text
CRUD
 ↓
Array
 ↓
Object
 ↓
findIndex()
 ↓
splice()
 ↓
localStorage
 ↓
DOM
```

Karena itu perubahan pada satu bagian dapat memengaruhi bagian lain.

------------------------------------------------------------------------

## 3. Function Dapat Saling Bekerja Sama

Workshop ini membuat saya melihat bahwa function tidak selalu berdiri
sendiri.

Contohnya:

``` text
addOrUpdateTask()
       ↓
updateTaskContainer()
       ↓
reset()
```

Sementara:

``` text
editTask()
       ↓
currentTask
       ↓
addOrUpdateTask()
```

Jadi satu fitur dapat menggunakan beberapa function yang sudah dibuat
sebelumnya.

------------------------------------------------------------------------

## 4. `currentTask` Menyimpan State

Variable:

``` js
let currentTask = {};
```

digunakan untuk mengetahui task yang sedang diedit.

Ketika edit dilakukan:

``` js
currentTask = taskData[dataArrIndex];
```

Kemudian `currentTask.id` digunakan untuk menemukan kembali task
tersebut ketika form disubmit.

Saya mulai memahami bahwa variable tertentu dapat digunakan untuk
menyimpan **state**, yaitu informasi tentang kondisi program saat ini.

------------------------------------------------------------------------

## 5. `findIndex()` Penting untuk CRUD

Pada project ini `findIndex()` digunakan untuk menemukan task
berdasarkan ID.

``` js
const dataArrIndex = taskData.findIndex(
  (item) => item.id === currentTask.id
);
```

Hasilnya dapat digunakan untuk:

``` text
-1
↓
Task belum ada

0, 1, 2, ...
↓
Task ditemukan
```

Konsep ini digunakan baik untuk add/update maupun delete.

------------------------------------------------------------------------

## 6. Array Berisi Object

`taskData` bukan sekadar array biasa.

Strukturnya:

``` text
Array
 ↓
Object
 ├── id
 ├── title
 ├── date
 └── description
```

Memahami struktur ini membantu saya memahami mengapa code seperti:

``` js
taskData[dataArrIndex].title
```

dapat digunakan.

------------------------------------------------------------------------

## 7. Update Memerlukan Identitas Data

Untuk mengubah task, program perlu mengetahui task mana yang akan
diubah.

Project ini menggunakan:

``` js
id
```

sebagai identitas task.

Alurnya:

``` text
Button Edit
    ↓
Parent ID
    ↓
findIndex()
    ↓
Task ditemukan
    ↓
currentTask
    ↓
Update
```

------------------------------------------------------------------------

## 8. Delete Harus Mengubah Dua Tempat

Ketika task dihapus, bukan hanya tampilan yang harus berubah.

DOM:

``` js
buttonEl.parentElement.remove();
```

dan data:

``` js
taskData.splice(dataArrIndex, 1);
```

kemudian `localStorage` juga harus diperbarui.

Jika salah satu bagian tidak diperbarui, data aplikasi dapat menjadi
tidak sinkron.

------------------------------------------------------------------------

## 9. Event Membuat Aplikasi Interaktif

Aplikasi mulai terasa seperti aplikasi nyata karena JavaScript merespons
tindakan pengguna.

Contohnya:

``` text
Click
 ↓
Event Listener
 ↓
Function
 ↓
Perubahan DOM / Data
```

------------------------------------------------------------------------

# Alur Lengkap Aplikasi

``` text
User
 ↓
Add New Task
 ↓
Form muncul
 ↓
Isi title/date/description
 ↓
Submit
 ↓
addOrUpdateTask()
 ↓
Buat task object
 ↓
Masukkan ke taskData
 ↓
JSON.stringify()
 ↓
localStorage
 ↓
updateTaskContainer()
 ↓
Task tampil
```

Ketika halaman dibuka kembali:

``` text
Browser
 ↓
localStorage
 ↓
getItem("data")
 ↓
JSON.parse()
 ↓
taskData
 ↓
updateTaskContainer()
 ↓
Task tampil kembali
```

Ketika task diedit:

``` text
Edit
 ↓
editTask()
 ↓
currentTask
 ↓
Form terisi
 ↓
Submit
 ↓
findIndex()
 ↓
Replace object
 ↓
localStorage
 ↓
Render ulang
```

Ketika task dihapus:

``` text
Delete
 ↓
deleteTask()
 ↓
findIndex()
 ↓
splice()
 ↓
DOM remove()
 ↓
localStorage
```

------------------------------------------------------------------------

# Catatan Pengembangan

Workshop ini memiliki **66 steps**, sehingga beberapa bagian terasa
berulang karena function yang sudah dibuat sebelumnya terus digunakan
kembali ketika fitur baru ditambahkan.

Saya mengalami bahwa memahami setiap syntax secara terpisah belum selalu
cukup untuk langsung memahami keseluruhan aplikasi.

Bagian yang paling menantang bukan lagi `setItem()`, `getItem()`,
`JSON.parse()`, atau `JSON.stringify()` secara individual, tetapi
memahami **bagaimana beberapa function, array, object, DOM, event, dan
localStorage saling terhubung dalam satu alur aplikasi**.

Hal tersebut menjadi catatan penting sebelum melanjutkan ke project
berikutnya yang memiliki pola serupa.

------------------------------------------------------------------------

# Tech Stack

  Technology      Penggunaan
  --------------- ------------------------------------
  HTML            Struktur Todo App
  CSS             Tampilan Todo App
  JavaScript      Logic aplikasi
  DOM API         Manipulasi halaman
  localStorage    Persistent storage
  JSON            Serialisasi dan deserialisasi data
  Array Methods   Pengolahan task
  freeCodeCamp    Platform workshop

------------------------------------------------------------------------

# Status Project

  Item             Detail
  ---------------- --------------------------------------
  Platform         freeCodeCamp
  Workshop         Build a Todo App Using Local Storage
  Category         JavaScript
  Main Concept     localStorage + CRUD
  Data Structure   Array of Objects
  Storage          Browser localStorage
  Steps            66
  Status           Completed

------------------------------------------------------------------------

## Personal Notes

Workshop ini menjadi salah satu latihan yang mulai membuat saya melihat
JavaScript sebagai bagian dari sebuah aplikasi yang saling terhubung.

Saya sudah memahami penggunaan dasar:

``` js
localStorage.setItem()
localStorage.getItem()
JSON.stringify()
JSON.parse()
```

Namun setelah mengerjakan workshop dengan 66 steps, saya menyadari bahwa
tantangannya bukan hanya memahami satu syntax.

Saya perlu memahami bagaimana data bergerak dari form, masuk ke object,
disimpan ke array, diubah menjadi JSON, disimpan di `localStorage`,
diambil kembali, kemudian ditampilkan ke DOM.

Struktur sederhananya:

``` text
Form
 ↓
Object
 ↓
Array
 ↓
JSON
 ↓
localStorage
 ↓
JSON.parse()
 ↓
Array
 ↓
DOM
```

Saya juga mulai memahami bahwa ketika project semakin besar, function
yang sudah dibuat sebelumnya sering kali harus digunakan kembali oleh
function lain.

Hal tersebut membuat saya sempat merasa hang ketika harus memulai
project berikutnya, terutama karena project selanjutnya memiliki pola
yang mirip.

Untuk saat ini, saya ingin lebih memahami **alur data dan hubungan
antar-function**, bukan sekadar menghafalkan syntax.

Project ini membantu saya menghubungkan materi **localStorage, CRUD,
DOM, array, object, JSON, dan event handling** ke dalam satu aplikasi
JavaScript yang lebih nyata.
