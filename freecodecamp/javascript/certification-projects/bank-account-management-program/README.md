# Build a Bank Account Management Program

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-0A0A23?logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/freeCodeCamp-Certification%20Project-0A0A23?logo=freecodecamp&logoColor=white" alt="freeCodeCamp Certification Project" />
</p>

> **Milestone:** Certification Project setelah mempelajari Classes.

## About

Project ini merupakan Certification Project pada JavaScript Certification di freeCodeCamp yang berfokus pada pembuatan sistem pengelolaan rekening bank menggunakan JavaScript.

Program menggunakan class `BankAccount` untuk menyimpan saldo dan riwayat transaksi, kemudian menyediakan method untuk melakukan deposit, withdrawal, pengecekan saldo, serta menampilkan seluruh transaksi berdasarkan jenisnya.

## Konsep Utama

- Class
- Constructor
- `this`
- Object
- Property
- Method
- Array
- Conditional Statement
- `Number()`
- `push()`
- `forEach()`
- `join()`
- Template Literal

## Struktur Project

```text
bank-account-management-program/
└── solution.js
```

## Source Code

- [`solution.js`](./solution.js)

## Pembahasan

### 1. Class `BankAccount`

Class `BankAccount` menjadi blueprint untuk membuat object rekening bank.

```js
class BankAccount {
  constructor () {
    this.balance = 0;
    this.transactions = [];
  };
}
```

Class ini memiliki dua property utama, yaitu `balance` untuk menyimpan saldo dan `transactions` untuk menyimpan riwayat transaksi.

### 2. Constructor

Method `constructor()` dijalankan ketika instance baru dari `BankAccount` dibuat.

```js
constructor () {
  this.balance = 0;
  this.transactions = [];
};
```

`this.balance` dimulai dari `0`, sedangkan `this.transactions` dimulai sebagai array kosong.

### 3. Method `deposit()`

Method `deposit()` digunakan untuk menambahkan uang ke saldo rekening.

```js
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
};
```

Program terlebih dahulu memastikan nilai `amount` lebih besar dari `0`.

Jika valid, nilai tersebut ditambahkan ke `this.balance` dan transaksi deposit disimpan ke dalam `this.transactions`.

### 4. Method `withdraw()`

Method `withdraw()` digunakan untuk mengurangi saldo rekening.

```js
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
};
```

Withdrawal hanya dilakukan jika jumlahnya lebih besar dari `0` dan tidak melebihi saldo yang tersedia.

Setelah berhasil, transaksi withdrawal disimpan ke dalam `this.transactions`.

### 5. Method `checkBalance()`

Method `checkBalance()` mengembalikan saldo rekening saat ini.

```js
checkBalance() {
  return `Current balance: $${this.balance}`;
}
```

Nilai `this.balance` dimasukkan ke dalam template literal untuk menghasilkan pesan saldo.

### 6. Method `listAllDeposits()`

Method `listAllDeposits()` mengambil seluruh transaksi dengan tipe `deposit`.

```js
listAllDeposits() {
  const depositAmounts = [];

  this.transactions.forEach(item => {
    if (item.type === "deposit") {
      depositAmounts.push(item.amount);
    }
  });

  return `Deposits: ${depositAmounts.join(',')}`;
};
```

Program melakukan iterasi terhadap `this.transactions` menggunakan `forEach()`.

Setiap transaksi diperiksa melalui property `type`, kemudian jumlah deposit dimasukkan ke `depositAmounts`.

### 7. Method `listAllWithdrawals()`

Method `listAllWithdrawals()` bekerja dengan cara yang sama untuk transaksi withdrawal.

```js
listAllWithdrawals() {
  const withdrawAmounts = [];

  this.transactions.forEach(item => {
    if (item.type === "withdraw") {
      withdrawAmounts.push(item.amount);
    }
  });

  return `Withdrawals: ${withdrawAmounts.join(',')}`;
};
```

Program hanya memasukkan transaksi dengan `type` bernilai `"withdraw"` ke dalam `withdrawAmounts`.

### 8. Membuat Instance `BankAccount`

Setelah class selesai dibuat, program membuat instance baru.

```js
const myAccount = new BankAccount;
```

Object `myAccount` kemudian dapat menggunakan seluruh property dan method yang tersedia pada class `BankAccount`.

### 9. Menjalankan Transaksi

Beberapa transaksi dilakukan pada object `myAccount`.

```js
myAccount.deposit(150);
myAccount.deposit(100);
myAccount.withdraw(50);
myAccount.withdraw(70);
myAccount.withdraw(29);
console.log(myAccount.checkBalance());
```

Program melakukan dua deposit dan tiga withdrawal sebelum mengecek saldo terakhir.

## Method yang Dipakai

- `Number()` digunakan untuk mengonversi nilai menjadi number.
- `push()` digunakan untuk menambahkan transaksi ke array.
- `forEach()` digunakan untuk melakukan iterasi terhadap transaksi.
- `join()` digunakan untuk menggabungkan nilai array menjadi string.

## Ringkasan Cepat

| Konsep | Fungsi |
|---|---|
| `class` | Membuat blueprint untuk object |
| `constructor()` | Menginisialisasi property instance |
| `this` | Mengakses property dan method instance |
| `deposit()` | Menambahkan saldo dan mencatat transaksi |
| `withdraw()` | Mengurangi saldo dan mencatat transaksi |
| `checkBalance()` | Menampilkan saldo saat ini |
| `listAllDeposits()` | Menampilkan seluruh nilai deposit |
| `listAllWithdrawals()` | Menampilkan seluruh nilai withdrawal |
| `push()` | Menambahkan item ke array |
| `forEach()` | Melakukan iterasi terhadap array |
| `join()` | Menggabungkan elemen array menjadi string |

## Catatan Belajar

- **Class** digunakan sebagai blueprint untuk membuat object `BankAccount`.
- **Constructor** digunakan untuk memberikan nilai awal pada `balance` dan `transactions`.
- **`this`** digunakan untuk mengakses property milik instance saat method dijalankan.
- **Method** digunakan untuk memberikan perilaku kepada object `BankAccount`.
- **Array** digunakan untuk menyimpan kumpulan riwayat transaksi.
- **Object** digunakan untuk menyimpan informasi setiap transaksi.
- **Conditional Statement** digunakan untuk menentukan apakah transaksi valid atau tidak.
- **`forEach()`** digunakan untuk mencari transaksi berdasarkan jenisnya.

## What I Practiced

```text
JavaScript Classes
Class Declaration
Constructor
Object Instances
The this Keyword
Class Methods
Object Properties
Arrays
Objects
Conditional Statements
Array Methods
Template Literals
```

---

**Platform:** freeCodeCamp  
**Certification Project:** Build a Bank Account Management Program  
**Language:** JavaScript

---

<p align="center">
  <strong>Certification Project — Build a Bank Account Management Program Completed</strong><br>
  <sub>Next stop: continue the JavaScript Certification journey.</sub>
</p>
