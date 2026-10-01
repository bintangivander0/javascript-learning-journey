# Build a Date Conversion Program

Lab ini membuat program sederhana untuk mengambil **tanggal dan waktu saat ini**, lalu menampilkannya dalam beberapa format menggunakan JavaScript.

Project ini berfokus pada penggunaan object `Date`, template literal, dan method `toLocaleDateString()`.

## Output Program

Program menampilkan tiga bentuk tanggal:

```text
Current Date and Time: ...
Formatted Date (MM/DD/YYYY): ...
Formatted Date (Month Day, Year): ...
```

Nilai tanggal akan mengikuti waktu saat program dijalankan.

## Source Code

```js
const currentDate = new Date();
const currentDateFormat = `Current Date and Time: ${currentDate}`;
console.log(currentDateFormat);

function formatDateMMDDYYYY(dateObject) {
  const localeString = dateObject.toLocaleDateString(`en-US`, {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`
  });
  return `Formatted Date (MM/DD/YYYY): ${localeString}`;
}

console.log(formatDateMMDDYYYY(currentDate));

function formatDateLong(dateObject) {
  const localeString = dateObject.toLocaleDateString(`en-US`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  });
  return `Formatted Date (Month Day, Year): ${localeString}`;
}

console.log(formatDateLong(currentDate));
```

## 1. Membuat Object `Date`

```js
const currentDate = new Date();
```

`new Date()` membuat object `Date` berdasarkan tanggal dan waktu saat kode dijalankan.

Nilainya kemudian dimasukkan ke template literal:

```js
const currentDateFormat =
  `Current Date and Time: ${currentDate}`;
```

dan ditampilkan dengan:

```js
console.log(currentDateFormat);
```

## 2. Format `MM/DD/YYYY`

Function pertama:

```js
function formatDateMMDDYYYY(dateObject) {
```

menerima sebuah object tanggal melalui parameter:

```js
dateObject
```

Tanggal kemudian diformat menggunakan:

```js
dateObject.toLocaleDateString()
```

dengan locale:

```js
"en-US"
```

dan options:

```js
{
  year: "numeric",
  month: "numeric",
  day: "numeric"
}
```

Kode lengkapnya:

```js
const localeString = dateObject.toLocaleDateString(`en-US`, {
  year: `numeric`,
  month: `numeric`,
  day: `numeric`
});
```

Karena `month` menggunakan:

```js
month: "numeric"
```

bulan ditampilkan sebagai angka.

Contoh bentuk hasil:

```text
9/23/2026
```

Function kemudian mengembalikan string:

```js
return `Formatted Date (MM/DD/YYYY): ${localeString}`;
```

## 3. Format Tanggal Panjang

Function kedua:

```js
function formatDateLong(dateObject) {
```

masih menggunakan:

```js
toLocaleDateString()
```

tetapi konfigurasi bulan diubah menjadi:

```js
month: "long"
```

Kode lengkap:

```js
const localeString = dateObject.toLocaleDateString(`en-US`, {
  year: `numeric`,
  month: `long`,
  day: `numeric`
});
```

Karena menggunakan:

```js
month: "long"
```

nama bulan ditulis lengkap.

Contoh bentuk hasil:

```text
September 23, 2026
```

Kemudian function mengembalikan:

```js
return `Formatted Date (Month Day, Year): ${localeString}`;
```

## Perbedaan Dua Format

| Function | `month` option | Bentuk hasil |
|---|---|---|
| `formatDateMMDDYYYY()` | `"numeric"` | `9/23/2026` |
| `formatDateLong()` | `"long"` | `September 23, 2026` |

Kedua function menerima object `Date` yang sama. Perbedaannya hanya pada cara tanggal diformat.

## Kenapa Menggunakan `"en-US"`?

```js
dateObject.toLocaleDateString("en-US", ...)
```

`"en-US"` menentukan locale yang digunakan untuk format tanggal.

Pada project ini locale tersebut membuat hasil mengikuti gaya penulisan tanggal bahasa Inggris Amerika.

## Alur Program

Program melakukan tiga pekerjaan utama:

1. Membuat tanggal saat ini dengan `new Date()`.
2. Mengirim object tanggal tersebut ke function format pertama.
3. Mengirim object yang sama ke function format kedua.

Dengan begitu satu object `Date` dapat ditampilkan dalam beberapa format tanpa mengubah object aslinya.

## Konsep JavaScript yang Dilatih

| Konsep | Digunakan untuk |
|---|---|
| `Date` | Membuat object tanggal dan waktu |
| `new Date()` | Mengambil tanggal dan waktu saat ini |
| Function | Memisahkan logic formatting |
| Parameter | Menerima object tanggal |
| `toLocaleDateString()` | Mengubah tampilan tanggal |
| Locale `en-US` | Menentukan gaya format tanggal |
| Options object | Mengatur year, month, dan day |
| Template literal | Menggabungkan label dan hasil tanggal |
| `console.log()` | Menampilkan hasil program |

## Catatan Pribadi

Bagian penting dari lab ini adalah memahami bahwa object `Date` yang sama dapat diformat dengan beberapa cara.

```js
currentDate
```

tetap menjadi sumber tanggalnya.

Kemudian:

```js
formatDateMMDDYYYY(currentDate);
```

dan:

```js
formatDateLong(currentDate);
```

hanya menentukan bagaimana tanggal tersebut ditampilkan.

Perbedaan kecil pada options:

```js
month: "numeric"
```

dan:

```js
month: "long"
```

sudah menghasilkan format tanggal yang berbeda.

## Status Lab

**Platform:** freeCodeCamp  
**Lab:** Build a Date Conversion Program  
**Language:** JavaScript
