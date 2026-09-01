# Truth Check (Pengecek Kebenaran Objek)

Program ini digunakan untuk memeriksa apakah semua objek di dalam sebuah array memiliki properti tertentu yang bernilai *truthy* (valid/bukan kosong/bukan false).

## Konsep yang Digunakan

Program ini sengaja dibuat menggunakan pendekatan *functional programming* dengan memanfaatkan fungsi `reduce()` untuk memproses seluruh data secara ringkas tanpa menggunakan loop tradisional (`for`/`while`).

## Yang Saya Pelajari

- `reduce()` untuk mengumpulkan dan mengolah kebenaran nilai elemen objek satu per satu
- **Double Not (`!!`)** untuk mengubah nilai properti apa pun secara instan menjadi tipe data boolean (`true`/`false`)
- **Evaluasi Logika `&&` (AND)** untuk memastikan hasil akhir hanya bernilai `true` jika seluruh objek memenuhi syarat
- **Wadah Awal `true`** sebagai akumulator awal tempat dimulainya proses pengecekan `reduce`
- Pengaksesan properti objek secara dinamis menggunakan notasi tanda kurung siku (`obj[pre]`) berdasarkan argumen string

## Alur Program

1. Siapkan data array berisi kumpulan objek (`collection`) dan string properti yang ingin dicek (`pre`).
2. Jalankan fungsi `reduce` untuk menyisir setiap objek di dalam array satu per satu dari awal sampai akhir.
3. Ubah nilai dari properti objek yang sedang diperiksa menjadi bentuk boolean murni menggunakan operator `!!`.
4. Gabungkan hasil boolean objek saat ini dengan status akumulator (`acc`) menggunakan logika `&&`.
5. Jika ada satu saja properti yang bernilai *falsy* (seperti `""` atau `false`), maka hasil akhir akan langsung gugur menjadi `false`.
6. Kembalikan (*return*) satu nilai boolean akhir (`true`/`false`) sebagai kesimpulan dari seluruh isi array.

## Contoh

```js
truthCheck([
  {name: "Quincy", role: "Founder", isBot: false}, 
  {name: "Naomi", role: "", isBot: false}, 
  {name: "Camperbot", role: "Bot", isBot: true}
], "isBot");
```
Hasil: `false` (karena ada objek yang nilai `isBot`-nya bernilai `false`)
