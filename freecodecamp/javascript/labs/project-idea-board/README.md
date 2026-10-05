# Project Idea Board

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-Classes-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript Classes" />
  <img src="https://img.shields.io/badge/freeCodeCamp-Lab-0A0A23?logo=freecodecamp&logoColor=white" alt="freeCodeCamp Lab" />
  <img src="https://img.shields.io/badge/Topic-Object%20Oriented%20Programming-4B5563" alt="Object Oriented Programming" />
</p>

> **Milestone:** Lab setelah mempelajari JavaScript Classes, constructor, methods, inheritance, dan static members.

Lab ini digunakan untuk memahami bagaimana **class** dapat digunakan sebagai blueprint untuk membuat object yang memiliki property dan method.

Pada project ini terdapat dua class utama:

- `ProjectIdea`
- `ProjectIdeaBoard`

`ProjectIdea` digunakan untuk merepresentasikan sebuah ide project.

`ProjectIdeaBoard` digunakan untuk mengelola kumpulan project idea yang dapat di-*pin* dan di-*unpin*.

---

## Konsep Utama

Project ini menggunakan beberapa konsep JavaScript:

```text
Object
Class
Constructor
this
Method
Array
findIndex()
splice()
forEach()
Template Literal
Object Property
```

Konsep-konsep tersebut digabungkan untuk membuat sistem sederhana yang dapat menyimpan dan mengelola kumpulan ide project.

---

## Source Code

```js
const projectStatus = {
  PENDING: {
    description: "Pending Execution"
  },
  SUCCESS: {
    description: "Executed Successfully"
  },
  FAILURE: {
    description: "Execution Failed"
  }
};

class ProjectIdea {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.status = projectStatus.PENDING;
  }

  updateProjectStatus(newStatus) {
    this.status = newStatus;
  }
}

class ProjectIdeaBoard {
  constructor(title) {
    this.title = title;
    this.ideas = [];
  }

  pin(ProjectIdea) {
    this.ideas.push(ProjectIdea);
  }

  unpin(ProjectIdea) {
    const index = this.ideas.findIndex(idea => idea === ProjectIdea);
    this.ideas.splice(index, 1);
  }

  count() {
    return this.ideas.length;
  }

  formatToString() {
    let result = `${this.title} has ${this.count()} idea(s)\n`;

    this.ideas.forEach(idea => {
      result += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;
    });

    return result;
  }
}
```

---

## Apa yang Dilakukan Project Ini?

Project ini membuat sebuah **Project Idea Board**.

Board memiliki:

- judul board,
- kumpulan project ideas,
- kemampuan menambahkan idea,
- kemampuan menghapus idea,
- kemampuan menghitung jumlah idea,
- kemampuan mengubah seluruh data menjadi string.

Contohnya:

```js
const techProjects = new ProjectIdeaBoard("Tech Projects Board");
```

Kemudian kita membuat sebuah project idea:

```js
const smartHome = new ProjectIdea(
  "Smart Home System",
  "An integrated system to control lighting, temperature, and security devices remotely."
);
```

Idea tersebut kemudian dapat dimasukkan ke board:

```js
techProjects.pin(smartHome);
```

---

## 1. Membuat Object `projectStatus`

Bagian pertama adalah membuat sebuah object constant:

```js
const projectStatus = {
  PENDING: {
    description: "Pending Execution"
  },
  SUCCESS: {
    description: "Executed Successfully"
  },
  FAILURE: {
    description: "Execution Failed"
  }
};
```

Object ini digunakan sebagai kumpulan status yang dapat digunakan oleh setiap `ProjectIdea`.

Strukturnya adalah:

| Status | Description |
|---|---|
| `PENDING` | `Pending Execution` |
| `SUCCESS` | `Executed Successfully` |
| `FAILURE` | `Execution Failed` |

Jadi kita tidak perlu menulis string status berulang kali.

Contohnya:

```js
projectStatus.PENDING
```

menghasilkan object:

```js
{
  description: "Pending Execution"
}
```

Sedangkan:

```js
projectStatus.SUCCESS
```

