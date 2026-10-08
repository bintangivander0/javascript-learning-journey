# Build a Bank Account Management Program

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=000000)
![freeCodeCamp](https://img.shields.io/badge/freeCodeCamp-JavaScript%20Certification-0A0A23?logo=freecodecamp&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success)

> **Milestone:** JavaScript Certification — Certification Project after **Classes**

Project ini merupakan Certification Project dari freeCodeCamp pada JavaScript Certification untuk mempraktikkan konsep **class, constructor, object, method, array, condition, loop, template literal, dan instance** melalui simulasi sederhana sebuah rekening bank.

---

## Konsep Utama

Project ini menggunakan sebuah class bernama `BankAccount` sebagai blueprint untuk membuat object rekening bank.

Setiap object `BankAccount` mempunyai:

- `balance` untuk menyimpan saldo rekening.
- `transactions` untuk menyimpan seluruh transaksi.
- `deposit()` untuk menambah saldo dan mencatat transaksi deposit.
- `withdraw()` untuk mengurangi saldo dan mencatat transaksi withdrawal.
- `checkBalance()` untuk menampilkan saldo saat ini.
- `listAllDeposits()` untuk menampilkan seluruh nominal deposit.
- `listAllWithdrawals()` untuk menampilkan seluruh nominal withdrawal.

---

## Source Code

Source code project disimpan pada file JavaScript project di repository ini.

Struktur utama yang digunakan:

```javascript
class BankAccount {
  constructor () {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    // ...
  }

  withdraw(amount) {
    // ...
  }

  checkBalance() {
    // ...
  }

  listAllDeposits() {
    // ...
  }

  listAllWithdrawals() {
    // ...
  }
}
```

---

## Apa yang Dilakukan Project Ini?

Project membuat object rekening bank menggunakan class `BankAccount`.

Ketika sebuah rekening dibuat, saldo awalnya adalah `0` dan belum mempunyai transaksi.

Setelah itu rekening dapat menerima deposit, melakukan withdrawal, mengecek saldo, serta menampilkan daftar seluruh deposit dan withdrawal yang pernah dicatat.

Contoh pembuatan object:

```javascript
const myAccount = new BankAccount;
```

`myAccount` merupakan **instance** dari class `BankAccount`.

Instance adalah object yang dibuat berdasarkan blueprint sebuah class. Karena dibuat dari `BankAccount`, object tersebut memiliki property dan method yang didefinisikan oleh class tersebut.

---

## 1. Class `BankAccount`

```javascript
class BankAccount {
  // constructor dan methods
}
```

`class` digunakan untuk membuat blueprint object.

Dalam project ini, `BankAccount` menjadi blueprint untuk sebuah rekening bank.

Dengan class yang sama, kita dapat membuat lebih dari satu rekening jika diperlukan.

---

## 2. Constructor

```javascript
constructor () {
  this.balance = 0;
  this.transactions = [];
}
```

`constructor()` adalah method khusus yang dijalankan ketika object baru dibuat menggunakan `new`.

Pada project ini constructor melakukan dua hal:

| Property | Nilai awal | Fungsi |
|---|---:|---|
| `balance` | `0` | Menyimpan saldo rekening |
| `transactions` | `[]` | Menyimpan daftar transaksi |

### `this`

`this` mengacu pada instance yang sedang dibuat.

Ketika kode berikut dijalankan:

```javascript
const myAccount = new BankAccount;
```

maka:

```javascript
this.balance = 0;
```

menjadi property `balance` milik object `myAccount`.

Begitu juga:

```javascript
this.transactions = [];
```

menjadi array `transactions` milik `myAccount`.

---

## 3. Method `deposit()`

```javascript
deposit(amount) {
  if (Number(amount) > 0) {
    this.balance += Number(amount);

    const transaction = {
      type: "deposit",
      amount: amount
    };

    this.transactions.push(transaction);

    return `Successfully deposited $${amount}. New balance: $${this.balance}`;
  } else {
    return "Deposit amount must be greater than zero.";
  }
}
```

Method `deposit()` digunakan untuk menambahkan uang ke saldo.

### Validasi jumlah deposit

```javascript
if (Number(amount) > 0)
```

`Number()` digunakan untuk mengubah nilai `amount` menjadi number sebelum dibandingkan dan digunakan dalam perhitungan.

Deposit hanya diterima jika nilainya lebih besar dari `0`.

Jika nilainya tidak valid, method mengembalikan:

```text
Deposit amount must be greater than zero.
```

### Menambah saldo

```javascript
this.balance += Number(amount);
```

Saldo saat ini ditambah dengan jumlah deposit.

Operator `+=` merupakan shorthand untuk:

```javascript
this.balance = this.balance + Number(amount);
```

### Membuat object transaksi

```javascript
const transaction = {
  type: "deposit",
  amount: amount
};
```

Setiap deposit dicatat sebagai object.

Object tersebut memiliki dua property:

| Property | Isi |
|---|---|
| `type` | `"deposit"` |
| `amount` | nilai deposit |

### Menyimpan transaksi

```javascript
this.transactions.push(transaction);
```

`push()` menambahkan sebuah item ke bagian akhir array.

Dengan demikian, object transaksi dimasukkan ke dalam `transactions`.

---

## 4. Method `withdraw()`

```javascript
withdraw(amount) {
  if (Number(amount) > 0 && Number(amount) <= this.balance) {
    this.balance -= Number(amount);

    const transaction = {
      type: "withdraw",
      amount: amount
    };

    this.transactions.push(transaction);

    return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
  } else {
    return "Insufficient balance or invalid amount.";
  }
}
```

Method `withdraw()` digunakan untuk mengambil uang dari rekening.

Withdrawal hanya berhasil jika dua kondisi terpenuhi:

1. `amount` lebih besar dari `0`.
2. `amount` tidak lebih besar dari `balance`.

Keduanya digabungkan menggunakan operator logika `&&`.

### Mengurangi saldo

```javascript
this.balance -= Number(amount);
```

Ini merupakan shorthand dari:

```javascript
this.balance = this.balance - Number(amount);
```

Setelah withdrawal berhasil, transaksi juga dicatat sebagai:

```javascript
{
  type: "withdraw",
  amount: amount
}
```

Jika jumlah withdrawal tidak valid atau melebihi saldo, method mengembalikan:

```text
Insufficient balance or invalid amount.
```

---

## 5. Method `checkBalance()`

```javascript
checkBalance() {
  return `Current balance: $${this.balance}`;
}
```

Method ini tidak mengubah saldo.

Tugasnya hanya membaca nilai `this.balance` dan mengembalikannya dalam bentuk string menggunakan **template literal**.

Contoh:

```javascript
console.log(myAccount.checkBalance());
```

Setelah seluruh transaksi pada contoh project dijalankan, hasilnya:

```text
Current balance: $101
```

---

## 6. Method `listAllDeposits()`

```javascript
listAllDeposits() {
  const depositAmounts = [];

  this.transactions.forEach(item => {
    if (item.type === "deposit") {
      depositAmounts.push(item.amount);
    }
  });

  return `Deposits: ${depositAmounts.join(',')}`;
}
```

Method ini mengambil hanya transaksi yang mempunyai:

```javascript
item.type === "deposit"
```

### `forEach()`

```javascript
this.transactions.forEach(item => {
  // ...
});
```

`forEach()` menjalankan callback untuk setiap item yang terdapat di dalam array.

Dalam project ini, setiap transaksi diperiksa satu per satu.

### Filter berdasarkan `type`

```javascript
if (item.type === "deposit")
```

Jika transaksi merupakan deposit, nominalnya dimasukkan ke `depositAmounts`.

```javascript
depositAmounts.push(item.amount);
```

### `join()`

```javascript
depositAmounts.join(',')
```

`join()` menggabungkan seluruh item array menjadi satu string.

Untuk:

```javascript
[150, 100]
```

hasilnya menjadi:

```text
150,100
```

Sehingga method mengembalikan:

```text
Deposits: 150,100
```

---

## 7. Method `listAllWithdrawals()`

```javascript
listAllWithdrawals() {
  const withdrawAmounts = [];

  this.transactions.forEach(item => {
    if (item.type === "withdraw") {
      withdrawAmounts.push(item.amount);
    }
  });

  return `Withdrawals: ${withdrawAmounts.join(',')}`;
}
```

Method ini bekerja dengan pola yang sama seperti `listAllDeposits()`.

Perbedaannya adalah method mencari transaksi dengan:

```javascript
item.type === "withdraw"
```

Contoh transaksi withdrawal pada project:

```javascript
[
  50,
  70,
  29
]
```

akan menghasilkan:

```text
Withdrawals: 50,70,29
```

---

## 8. Membuat Instance `BankAccount`

```javascript
const myAccount = new BankAccount;
```

Keyword `new` digunakan untuk membuat object baru berdasarkan class.

`myAccount` sekarang merupakan instance dari `BankAccount`.

Object tersebut mempunyai property:

```javascript
myAccount.balance
myAccount.transactions
```

dan dapat menggunakan method:

```javascript
myAccount.deposit()
myAccount.withdraw()
myAccount.checkBalance()
myAccount.listAllDeposits()
myAccount.listAllWithdrawals()
```

---

## 9. Menjalankan Transaksi

```javascript
myAccount.deposit(150);
myAccount.deposit(100);
myAccount.withdraw(50);
myAccount.withdraw(70);
myAccount.withdraw(29);
```

Urutan perubahan saldo:

| Transaksi | Perubahan | Saldo |
|---|---:|---:|
| Saldo awal | — | `$0` |
| Deposit | `+150` | `$150` |
| Deposit | `+100` | `$250` |
| Withdrawal | `-50` | `$200` |
| Withdrawal | `-70` | `$130` |
| Withdrawal | `-29` | `$101` |

Jadi saldo akhir adalah:

```text
$101
```

Transaksi yang tersimpan terdiri dari:

**Deposits**

```text
150, 100
```

**Withdrawals**

```text
50, 70, 29
```

---

## 10. Menampilkan Saldo

```javascript
console.log(myAccount.checkBalance());
```

Method `checkBalance()` dipanggil melalui object `myAccount`.

Hasil akhirnya:

```text
Current balance: $101
```

---

## Method yang Dipakai

| Method / Syntax | Fungsi |
|---|---|
| `constructor()` | Menginisialisasi object ketika instance dibuat |
| `Number()` | Mengubah nilai menjadi number |
| `push()` | Menambahkan item ke array |
| `forEach()` | Menjalankan fungsi untuk setiap item array |
| `join()` | Menggabungkan item array menjadi string |
| `new` | Membuat instance dari class |
| `+=` | Menambahkan nilai ke variable/property |
| `-=` | Mengurangi nilai dari variable/property |
| `&&` | Memastikan beberapa kondisi bernilai true |
| `===` | Membandingkan nilai dan tipe data |
| Template literal | Membuat string dengan `${...}` |

---

## Bagian yang Paling Penting Buat Saya

### 1. Class adalah blueprint

```javascript
class BankAccount {
  // ...
}
```

Class belum menjadi rekening tertentu.

Class adalah blueprint yang digunakan untuk membuat object rekening.

### 2. Instance adalah object hasil dari class

```javascript
const myAccount = new BankAccount;
```

`myAccount` adalah instance yang dibuat berdasarkan blueprint `BankAccount`.

### 3. `this` menunjuk ke instance saat ini

```javascript
this.balance
this.transactions
```

Ketika method dipanggil melalui `myAccount`, property tersebut mengacu pada data milik `myAccount`.

### 4. Method dapat mengubah state object

```javascript
this.balance += Number(amount);
```

Method `deposit()` mengubah nilai `balance`.

Inilah salah satu hal penting dari penggunaan class: object dapat mempunyai **data dan behavior** dalam satu struktur.

### 5. Array dapat digunakan untuk menyimpan banyak data

```javascript
this.transactions = [];
```

Setiap transaksi kemudian dimasukkan menggunakan:

```javascript
this.transactions.push(transaction);
```

---

## Catatan Belajar

- **Class** adalah blueprint untuk membuat object.
- **Constructor** berjalan ketika instance baru dibuat.
- **`this`** mengacu pada object yang sedang digunakan.
- **Instance** dibuat menggunakan keyword `new`.
- **Property** menyimpan data object.
- **Method** mendefinisikan behavior yang dapat dilakukan object.
- **`push()`** menambahkan data ke array.
- **`forEach()`** memproses item array satu per satu.
- **`join()`** mengubah isi array menjadi satu string.
- **`Number()`** digunakan agar nilai dapat diproses sebagai angka.
- **`transactions`** digunakan sebagai riwayat seluruh transaksi rekening.
- **Validasi** mencegah deposit bernilai nol/negatif dan withdrawal melebihi saldo.
- **Template literal** digunakan untuk membuat pesan hasil transaksi.

---

## Ringkasan Cepat

| Konsep | Fungsi |
|---|---|
| `class BankAccount` | Membuat blueprint rekening bank |
| `constructor()` | Menyiapkan saldo dan transaksi awal |
| `this.balance` | Menyimpan saldo |
| `this.transactions` | Menyimpan riwayat transaksi |
| `deposit()` | Menambah saldo |
| `withdraw()` | Mengurangi saldo |
| `checkBalance()` | Menampilkan saldo |
| `listAllDeposits()` | Menampilkan seluruh deposit |
| `listAllWithdrawals()` | Menampilkan seluruh withdrawal |
| `new BankAccount` | Membuat instance rekening |
| `push()` | Menambahkan transaksi ke array |
| `forEach()` | Memproses setiap transaksi |
| `join()` | Menggabungkan array menjadi string |

---

## What I Practiced

Project ini menjadi latihan pertama yang langsung menggabungkan konsep **Classes** dengan pengelolaan data menggunakan array.

Hal yang saya praktikkan:

- Membuat class menggunakan `class`.
- Membuat object menggunakan `new`.
- Menggunakan `constructor()`.
- Menggunakan `this` untuk mengakses property instance.
- Membuat method di dalam class.
- Mengubah state object melalui method.
- Membuat dan menyimpan object transaksi.
- Menggunakan array sebagai tempat penyimpanan transaksi.
- Menggunakan `push()`, `forEach()`, dan `join()`.
- Menggunakan conditional statement untuk validasi transaksi.
- Menggunakan template literal untuk menghasilkan pesan.
- Membuat simulasi sederhana sistem rekening bank.

---

## Project Information

| Item | Detail |
|---|---|
| Platform | freeCodeCamp |
| Certification | JavaScript Certification |
| Project | Build a Bank Account Management Program |
| Language | JavaScript |
| Focus | Classes, Objects, Methods, Arrays, Conditions, Loops |
| Status | Completed |

---

**Milestone:** JavaScript Certification — Completed after the `Classes` section.
