# Build a Device Loan Ledger

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-Objects-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript Objects" />
  <img src="https://img.shields.io/badge/freeCodeCamp-Lab-0A0A23?logo=freecodecamp&logoColor=white" alt="freeCodeCamp Lab" />
  <img src="https://img.shields.io/badge/Topic-Data%20Management-4B5563" alt="Data Management" />
</p>

Lab ini membuat sistem sederhana untuk mengelola peminjaman perangkat IT.

Setiap perangkat disimpan di dalam sebuah object bernama `equipmentLedger`. Asset tag seperti `"1"`, `"2"`, `"3"`, dan `"4"` digunakan sebagai key untuk mengakses perangkat tertentu.

Fitur yang dibuat:

- Checkout perangkat.
- Check-in perangkat.
- Mencari perangkat yang terlambat dikembalikan.
- Mengurutkan perangkat berdasarkan tanggal.
- Menyimpan ledger menjadi JSON.
- Mengubah JSON kembali menjadi object JavaScript.
- Mengubah data tanpa memodifikasi object asli.

---

## Source Code

```js
const equipmentLedger = {
  "1": {
    type: "PC",
    status: "CheckedOut",
    borrower: {
      name: "John Smith",
      email: "john@acme.org"
    },
    dueDate: "11/30/2025"
  },

  "2": {
    type: "Laptop",
    status: "CheckedIn",
    borrower: {
      name: "",
      email: ""
    },
    dueDate: ""
  },

  "3": {
    type: "Laptop",
    status: "CheckedOut",
    borrower: {
      name: "Jane Doe",
      email: "jane@acme.org"
    },
    dueDate: "10/31/2025"
  },

  "4": {
    type: "iPad",
    status: "CheckedIn",
    borrower: {
      name: "",
      email: ""
    },
    dueDate: ""
  }
};

function checkoutDevice(ledger, assetTag, borrower) {
  const device = ledger[assetTag];

  if (!device) {
    return {
      ledger: ledger,
      message: `Asset tag ${assetTag} was not found`
    };
  }

  if (device.status === "CheckedOut") {
    return {
      ledger: ledger,
      message: `Asset tag ${assetTag} is already checked out`
    };
  }

  const updatedLedger = { ...ledger };

  const updatedDevice = {
    ...device,
    borrower: {
      ...device.borrower
    }
  };

  updatedDevice.status = "CheckedOut";
  updatedDevice.borrower.name = borrower.name;
  updatedDevice.borrower.email = borrower.email;

  updatedLedger[assetTag] = updatedDevice;

  return {
    ledger: updatedLedger,
    message: `Asset tag ${assetTag} checked out to ${borrower.name}`
  };
}

function checkinDevice(ledger, assetTag) {
  const device = ledger[assetTag];

  if (!device) {
    return {
      ledger: ledger,
      message: `Asset tag ${assetTag} was not found`
    };
  }

  const updatedLedger = { ...ledger };

  const updatedDevice = {
    ...device,
    borrower: {
      ...device.borrower
    }
  };

  updatedDevice.borrower.name = "";
  updatedDevice.borrower.email = "";
  updatedDevice.dueDate = "";
  updatedDevice.status = "CheckedIn";

  updatedLedger[assetTag] = updatedDevice;

  return {
    ledger: updatedLedger,
    message: `Asset tag ${assetTag} checked in`
  };
}

function parseDate(dateString) {
  return dateString.split("/").map(Number);
}

function dateToNumber(dateString) {
  const [month, day, year] = parseDate(dateString);

  return (year * 10000) + (month * 100) + day;
}

function listOverdueDevices(ledger, today) {
  const devices = Object.values(ledger);

  console.log(devices);

  const overdueDevices = devices.filter((device) => {
    return (
      device.status === "CheckedOut" &&
      dateToNumber(device.dueDate) < dateToNumber(today)
    );
  });

  overdueDevices.sort((a, b) => {
    return (
      dateToNumber(a.dueDate) -
      dateToNumber(b.dueDate)
    );
  });

  return overdueDevices;
}

console.log(
  listOverdueDevices(
    equipmentLedger,
    "12/5/2025"
  )
);

function serializeLedger(ledger) {
  return JSON.stringify(ledger);
}

function loadLedger(json) {
  return JSON.parse(json);
}
```