menghasilkan:

```js
{
  description: "Executed Successfully"
}
```

---

## 2. Membuat Class `ProjectIdea`

Class pertama yang dibuat adalah:

```js
class ProjectIdea {
  // ...
}
```

Class dapat dianggap sebagai **blueprint** untuk membuat object dengan struktur yang sama.

Kalau kita membutuhkan banyak project idea, kita tidak perlu membuat setiap object secara manual.

Kita cukup menggunakan:

```js
new ProjectIdea(...)
```

---

## 3. Constructor `ProjectIdea`

Constructor:

```js
constructor(title, description) {
  this.title = title;
  this.description = description;
  this.status = projectStatus.PENDING;
}
```

Constructor akan dipanggil secara otomatis ketika kita membuat instance baru menggunakan `new`.

Contohnya:

```js
const smartHome = new ProjectIdea(
  "Smart Home System",
  "An integrated system to control lighting, temperature, and security devices remotely."
);
```

Object yang dihasilkan memiliki tiga property:

```text
title
description
status
```

---

## 4. Memahami `this`

Bagian:

```js
this.title = title;
```

berarti nilai parameter `title` dimasukkan ke property `title` milik object yang sedang dibuat.

Begitu juga:

```js
this.description = description;
```

dan:

```js
this.status = projectStatus.PENDING;
```

Jadi ketika membuat:

```js
const idea = new ProjectIdea(
  "Smart Home System",
  "An integrated system..."
);
```

maka object tersebut memiliki:

```js
idea.title
idea.description
idea.status
```

`this` mengacu pada instance object yang sedang digunakan.

---

## 5. Default Status

Setiap project idea baru otomatis mendapatkan status:

```js
projectStatus.PENDING
```

Karena pada constructor terdapat:

```js
this.status = projectStatus.PENDING;
```

Maka:

```js
const idea = new ProjectIdea(
  "Smart Window Locks",
  "An automation project..."
);
```

akan memiliki status:

```js
{
  description: "Pending Execution"
}
```

Artinya setiap idea baru dianggap masih **Pending Execution**.

---

## 6. Method `updateProjectStatus()`

Class `ProjectIdea` memiliki method:

```js
updateProjectStatus(newStatus) {
  this.status = newStatus;
}
```

Method ini digunakan untuk mengubah status project idea.

Contohnya:

```js
idea.updateProjectStatus(projectStatus.SUCCESS);
```

Status idea kemudian berubah menjadi:

```js
{
  description: "Executed Successfully"
}
```

Jika ingin mengubahnya menjadi gagal:

```js
idea.updateProjectStatus(projectStatus.FAILURE);
```

hasilnya:

```js
{
  description: "Execution Failed"
}
```

---

## 7. Membuat Class `ProjectIdeaBoard`

Class kedua adalah:

```js
class ProjectIdeaBoard {
  // ...
}
```

Class ini bertugas mengelola banyak `ProjectIdea`.

Kalau `ProjectIdea` merepresentasikan **satu ide**, maka `ProjectIdeaBoard` merepresentasikan **tempat untuk mengelola banyak ide**.

---

## 8. Constructor `ProjectIdeaBoard`

Constructor:

```js
constructor(title) {
  this.title = title;
  this.ideas = [];
}
```

Ada dua property yang dibuat:

| Property | Fungsi |
|---|---|
| `title` | Menyimpan nama board |
| `ideas` | Menyimpan kumpulan project ideas |

Ketika board dibuat:

```js
const techProjects = new ProjectIdeaBoard(
  "Tech Projects Board"
);
```

maka:

```js
techProjects.title
```

berisi:

```text
Tech Projects Board
```

Sedangkan:

```js
techProjects.ideas
```

berisi:

```js
[]
```

Artinya board masih kosong.

---

## 9. Method `pin()`

Method `pin()` digunakan untuk memasukkan sebuah project idea ke dalam board.

```js
pin(ProjectIdea) {
  this.ideas.push(ProjectIdea);
}
```

Bagian:

```js
this.ideas
```

mengacu pada array milik board.

