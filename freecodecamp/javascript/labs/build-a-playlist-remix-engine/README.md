# Remix Playlist Builder

Lab ini membuat satu playlist remix dari beberapa playlist yang berbeda.

Data diproses bertahap mulai dari menggabungkan semua playlist, menghitung score lagu, menghapus track duplikat, membatasi jumlah lagu dari artist yang sama, lalu membuat urutan pemutaran akhir.

Alurnya:

```text
flattenPlaylists()
↓
scoreTracks()
↓
dedupeTracks()
↓
enforceArtistQuota()
↓
buildSchedule()
↓
remixPlaylist()
```

## Function yang Digunakan

### `flattenPlaylists()`

Menggabungkan beberapa playlist menjadi satu array track.

Karena datanya berupa array di dalam array, saya menggunakan nested `for` loop.

```js
arr[i][j]
```

- `i` = index playlist
- `j` = index track

Setiap track juga mendapat:

```js
source: [i, j]
```

untuk mencatat posisi asalnya.

### `scoreTracks()`

Menambahkan `score` pada setiap track dengan rumus:

```js
votes * 10 - Math.abs(bpm - 120)
```

Di sini saya belajar menggunakan `Math.abs()` untuk mendapatkan selisih angka tanpa nilai negatif.

### `dedupeTracks()`

Menghapus track dengan `trackId` yang sama dan hanya mempertahankan kemunculan pertama.

Saya menggunakan array tambahan untuk mencatat ID yang sudah pernah ditemukan.

### `enforceArtistQuota()`

Membatasi jumlah lagu dari artist yang sama.

Parameter `num` menentukan batas maksimalnya.

Contoh:

```js
enforceArtistQuota(tracks, 2);
```

berarti satu artist maksimal boleh muncul 2 kali.

### `buildSchedule()`

Mengubah track menjadi format jadwal:

```js
{
  slot: 1,
  trackId: "trk101"
}
```

Karena index dimulai dari `0`, nomor slot dibuat dengan:

```js
i + 1
```

### `remixPlaylist()`

Function utama yang menjalankan semua proses sebelumnya secara berurutan dan mengembalikan jadwal akhir.

## Yang Saya Pelajari

- Nested array dan nested `for` loop.
- Perbedaan `arr[i]` dan `arr[i][j]`.
- Mengakses property object seperti `trackSekarang.trackId`.
- `.push()` untuk menambahkan data ke array.
- `Array.isArray()` untuk validasi array.
- `Math.abs()` untuk nilai absolut.
- Mendeteksi data duplikat secara manual.
- Membuat counter untuk membatasi jumlah artist.
- Menggunakan `return` untuk mengembalikan hasil function.
- Menghubungkan beberapa function, di mana hasil satu function dipakai oleh function berikutnya.

## Catatan

Bagian yang paling bikin saya mikir di lab ini adalah membaca nested array dan membedakan antara object lengkap dengan property di dalam object.

Saya sengaja menggunakan `for` loop biasa supaya alur proses datanya lebih mudah dipahami.

**Platform:** freeCodeCamp  
**Certification:** JavaScript
