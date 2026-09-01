# Steamroll Array (Pemerata Array)

Program ini digunakan untuk meratakan *nested array* (array di dalam array) yang berlapis-lapis menjadi array satu dimensi.

## Konsep yang Digunakan

Program ini sengaja dibuat tanpa menggunakan fungsi bawaan `flat()` atau loop tradisional (`for`/`while`) agar lebih ramah bagi pemula yang sedang memahami alur data.

## Yang Saya Pelajari

- `reduce()` untuk mengumpulkan dan mengolah data elemen array satu per satu
- `concat()` untuk menggabungkan nilai sekaligus meleburkan satu tingkat kurung siku array
- **Chaining Reduce** untuk mengupas lapisan *nested array* selangkah demi selangkah secara linear
- **Wadah Awal `[]`** sebagai akumulator tempat menampung hasil akhir proses `reduce`
- Dinamika argumen fungsi anonim (`accumulator` dan `currentValue`) pada method array

## Alur Program

1. Siapkan data *nested array* yang ingin diratakan (misal: array berlapis hingga 4 tingkat).
2. Jalankan `reduce` pertama untuk mengupas lapisan kulit terluar array.
3. Alirkan hasilnya ke `reduce` kedua untuk mengupas lapisan kulit berikutnya.
4. Ulangi proses *chaining* hingga lapisan terdalam melebur sempurna.
5. Kembalikan (*return*) array baru yang sudah murni satu dimensi tanpa mengubah struktur data asli secara merusak.

## Contoh

```js
steamrollArray([[["a"]], [["b"]]])
```
Hasil: `["a", "b"]`