Sedangkan:

```js
.push()
```

digunakan untuk menambahkan object ke akhir array.

Contoh:

```js
const idea = new ProjectIdea(
  "Smart Home System",
  "An integrated system..."
);

techProjects.pin(idea);
```

Sekarang:

```js
techProjects.ideas
```

sudah memiliki satu object.

---

## 10. Method `unpin()`

Method `unpin()` digunakan untuk menghapus project idea tertentu dari board.

```js
unpin(ProjectIdea) {
  const index = this.ideas.findIndex(
    idea => idea === ProjectIdea
  );

  this.ideas.splice(index, 1);
}
```

Ada dua method array yang digunakan:

```js
findIndex()
```

dan:

```js
splice()
```

---

## 11. `findIndex()`

`findIndex()` digunakan untuk mencari posisi sebuah item di dalam array.

Contohnya:

```js
const index = this.ideas.findIndex(
  idea => idea === ProjectIdea
);
```

Callback:

```js
idea => idea === ProjectIdea
```

memeriksa setiap item dalam array.

Jika object yang dicari berada pada index `0`, maka:

```js
index
```

akan memiliki nilai:

```text
0
```

Jika berada pada index `2`:

```text
2
```

---

## 12. `splice()`

Setelah mendapatkan posisi object, kita menggunakan:

```js
this.ideas.splice(index, 1);
```

Parameter pertama:

```js
index
```

menentukan posisi item yang akan dihapus.

Parameter kedua:

```js
1
```

menentukan jumlah item yang dihapus.

Jadi:

```js
splice(index, 1)
```

berarti:

> Hapus satu item mulai dari posisi `index`.

Contohnya jika:

```js
this.ideas
```

berisi:

```text
Idea A
Idea B
Idea C
```

dan `Idea B` berada pada index `1`, maka:

```js
splice(1, 1)
```

akan menghapus `Idea B`.

---

## 13. Method `count()`

Method:

```js
count() {
  return this.ideas.length;
}
```

digunakan untuk menghitung jumlah project idea dalam board.

Property:

```js
this.ideas.length
```

mengembalikan jumlah item dalam array.

Jika:

```js
this.ideas = [];
```

maka:

```js
this.ideas.length
```

bernilai:

```text
0
```

Jika ada satu idea:

```text
1
```

Jika ada tiga idea:

```text
3
```

---

## 14. Method `formatToString()`

Method ini digunakan untuk mengubah isi board menjadi sebuah string yang memiliki format tertentu.

```js
formatToString() {
  let result = `${this.title} has ${this.count()} idea(s)\n`;

  this.ideas.forEach(idea => {
    result += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;
  });

  return result;
}
```

Bagian pertama:

```js
let result =
  `${this.title} has ${this.count()} idea(s)\n`;
```

menghasilkan informasi tentang board.

Misalnya:

```text
Tech Projects Board has 1 idea(s)
```

---

## 15. Template Literal

Kode:

```js
`${this.title} has ${this.count()} idea(s)\n`
```

menggunakan **template literal**.

Template literal menggunakan:

```text
`
```

(backtick), bukan tanda kutip biasa.

Dengan template literal kita dapat memasukkan nilai JavaScript ke dalam string menggunakan:

```js
${...}
```

Contohnya:

```js
`${this.title}`
```

mengambil nilai:

```js
this.title
```

Sedangkan:

```js
`${this.count()}`
```

memanggil method:

```js
count()
```

---

## 16. `forEach()` Untuk Menampilkan Semua Idea

Bagian:

```js
this.ideas.forEach(idea => {
  result += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;
});
```

digunakan untuk memproses setiap project idea di dalam array.

Misalnya board memiliki:

```text
Idea A
Idea B
Idea C
```

maka `forEach()` akan menjalankan callback sebanyak tiga kali.

Pada setiap iterasi, variable:

```js
idea
```

mengacu pada satu object `ProjectIdea`.

---

## 17. Mengakses Property Bertingkat

Perhatikan:

```js
idea.status.description
```

Kenapa menggunakan dua `.description`?

Karena struktur object-nya adalah:

```js
idea
```

memiliki:

```js
status
```

dan `status` memiliki:

```js
description
```

Strukturnya:

```text
ProjectIdea
└── status
    └── description
