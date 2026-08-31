# Sum All Odd Fibonacci Numbers

Program ini digunakan untuk menjumlahkan semua angka Fibonacci berstatus **ganjil** yang nilainya kurang dari atau sama dengan angka batas (`num`) yang ditentukan. 

Aturan barisan Fibonacci dan kondisi penjumlahan:
- Barisan dimulai dari angka `0` dan `1`.
- Setiap angka berikutnya adalah hasil penjumlahan dari dua angka sebelumnya (0, 1, 1, 2, 3, 5, 8, 13, ...).
- Hanya angka Fibonacci yang bernilai **ganjil** yang akan diakumulasikan ke dalam hasil akhir.

## Yang Saya Pelajari

- Menggunakan struktur perulangan `while` untuk terus menghitung barisan angka selama kondisinya memenuhi syarat (`curr <= num`).
- Operator **Modulo** (`%`) untuk mendeteksi angka ganjil melalui kondisi `curr % 2 !== 0`.
- Teknik *Variable Swapping* (pergeseran nilai) secara manual menggunakan variabel bantuan (`let next = prev + curr`) untuk memajukan barisan Fibonacci ke angka berikutnya tanpa struktur data array.
- Optimasi memori dengan cara menghitung total secara langsung (*on-the-fly*) demi menghindari *crash* saat memproses nilai input skala besar (seperti 4.000.000).

## Parameter num

Parameter `num` berupa sebuah bilangan bulat (integer) positif yang menjadi batas maksimal nilai angka Fibonacci yang boleh ikut dijumlahkan.

Contoh:

```javascript
sumFibs(1000);
```

Hasil: `1785`
*(Penjelasan: Angka ganjil di bawah 1000 meliputi 1 + 1 + 3 + 5 + 8 + 13 + 21 + 34 + 55 + 89 + 144 + 233 + 377 + 610 + 987 = 1785)*