---

## Bentuk Data Ledger

Ledger merupakan object.

```js
const equipmentLedger = {
  "1": {
    type: "PC",
    status: "CheckedOut",
    borrower: {
      name: "John Smith",
      email: "john@acme.org"
    },
    dueDate: "11/30/2025"
  }
};
```

Asset tag:

```text
"1"
```

merupakan key.

Sedangkan:

```js
{
  type: "PC",
  status: "CheckedOut",
  borrower: { ... },
  dueDate: "11/30/2025"
}
```

merupakan value-nya.

Karena asset tag disimpan sebagai key, perangkat dapat diakses dengan:

```js
ledger[assetTag]
```

Contoh:

```js
ledger["1"]
```

mengambil perangkat dengan asset tag `"1"`.

---

## Struktur Sebuah Device

Setiap perangkat mempunyai:

| Property | Isi |
|---|---|
| `type` | Jenis perangkat |
| `status` | `"CheckedIn"` atau `"CheckedOut"` |
| `borrower.name` | Nama peminjam |
| `borrower.email` | Email peminjam |
| `dueDate` | Tanggal batas pengembalian |

Property `borrower` sendiri merupakan object di dalam object:

```js
borrower: {
  name: "",
  email: ""
}
```

Ini disebut **nested object**.

---

# `checkoutDevice()`

```js
function checkoutDevice(
  ledger,
  assetTag,
  borrower
)
```

Function ini digunakan ketika sebuah perangkat akan dipinjam.

Parameter:

| Parameter | Fungsi |
|---|---|
| `ledger` | Data perangkat |
| `assetTag` | ID perangkat |
| `borrower` | Data orang yang meminjam |

---

## Mengambil Device

```js
const device = ledger[assetTag];
```

Kalau:

```js
assetTag = "2";
```

maka JavaScript mengambil:

```js
ledger["2"];
```

Kalau asset tag tersebut tidak ada:

```js
ledger["99"];
```

hasilnya:

```js
undefined
```

---

## Menangani Asset Tag yang Tidak Ditemukan

```js
if (!device) {
  return {
    ledger: ledger,
    message: `Asset tag ${assetTag} was not found`
  };
}
```

Jika perangkat tidak ditemukan, ledger langsung dikembalikan tanpa perubahan.

Tidak ada object baru yang perlu dibuat karena tidak ada data yang perlu diperbarui.

---

## Menangani Device yang Sudah Dipinjam

```js
if (device.status === "CheckedOut") {
  return {
    ledger: ledger,
    message: `Asset tag ${assetTag} is already checked out`
  };
}
```

Jika status sudah:

```text
CheckedOut
```

perangkat tidak boleh diberikan kepada borrower lain.

Borrower yang sudah ada juga tidak diubah.

---

# Clone Object dengan Spread Syntax

Salah satu bagian paling penting di lab ini adalah:

```js
const updatedLedger = {
  ...ledger
};
```

`...ledger` menyalin property dari `ledger` ke object baru.

Artinya:

```js
updatedLedger !== ledger
```

Keduanya merupakan object yang berbeda.

Ini penting karena requirement meminta agar function tidak memodifikasi ledger asli.

---

## Kenapa Device Juga Harus Dicopy?

Setelah ledger dicopy, device juga dibuat ulang:

```js
const updatedDevice = {
  ...device,
  borrower: {
    ...device.borrower
  }
};
```

Kenapa tidak cukup:

```js
const updatedDevice = {
  ...device
};
```

Karena `borrower` merupakan nested object.

Spread syntax:

```js
{ ...device }
```

hanya melakukan **shallow copy**.

Object di dalamnya masih dapat mempunyai reference yang sama.

Karena `borrower.name` dan `borrower.email` akan diubah, `borrower` juga dibuat sebagai object baru:

```js
borrower: {
  ...device.borrower
}
```

---

<details>
<summary><strong>Catatan penting: shallow copy</strong></summary>