```

Sehingga:

```js
idea.status.description
```

menghasilkan:

```text
Pending Execution
```

---

## 18. Format Output

Jika board kosong:

```js
const emptyBoard =
  new ProjectIdeaBoard("Empty Board");

emptyBoard.formatToString();
```

hasilnya:

```text
Empty Board has 0 idea(s)
```

Jika board memiliki satu idea:

```js
const techProjects =
  new ProjectIdeaBoard("Tech Projects Board");

const smartHome =
  new ProjectIdea(
    "Smart Home System",
    "An integrated system to control lighting, temperature, and security devices remotely."
  );

techProjects.pin(smartHome);
```

maka:

```js
techProjects.formatToString();
```

menghasilkan:

```text
Tech Projects Board has 1 idea(s)
Smart Home System (Pending Execution) - An integrated system to control lighting, temperature, and security devices remotely.
```

---

## 19. Alur Penggunaan Class

Secara konsep, penggunaan project ini dapat dibagi menjadi beberapa tahap.

### Membuat board

```js
const board =
  new ProjectIdeaBoard("Tech Projects Board");
```

### Membuat idea

```js
const idea =
  new ProjectIdea(
    "Smart Home System",
    "An integrated system..."
  );
```

### Memasukkan idea ke board

```js
board.pin(idea);
```

### Menghitung idea

```js
board.count();
```

### Mengubah status

```js
idea.updateProjectStatus(projectStatus.SUCCESS);
```

### Mengubah board menjadi string

```js
board.formatToString();
```

---

## 20. Hubungan Antar-Class

Pada project ini terdapat hubungan antara:

```text
ProjectIdea
```

dan:

```text
ProjectIdeaBoard
```

`ProjectIdeaBoard` menyimpan banyak object yang dibuat dari class `ProjectIdea`.

Property:

```js
this.ideas
```

adalah tempat penyimpanan object-object tersebut.

Contohnya:

```js
board.ideas
```

dapat berisi:

```js
[
  projectIdea1,
  projectIdea2,
  projectIdea3
]
```

Setiap object tersebut tetap memiliki property dan method dari `ProjectIdea`.

---

## Method yang Dipakai

| Method / Syntax | Kegunaan |
|---|---|
| `constructor()` | Membuat dan menginisialisasi instance |
| `new` | Membuat instance dari class |
| `this` | Mengacu pada object/instance yang sedang digunakan |
| `push()` | Menambahkan item ke akhir array |
| `findIndex()` | Mencari index item berdasarkan kondisi |
| `splice()` | Menghapus item dari array |
| `length` | Menghitung jumlah item dalam array |
| `forEach()` | Mengulang setiap item dalam array |
| `updateProjectStatus()` | Mengubah status project idea |
| `pin()` | Menambahkan idea ke board |
| `unpin()` | Menghapus idea dari board |
| `count()` | Menghitung jumlah idea |
| `formatToString()` | Mengubah isi board menjadi string |

---

## Bagian yang Paling Penting Buat Saya

Ada beberapa konsep yang paling penting untuk saya pahami dari lab ini.

### Class adalah Blueprint

```js
class ProjectIdea {
  // ...
}
```

Class bukan satu project idea tertentu.

Class adalah blueprint yang digunakan untuk membuat banyak object dengan struktur yang sama.

---

### `new` Membuat Instance

```js
const idea =
  new ProjectIdea("Smart Home", "...");
