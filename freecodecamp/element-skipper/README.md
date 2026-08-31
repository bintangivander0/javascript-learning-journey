# Element Skipper

Program ini digunakan untuk memfilter atau menyaring elemen array dari depan. Fungsi akan menghapus elemen array pertama satu per satu sampai kondisi yang ditentukan oleh fungsi penguji (`func`) menghasilkan nilai `true`. Begitu kondisi terpenuhi, proses penghapusan berhenti dan sisa array akan dikembalikan.

Aturan penyaringan:
* Elemen diperiksa berurutan dari indeks pertama (`arr[0]`).
* Jika `func(arr[0])` bernilai `false`, elemen tersebut dibuang menggunakan `.shift()`.
* Perulangan akan langsung berhenti saat `func(arr[0])` pertama kali bernilai `true`.
* Jika tidak ada satu pun elemen yang memenuhi kondisi, fungsi akan mengembalikan array kosong `[]`.

## Yang Saya Pelajari

* `while` loop untuk mengulang proses selama kondisi tertentu masih terpenuhi.
* `arr.length > 0` sebagai validasi pengaman agar perulangan berhenti jika array sudah habis.
* `!func(arr[0])` menggunakan operator logika NOT (`!`) untuk memeriksa kapan elemen *tidak* memenuhi kondisi.
* `.shift()` untuk menghapus elemen pertama dari array secara destruktif (mengubah array asli).

## Parameter dropElements

Fungsi ini menerima dua buah parameter:
* `arr`: Array berisi sekumpulan elemen yang akan disaring.
* `func`: Sebuah fungsi penguji (*callback function*) yang mengembalikan nilai boolean (`true`/`false`).

Contoh:

```javascript
dropElements([1, 2, 3, 4], function(n) { return n >= 3; });
```

Hasil: `[3, 4]`
