# Implement a Falsy Remover

Program ini digunakan untuk menghapus nilai-nilai **falsy** dari sebuah array.

## Nilai Falsy yang Dihapus

Nilai yang termasuk falsy pada latihan ini:

- `false`
- `null`
- `0`
- `""`
- `undefined`
- `NaN`

## Yang Saya Pelajari

- `for` untuk membaca isi array satu per satu
- `includes()` untuk mengecek apakah sebuah nilai ada di dalam array
- `!` untuk membalik hasil Boolean
- `push()` untuk memasukkan nilai yang lolos ke array baru
- `return` untuk mengembalikan hasil function
- membuat array baru tanpa mengubah array asli

## Alur Program

1. Buat array kosong bernama `result`
2. Siapkan daftar nilai falsy
3. Loop semua isi `arr`
4. Cek apakah nilai tersebut **bukan** nilai falsy
5. Jika bukan falsy, masukkan ke `result`
6. Return `result`

## Contoh

```js
bouncer([7, "ate", "", false, 9]);
```
hasil: `[7, "ate", 9]`