<br>

Kode:

```js
const copy = { ...original };
```

membuat object baru pada level terluar.

Tetapi jika ada nested object:

```js
const original = {
  borrower: {
    name: "John"
  }
};
```

maka nested object perlu diperhatikan secara terpisah.

Pada lab ini dilakukan:

```js
const updatedDevice = {
  ...device,
  borrower: {
    ...device.borrower
  }
};
```

Sehingga baik device maupun borrower mempunyai object baru sebelum dimodifikasi.

</details>

---

# Mengubah Device yang Dicopy

```js
updatedDevice.status = "CheckedOut";
updatedDevice.borrower.name = borrower.name;
updatedDevice.borrower.email = borrower.email;
```

Yang diubah adalah:

```js
updatedDevice
```

bukan:

```js
device
```

Setelah itu device baru dimasukkan kembali ke ledger baru:

```js
updatedLedger[assetTag] =
  updatedDevice;
```

---

## Return dari Checkout

```js
return {
  ledger: updatedLedger,
  message:
    `Asset tag ${assetTag} checked out to ${borrower.name}`
};
```

Function tidak hanya mengembalikan ledger.

Function mengembalikan object yang mempunyai dua property:

```js
{
  ledger: ...,
  message: ...
}
```

Ini membuat hasil operasi membawa:

- Data ledger terbaru.
- Pesan hasil operasi.

---

# `checkinDevice()`

```js
function checkinDevice(
  ledger,
  assetTag
)
```

Function ini digunakan ketika perangkat dikembalikan.

Logikanya hampir sama dengan checkout:

1. Cari device.
2. Pastikan device ada.
3. Clone ledger.
4. Clone device.
5. Clone borrower.
6. Bersihkan data peminjaman.
7. Simpan device baru ke ledger baru.
8. Return hasil.

---

## Membersihkan Data Borrower

```js
updatedDevice.borrower.name = "";
updatedDevice.borrower.email = "";
```

Setelah perangkat dikembalikan, informasi borrower dikosongkan.

---

## Mengosongkan `dueDate`

```js
updatedDevice.dueDate = "";
```

Perangkat yang sudah kembali tidak lagi mempunyai tanggal jatuh tempo peminjaman.

---

## Mengubah Status

```js
updatedDevice.status =
  "CheckedIn";
```

Status perangkat kembali menjadi:

```text
CheckedIn
```

---

## Hasil Check-in

```js
return {
  ledger: updatedLedger,
  message:
    `Asset tag ${assetTag} checked in`
};
```

Ledger hasil check-in dikembalikan bersama pesan konfirmasi.

---

# Mengolah Tanggal Tanpa `Date`

Lab ini secara khusus melarang penggunaan:

```js
new Date()
```

Karena itu tanggal seperti:

```text
11/30/2025
```

diolah sendiri.

---

## `parseDate()`

```js
function parseDate(dateString) {
  return dateString
    .split("/")
    .map(Number);
}
```

Contoh:

```js
parseDate("11/30/2025");
```

Pertama:

```js
"11/30/2025".split("/");
```

menghasilkan:

```js
["11", "30", "2025"]
```

Kemudian:

```js
.map(Number)
```

mengubah setiap string menjadi number:

```js
[11, 30, 2025]
```

Format hasilnya:

```text
[month, day, year]
```

---

## Zero-Padded dan Non-Zero-Padded

Dua tanggal ini:

```text
9/5/2025
09/05/2025
```

setelah:

```js
.map(Number)
```

sama-sama menjadi:

```js
[9, 5, 2025]
```

Jadi function tetap bisa menangani tanggal yang menggunakan angka nol di depan maupun tidak.

---

# `dateToNumber()`

```js
function dateToNumber(dateString) {
  const [month, day, year] =
    parseDate(dateString);

  return (
    (year * 10000) +
    (month * 100) +
    day
  );
}
```

Array:

```js
[11, 30, 2025]
```

langsung dibongkar menggunakan destructuring:

```js
const [month, day, year] = ...
```

Hasilnya:

```js
month = 11;
day = 30;
year = 2025;
```