```

`new` digunakan untuk membuat instance baru dari class.

Constructor kemudian dijalankan secara otomatis.

---

### `this` Mengacu Pada Instance

```js
this.title = title;
```

`this.title` adalah property milik object yang sedang dibuat.

Sedangkan:

```js
title
```

adalah parameter yang diberikan ketika constructor dipanggil.

---

### Method Berada di Dalam Class

Contohnya:

```js
count() {
  return this.ideas.length;
}
```

Method adalah function yang menjadi bagian dari class.

Method dapat dipanggil melalui instance:

```js
board.count();
```

---

### Array Dapat Menyimpan Object

Property:

```js
this.ideas = [];
```

merupakan array yang digunakan untuk menyimpan object `ProjectIdea`.

Contohnya:

```js
this.ideas.push(idea);
```

---

### Object Bisa Memiliki Object Lain

Pada project ini:

```js
idea.status.description
```

menunjukkan bahwa property `status` sendiri merupakan object.

Strukturnya:

```js
{
  status: {
    description: "Pending Execution"
  }
}
```

---

## Catatan Tentang `pin()` dan `unpin()`

`pin()` menambahkan object:

```js
this.ideas.push(ProjectIdea);
```

Sedangkan `unpin()` terlebih dahulu mencari posisi object:

```js
const index = this.ideas.findIndex(
  idea => idea === ProjectIdea
);
```

Kemudian menghapusnya:

```js
this.ideas.splice(index, 1);
```

Hal yang penting adalah `findIndex()` membandingkan object berdasarkan reference.

Jadi object yang diberikan ke `unpin()` harus merupakan instance yang memang tersimpan di dalam array.

---

## Ringkasan Cepat

| Konsep | Fungsi |
|---|---|
| `class` | Membuat blueprint object |
| `constructor()` | Menginisialisasi object ketika dibuat |
| `new` | Membuat instance dari class |
| `this` | Mengacu pada instance yang sedang digunakan |
| `ProjectIdea` | Merepresentasikan satu ide project |
| `ProjectIdeaBoard` | Mengelola kumpulan project idea |
| `projectStatus` | Menyimpan status project |
| `PENDING` | Status awal project |
| `SUCCESS` | Project berhasil dijalankan |
| `FAILURE` | Project gagal dijalankan |
| `pin()` | Menambahkan idea ke board |
| `unpin()` | Menghapus idea dari board |
| `count()` | Menghitung jumlah idea |
| `findIndex()` | Mencari posisi object dalam array |
| `splice()` | Menghapus item dari array |
| `forEach()` | Mengulang seluruh item array |
| `formatToString()` | Menghasilkan representasi string board |
| `push()` | Menambahkan item ke array |
| `length` | Mengambil jumlah item array |
| Template Literal | Membuat string dengan `${...}` |

---

## Catatan Belajar

- **Class** adalah blueprint yang dapat digunakan untuk membuat banyak object dengan struktur yang sama.
- **Constructor** dijalankan otomatis ketika instance dibuat menggunakan `new`.
- **`this`** digunakan untuk mengakses property dan method milik instance saat ini.
- **Method** adalah function yang didefinisikan di dalam class.
- **Array** dapat digunakan untuk menyimpan banyak object.
- **`push()`** menambahkan object ke dalam array.
- **`findIndex()`** membantu mencari posisi object dalam array.
- **`splice()`** dapat digunakan untuk menghapus object dari array.
- **`forEach()`** digunakan untuk memproses setiap object dalam array.
- **Template literal** memudahkan pembuatan string yang berisi nilai variable atau hasil function.
- **Object bertingkat** dapat diakses menggunakan beberapa dot notation seperti `idea.status.description`.
- **Instance** adalah object yang dibuat dari sebuah class menggunakan `new`.

---

## What I Practiced

```text
JavaScript Classes
Class Declaration
Constructor
Object Instances
The this Keyword
Class Methods
Object Properties
Nested Objects
Array of Objects
Array.push()
Array.findIndex()
Array.splice()
Array.forEach()
Array.length
Template Literals
Object-Oriented Programming
Class-based Data Modeling
Status Management
```

---

<p align="center">
  <strong>Classes Section — Project Idea Board Completed</strong><br>
  <sub>Next stop: continue the JavaScript Certification journey.</sub>
</p>

---

**Platform:** freeCodeCamp  
**Lab:** Build a Project Idea Board  
**Language:** JavaScript  
**Focus:** Classes, Objects, Methods & Object-Oriented Programming