Kemudian tanggal dibuat menjadi angka dengan urutan:

```text
YYYYMMDD
```

Contoh:

```text
11/30/2025
```

menjadi:

```text
20251130
```

Dengan bentuk angka seperti ini, tanggal dapat dibandingkan secara langsung.

---

## Contoh Perbandingan Tanggal

```text
10/31/2025
```

menjadi:

```text
20251031
```

Sedangkan:

```text
12/5/2025
```

menjadi:

```text
20251205
```

Maka:

```js
20251031 < 20251205
```

menghasilkan:

```js
true
```

Artinya tanggal jatuh tempo lebih awal daripada tanggal hari ini.

---

# `listOverdueDevices()`

```js
function listOverdueDevices(
  ledger,
  today
)
```

Function ini mengembalikan array perangkat yang terlambat dikembalikan.

Sebuah perangkat dianggap overdue jika:

```js
device.status === "CheckedOut"
```

dan:

```js
dateToNumber(device.dueDate) <
dateToNumber(today)
```

Kedua kondisi harus benar.

---

## `Object.values()`

Ledger awal berbentuk object:

```js
{
  "1": { ... },
  "2": { ... },
  "3": { ... }
}
```

Untuk melakukan `filter()` dan `sort()`, value dari object diambil dengan:

```js
const devices =
  Object.values(ledger);
```

Hasilnya berupa array:

```js
[
  { ...device1 },
  { ...device2 },
  { ...device3 }
]
```

Asset tag tidak ikut masuk karena `Object.values()` hanya mengambil value.

---

# Menyaring Device dengan `filter()`

```js
const overdueDevices =
  devices.filter((device) => {
    return (
      device.status === "CheckedOut" &&
      dateToNumber(device.dueDate) <
        dateToNumber(today)
    );
  });
```

Hanya device yang memenuhi **dua syarat** yang masuk ke array baru.

---

## Short-Circuit pada `&&`

Urutan kondisi di sini juga penting:

```js
device.status === "CheckedOut" &&
dateToNumber(device.dueDate) <
  dateToNumber(today)
```

JavaScript memeriksa bagian kiri terlebih dahulu.

Kalau:

```js
device.status === "CheckedOut"
```

hasilnya:

```js
false
```

maka bagian kanan tidak perlu diperiksa.

Ini berguna karena device yang `"CheckedIn"` memiliki:

```js
dueDate: ""
```

dan tidak perlu diproses sebagai tanggal overdue.

---

# Mengurutkan Tanggal dengan `sort()`

```js
overdueDevices.sort((a, b) => {
  return (
    dateToNumber(a.dueDate) -
    dateToNumber(b.dueDate)
  );
});
```

Jika hasil pengurangan negatif:

```text
a ditempatkan sebelum b
```

Jika positif:

```text
b ditempatkan sebelum a
```

Dengan begitu tanggal diurutkan secara ascending:

```text
tanggal paling awal
...
tanggal paling akhir
```

---

## Contoh Hasil Overdue

Dengan:

```js
listOverdueDevices(
  equipmentLedger,
  "12/5/2025"
);
```

dua perangkat yang sedang dipinjam adalah:

| Device | Due Date |
|---|---|
| Jane Doe's Laptop | `10/31/2025` |
| John Smith's PC | `11/30/2025` |

Karena keduanya lebih awal daripada:

```text
12/5/2025
```

keduanya masuk daftar overdue.

Setelah `sort()`:

```text
10/31/2025
11/30/2025
```

---

# JSON Serialization

Dua function terakhir menangani perubahan antara JavaScript object dan JSON string.

---

## `serializeLedger()`

```js
function serializeLedger(ledger) {
  return JSON.stringify(ledger);
}
```

`JSON.stringify()` mengubah:

```js
{
  name: "John"
}
```

menjadi string JSON:

```json
{"name":"John"}
```

Jadi:

```text
JavaScript Object → JSON String
```

---

## `loadLedger()`

```js
function loadLedger(json) {
  return JSON.parse(json);
}
```

`JSON.parse()` melakukan kebalikannya.

Dari:

```json
{"name":"John"}
```

menjadi:

```js
{
  name: "John"
}
```

Jadi:

```text
JSON String → JavaScript Object
```

---

<details>
<summary><strong>JSON.stringify() dan JSON.parse()</strong></summary>

<br>

Pasangan ini mudah diingat:

```js
JSON.stringify(object);
```

digunakan ketika data JavaScript perlu diubah menjadi string.

Sedangkan:

```js
JSON.parse(string);
```

digunakan ketika JSON string perlu dikembalikan menjadi object JavaScript.

Contoh:

```js
const json =
  serializeLedger(equipmentLedger);

const restoredLedger =
  loadLedger(json);
```

`restoredLedger` kembali menjadi object yang dapat diakses dengan JavaScript.

</details>

---

# Method dan Konsep yang Dipakai

| Syntax / Method | Kegunaan |
|---|---|
| `ledger[assetTag]` | Mengakses property secara dinamis |
| `{ ...object }` | Membuat shallow copy |
| Nested spread | Menyalin nested object |
| `Object.values()` | Mengambil seluruh value object menjadi array |
| `filter()` | Memilih device yang overdue |
| `sort()` | Mengurutkan berdasarkan tanggal |
| `split("/")` | Memecah tanggal |
| `map(Number)` | Mengubah string menjadi number |
| Array destructuring | Mengambil month, day, year |
| `&&` | Memastikan dua kondisi benar |
| `JSON.stringify()` | Object menjadi JSON string |
| `JSON.parse()` | JSON string menjadi object |

---

# Hal yang Paling Penting Buat Saya

## 1. Jangan langsung mengubah object asli

Daripada:

```js
ledger[assetTag].status =
  "CheckedOut";
```

lab ini membuat salinan terlebih dahulu:

```js
const updatedLedger = {
  ...ledger
};
```

dan:

```js
const updatedDevice = {
  ...device,
  borrower: {
    ...device.borrower
  }
};
```

Baru salinan tersebut yang diubah.

---

## 2. Nested object perlu diperhatikan

Spread syntax tidak otomatis melakukan deep copy ke semua level.

Karena `borrower` juga object:

```js
borrower: {
  name: "",
  email: ""
}
```

maka object tersebut dibuat ulang juga.

---

## 3. Tanggal bisa dibandingkan tanpa `Date`

Tanggal:

```text
month/day/year
```

diubah terlebih dahulu menjadi:

```text
year-month-day
```

dalam bentuk angka:

```text
20251130
```

Sehingga perbandingan:

```js
<
```

dan pengurutan:

```js
sort()
```

bisa dilakukan secara normal.

---

## 4. Object dan Array punya tugas berbeda

`ledger` cocok berbentuk object karena device perlu diakses berdasarkan asset tag:

```js
ledger["3"]
```

Tetapi saat ingin:

```text
filter
sort
```

data diubah menjadi array menggunakan:

```js
Object.values(ledger)
```

Ini membantu saya memahami kapan data lebih nyaman diproses sebagai object dan kapan sebagai array.

---

## Catatan Debugging

Di dalam:

```js
function listOverdueDevices(...)
```

masih terdapat:

```js
console.log(devices);
```

Baris ini berguna saat belajar karena bisa melihat hasil:

```js
Object.values(ledger)
```

secara langsung.

Kalau nanti project sudah final dan tidak lagi membutuhkan debugging, baris tersebut bisa dihapus.

---

## What I Practiced

```text
Objects
Nested Objects
Dynamic Property Access
Spread Syntax
Shallow Copy
Immutability
Object.values()
Array.filter()
Array.sort()
String.split()
Array.map()
Array Destructuring
Short-Circuit Evaluation
JSON.stringify()
JSON.parse()
```

---

<p align="center">
  <strong>Device Loan Ledger — Completed</strong><br>
  <sub>Object manipulation, immutable updates, array processing, manual date comparison, and JSON.</sub>
</p>

---

**Platform:** freeCodeCamp  
**Lab:** Build a Device Loan Ledger  
**Language:** JavaScript  
**Focus:** Objects, Nested Objects, Immutability, Array Methods & JSON
