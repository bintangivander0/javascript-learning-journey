# Remix Playlist Builder

Program ini dibuat untuk membangun satu playlist remix dari beberapa playlist yang dikirimkan oleh listener.

Setiap listener dapat mengirim playlist yang berisi beberapa lagu. Karena playlist berasal dari banyak sumber, terdapat beberapa masalah yang perlu diselesaikan sebelum lagu dapat dimasukkan ke jadwal siaran akhir.

Program akan:

1. Menggabungkan semua playlist menjadi satu array.
2. Mencatat dari playlist dan posisi mana setiap lagu berasal.
3. Menghitung nilai atau `score` setiap lagu.
4. Menghapus track yang memiliki `trackId` duplikat.
5. Membatasi jumlah lagu dari artist yang sama.
6. Membuat nomor urutan atau `slot` untuk jadwal pemutaran.
7. Menggabungkan seluruh proses tersebut melalui satu function utama.

Project ini merupakan salah satu latihan JavaScript Certification dari freeCodeCamp.

---

## Gambaran Masalah

Data awal tidak langsung berbentuk satu daftar lagu.

Data terdiri dari beberapa playlist:

```js
const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    }
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    }
  ]
];
```

Strukturnya dapat dibayangkan seperti:

```text
playlists
│
├── playlist index 0
│   ├── track index 0
│   └── track index 1
│
└── playlist index 1
    └── track index 0
```

Artinya, sebelum lagu dapat diproses lebih lanjut, program perlu masuk ke setiap playlist kemudian membaca setiap track yang berada di dalam playlist tersebut.

Karena itu, latihan ini banyak menggunakan nested `for` loop.

---

# Alur Besar Program

Program bekerja secara bertahap.

```text
PLAYLIST AWAL
      │
      ▼
flattenPlaylists()
      │
      │ Menggabungkan semua playlist
      │ + menambahkan source
      ▼
scoreTracks()
      │
      │ Menghitung score
      ▼
dedupeTracks()
      │
      │ Menghapus trackId duplikat
      ▼
enforceArtistQuota()
      │
      │ Membatasi jumlah lagu per artist
      ▼
buildSchedule()
      │
      │ Membuat slot pemutaran
      ▼
JADWAL AKHIR
```

Semua proses tersebut kemudian digabungkan oleh:

```js
remixPlaylist()
```

---

# 1. `flattenPlaylists()`

## Tujuan

Function `flattenPlaylists()` digunakan untuk mengubah array playlist bertingkat menjadi satu array berisi track.

Function menerima:

```js
flattenPlaylists(arr)
```

Parameter:

- `arr`: array yang berisi beberapa playlist.
- Setiap playlist sendiri merupakan sebuah array.
- Setiap playlist berisi object track.

Jika input bukan array, function harus mengembalikan:

```js
[]
```

Validasi dilakukan menggunakan:

```js
Array.isArray()
```

Contoh:

```js
flattenPlaylists("bukan array");
```

Hasil:

```js
[]
```

---

## Mengapa Membutuhkan Dua `for` Loop?

Karena struktur datanya merupakan:

```text
array
  └── array
        └── object
```

Loop pertama digunakan untuk membaca playlist.

```js
for (let i = 0; i < arr.length; i++)
```

Sedangkan loop kedua digunakan untuk membaca track di dalam playlist tersebut.

```js
for (let j = 0; j < arr[i].length; j++)
```

Pada bagian ini:

```text
i = index playlist
j = index track
```

Contoh:

```text
i = 0
j = 1
```

berarti:

```text
playlist ke-1
track ke-2
```

Karena index JavaScript dimulai dari `0`.

Track tersebut dapat diakses menggunakan:

```js
arr[i][j]
```

---

## Property `source`

Setiap track baru juga mendapatkan property:

```js
source: [i, j]
```

Tujuannya adalah mencatat lokasi asli track.

Contoh:

```js
source: [0, 2]
```

berarti track tersebut berasal dari:

```text
playlist index 0
track index 2
```

Contoh hasil:

```js
{
  trackId: "trk103",
  artist: "Lunar Arcade",
  title: "Midnight Frequency",
  votes: 4,
  bpm: 128,
  source: [0, 2]
}
```

---

## Mental Model `flattenPlaylists()`

```text
BUAT array hasil

UNTUK setiap playlist
    UNTUK setiap track

        AMBIL track sekarang

        BUAT object track baru

        TAMBAHKAN source: [i, j]

        PUSH object ke hasil

RETURN hasil
```

Hal penting yang saya pelajari pada bagian ini adalah perbedaan:

```js
arr[i]
```

dan:

```js
arr[i][j]
```

`arr[i]` menunjuk satu playlist.

Sedangkan:

```js
arr[i][j]
```

menunjuk satu object track di dalam playlist tersebut.

---

# 2. `scoreTracks()`

## Tujuan

Setelah semua track berada dalam satu array, setiap track diberikan nilai tambahan bernama:

```js
score
```

Score dihitung berdasarkan:

```text
jumlah votes
+
seberapa dekat BPM lagu dengan 120 BPM
```

Formula yang digunakan:

```js
votes * 10 - Math.abs(bpm - 120)
```

---

## Contoh Perhitungan

Misalnya track:

```js
{
  votes: 5,
  bpm: 122
}
```

Langkah pertama:

```text
votes × 10

5 × 10
= 50
```

Selanjutnya menghitung jarak BPM dari `120`:

```text
122 - 120
= 2
```

Maka:

```text
50 - 2
= 48
```

Score akhirnya:

```js
score: 48
```

---

## Mengapa Menggunakan `Math.abs()`?

`Math.abs()` digunakan untuk menghasilkan nilai absolut.

Contoh:

```js
108 - 120
```

menghasilkan:

```text
-12
```

Tetapi yang dibutuhkan adalah **jaraknya dari 120 BPM**, bukan arah selisihnya.

Karena itu:

```js
Math.abs(108 - 120)
```

menghasilkan:

```text
12
```

Contoh lain:

```js
Math.abs(128 - 120);
```

hasil:

```text
8
```

Baik BPM lebih tinggi maupun lebih rendah dari `120`, penalti score tetap menggunakan jaraknya.

---

## Contoh Score dari Data Latihan

### `trk101`

```text
votes = 5
bpm   = 122

5 × 10 - |122 - 120|

50 - 2
= 48
```

### `trk102`

```text
votes = 2
bpm   = 108

2 × 10 - |108 - 120|

20 - 12
= 8
```

### `trk103`

```text
votes = 4
bpm   = 128

4 × 10 - |128 - 120|

40 - 8
= 32
```

### `trk201`

```text
votes = 3
bpm   = 115

3 × 10 - |115 - 120|

30 - 5
= 25
```

### `trk202`

```text
votes = 6
bpm   = 124

6 × 10 - |124 - 120|

60 - 4
= 56
```

---

## Mental Model `scoreTracks()`

```text
BUAT array hasil

UNTUK setiap track

    AMBIL track sekarang

    HITUNG jarak BPM dari 120

    HITUNG score

    BUAT object baru
        data track lama
        +
        score

    PUSH ke hasil

RETURN hasil
```

Pada bagian ini saya belajar bahwa function tidak selalu harus mengubah data asli.

Saya dapat membuat object baru berdasarkan object sebelumnya lalu menambahkan informasi baru.

---

# 3. `dedupeTracks()`

## Tujuan

Function `dedupeTracks()` digunakan untuk menghapus track dengan `trackId` yang sama.

Aturannya adalah:

> Jika sebuah `trackId` muncul lebih dari sekali, hanya kemunculan pertama yang dipertahankan.

Contoh:

```js
[
  { trackId: "trk101" },
  { trackId: "trk102" },
  { trackId: "trk101" }
]
```

Hasil:

```js
[
  { trackId: "trk101" },
  { trackId: "trk102" }
]
```

Track `trk101` kedua tidak dimasukkan.

---

## Dua Array yang Digunakan

Function menggunakan dua array dengan tugas berbeda.

```js
const hasil = [];
```

Digunakan untuk menyimpan object track yang lolos.

Sedangkan:

```js
const idYangSudahAda = [];
```

digunakan sebagai catatan `trackId` yang sudah pernah ditemukan.

Contohnya:

```js
[
  "trk101",
  "trk102",
  "trk103"
]
```

---

## Boolean `sudahAda`

Pada setiap track, program membuat:

```js
let sudahAda = false;
```

Artinya pada awal pemeriksaan program berasumsi:

> Track ID ini belum pernah ditemukan.

Kemudian program membaca seluruh:

```js
idYangSudahAda
```

Jika menemukan ID yang sama:

```js
sudahAda = true;
```

---

## Mental Model `dedupeTracks()`

```text
AMBIL track sekarang

anggap:
sudahAda = false

CEK semua ID yang pernah disimpan

    jika ID sama
        sudahAda = true

setelah selesai mengecek:

JIKA sudahAda masih false

    simpan trackId ke daftar ID

    simpan object track ke hasil
```

Ada dua jenis data yang disimpan:

```text
idYangSudahAda
→ hanya trackId

hasil
→ object track lengkap
```

Contoh:

```js
idYangSudahAda.push(trackSekarang.trackId);
```

sedangkan:

```js
hasil.push(trackSekarang);
```

---

## Hal Penting yang Saya Pelajari

Pada bagian ini saya mulai memahami cara membuat sistem sederhana untuk mendeteksi data duplikat tanpa langsung menggunakan method atau struktur data yang lebih canggih.

Logikanya menggunakan:

```text
data sekarang
vs
data yang sebelumnya sudah pernah ditemukan
```

Saya juga belajar bahwa membandingkan:

```js
"trk101" === trackSekarang
```

tidak benar karena sebelah kiri merupakan string sedangkan sebelah kanan merupakan object.

Yang harus dibandingkan adalah:

```js
"trk101" === trackSekarang.trackId
```

karena keduanya merupakan nilai `trackId`.

---

# 4. `enforceArtistQuota()`

## Tujuan

Function ini mirip dengan `dedupeTracks()`, tetapi tidak membatasi berdasarkan `trackId`.

Function membatasi jumlah lagu berdasarkan:

```js
artist
```

Jumlah maksimal lagu ditentukan oleh parameter kedua:

```js
num
```

Contoh:

```js
enforceArtistQuota(tracks, 2);
```

berarti:

> Setiap artist maksimal boleh memiliki 2 track di playlist hasil.

---

## Perbedaan dengan `dedupeTracks()`

`dedupeTracks()` memiliki aturan:

```text
trackId maksimal = 1
```

Sedangkan `enforceArtistQuota()` memiliki aturan:

```text
artist maksimal = num
```

Contoh jika:

```js
num = 2
```

dan terdapat tiga lagu dari:

```text
Velvet Comet
```

maka:

```text
Velvet Comet pertama → masuk
Velvet Comet kedua   → masuk
Velvet Comet ketiga  → tidak masuk
```

---

## Mencatat Jumlah Artist

Program membutuhkan tempat untuk mengetahui berapa kali sebuah artist sudah masuk.

Konsep datanya seperti:

```js
{
  "Velvet Comet": 2,
  "Neon Harbor": 1,
  "Solar Echo": 1
}
```

Artinya:

```text
Velvet Comet sudah masuk 2 kali
Neon Harbor sudah masuk 1 kali
Solar Echo sudah masuk 1 kali
```

Nama artist digunakan sebagai key.

Contohnya:

```js
jumlahArtist[artistSekarang]
```

Jika:

```js
artistSekarang = "Velvet Comet";
```

maka:

```js
jumlahArtist[artistSekarang]
```

sama seperti:

```js
jumlahArtist["Velvet Comet"]
```

---

## Artist yang Belum Pernah Muncul

Jika artist belum pernah tercatat:

```js
jumlahArtist[artistSekarang] === undefined
```

maka penghitungnya dimulai dari:

```js
0
```

Contoh:

```js
jumlahArtist[artistSekarang] = 0;
```

---

## Mengecek Batas

Track hanya boleh dimasukkan jika:

```js
jumlahArtist[artistSekarang] < num
```

Jika lolos:

```text
PUSH track
+
tambah jumlah artist sebanyak 1
```

Contohnya:

```text
sebelum masuk:

Velvet Comet = 1

track masuk

setelah masuk:

Velvet Comet = 2
```

---

## Mental Model `enforceArtistQuota()`

```text
AMBIL track

AMBIL nama artist

JIKA artist belum tercatat
    mulai jumlah dari 0

JIKA jumlah artist masih < num

    PUSH track ke hasil

    TAMBAH penghitung artist +1

RETURN hasil
```

---

# 5. `buildSchedule()`

## Tujuan

Setelah seluruh proses penyaringan selesai, program tidak lagi membutuhkan seluruh informasi track untuk hasil akhir.

Function `buildSchedule()` mengubah setiap track menjadi object:

```js
{
  slot,
  trackId
}
```

Contoh input:

```js
[
  {
    trackId: "trk101",
    artist: "Velvet Comet",
    score: 48
  },

  {
    trackId: "trk102",
    artist: "Neon Harbor",
    score: 8
  }
]
```

Hasil:

```js
[
  {
    slot: 1,
    trackId: "trk101"
  },

  {
    slot: 2,
    trackId: "trk102"
  }
]
```

---

## Index vs Slot

JavaScript menggunakan index mulai dari:

```text
0
```

Sedangkan nomor jadwal harus dimulai dari:

```text
1
```

Maka:

```js
slot: i + 1
```

Contohnya:

```text
i = 0 → slot = 1
i = 1 → slot = 2
i = 2 → slot = 3
```

---

## Mental Model `buildSchedule()`

```text
BUAT array hasil

UNTUK setiap track

    AMBIL track sekarang

    BUAT object jadwal

        slot = index + 1

        trackId = trackId sekarang

    PUSH jadwal ke hasil

RETURN hasil
```

Pada bagian ini saya belajar bahwa hasil akhir sebuah proses tidak selalu harus memiliki bentuk data yang sama dengan data awal.

Data awal sangat lengkap:

```text
trackId
artist
title
votes
bpm
source
score
```

Tetapi hasil akhirnya hanya membutuhkan:

```text
slot
trackId
```

---

# 6. `remixPlaylist()`

## Tujuan

`remixPlaylist()` adalah function utama yang menggabungkan seluruh function sebelumnya.

Function ini menerima:

```js
remixPlaylist(arr, num)
```

Parameter:

- `arr`: kumpulan playlist awal.
- `num`: jumlah maksimal track yang diperbolehkan untuk setiap artist.

Function menjalankan:

```text
flatten
↓
score
↓
dedupe
↓
artist quota
↓
schedule
```

---

## Function Composition

Semua function dapat dipanggil secara bertingkat:

```js
return buildSchedule(
  enforceArtistQuota(
    dedupeTracks(
      scoreTracks(
        flattenPlaylists(arr)
      )
    ),
    num
  )
);
```

Cara membacanya dimulai dari bagian paling dalam.

```text
1. flattenPlaylists(arr)

2. scoreTracks(
     hasil flatten
   )

3. dedupeTracks(
     hasil score
   )

4. enforceArtistQuota(
     hasil dedupe,
     num
   )

5. buildSchedule(
     hasil quota
   )

6. return hasil jadwal akhir
```

---

## Versi yang Lebih Mudah Dibaca

Konsep yang sama dapat ditulis menggunakan variabel per tahap:

```js
function remixPlaylist(arr, num) {
  const flattened = flattenPlaylists(arr);

  const scored =
    scoreTracks(flattened);

  const deduped =
    dedupeTracks(scored);

  const limited =
    enforceArtistQuota(deduped, num);

  const schedule =
    buildSchedule(limited);

  return schedule;
}
```

Bentuk ini lebih panjang, tetapi lebih mudah digunakan saat belajar dan debugging.

Jika ada masalah, saya dapat memeriksa hasil setiap tahap:

```js
console.log(flattened);
console.log(scored);
console.log(deduped);
console.log(limited);
console.log(schedule);
```

---

# Contoh Alur Program

Misalnya:

```js
remixPlaylist(playlists, 1);
```

Nilai:

```js
num = 1
```

berarti setiap artist hanya boleh muncul maksimal satu kali.

Pada data latihan terdapat dua track dari:

```text
Velvet Comet
```

yaitu:

```text
trk101
trk202
```

Karena program mempertahankan kemunculan paling awal, `trk101` masuk terlebih dahulu.

Ketika `trk202` ditemukan:

```text
jumlah Velvet Comet sudah = 1

num = 1

1 < 1
false
```

Maka `trk202` tidak dimasukkan ke hasil.

Jadwal akhirnya menjadi seperti:

```js
[
  {
    slot: 1,
    trackId: "trk101"
  },
  {
    slot: 2,
    trackId: "trk102"
  },
  {
    slot: 3,
    trackId: "trk103"
  },
  {
    slot: 4,
    trackId: "trk201"
  }
]
```

Jika menggunakan:

```js
remixPlaylist(playlists, 2);
```

maka dua lagu Velvet Comet masih diperbolehkan sehingga `trk202` juga dapat masuk.

---

# Yang Saya Pelajari

Project ini menggabungkan cukup banyak konsep JavaScript yang sebelumnya dipelajari secara terpisah.

## Nested Array

Saya belajar membaca array yang berada di dalam array.

```js
arr[i]
```

digunakan untuk mengambil playlist.

Sedangkan:

```js
arr[i][j]
```

digunakan untuk mengambil satu track di dalam playlist.

---

## Nested `for` Loop

Saya menggunakan loop di dalam loop:

```js
for (...) {

  for (...) {

  }

}
```

Loop luar digunakan untuk playlist.

Loop dalam digunakan untuk track.

---

## Array dan Object

Saya semakin memahami perbedaan:

```js
[]
```

sebagai kumpulan data dan:

```js
{}
```

sebagai satu data yang memiliki beberapa property.

Contohnya:

```js
const hasil = [];
```

merupakan array.

Sedangkan:

```js
const track = {
  trackId: "trk101",
  artist: "Velvet Comet"
};
```

merupakan object.

---

## `.push()`

Saya menggunakan:

```js
hasil.push(trackSekarang);
```

untuk memasukkan data baru ke bagian akhir array.

Saya juga belajar bahwa hal yang di-`push()` tergantung kebutuhan.

Contohnya:

```js
idYangSudahAda.push(trackSekarang.trackId);
```

hanya memasukkan ID.

Sedangkan:

```js
hasil.push(trackSekarang);
```

memasukkan object track lengkap.

---

## `Array.isArray()`

Digunakan untuk memastikan input benar-benar berupa array.

```js
if (!Array.isArray(arr)) {
  return [];
}
```

Saya juga belajar penggunaan operator NOT:

```js
!
```

Pada:

```js
!Array.isArray(arr)
```

artinya:

> jika input BUKAN array.

---

## `Math.abs()`

Digunakan untuk mendapatkan jarak angka tanpa memperhatikan tanda positif atau negatif.

```js
Math.abs(bpm - 120)
```

Contoh:

```js
Math.abs(108 - 120);
```

menghasilkan:

```text
12
```

bukan:

```text
-12
```

---

## Boolean sebagai Penanda

Pada `dedupeTracks()` saya menggunakan:

```js
let sudahAda = false;
```

sebagai penanda keadaan.

Jika track ditemukan:

```js
sudahAda = true;
```

Pola ini membantu program mengingat hasil pemeriksaan selama loop berlangsung.

---

## Membuat Counter

Pada `enforceArtistQuota()` saya belajar membuat penghitung berdasarkan nama artist.

Contohnya:

```js
jumlahArtist[artistSekarang]++;
```

Artinya jumlah kemunculan artist tersebut bertambah satu.

---

## Dynamic Object Property

Saya belajar bahwa property object tidak selalu harus dipanggil menggunakan dot notation seperti:

```js
object.nama
```

Jika nama property berasal dari variabel, saya dapat menggunakan bracket notation:

```js
object[namaProperty]
```

Contohnya:

```js
jumlahArtist[artistSekarang]
```

Jika:

```js
artistSekarang = "Velvet Comet";
```

maka JavaScript membaca:

```js
jumlahArtist["Velvet Comet"]
```

---

## Index Dimulai dari Nol

Array JavaScript dimulai dari:

```text
0
```

Tetapi nomor jadwal untuk pengguna lebih masuk akal dimulai dari:

```text
1
```

Karena itu digunakan:

```js
slot: i + 1
```

---

## `return`

Saya semakin memahami bahwa menghitung atau membuat sebuah nilai di dalam function belum berarti nilai tersebut tersedia di luar function.

Contohnya:

```js
function remixPlaylist(arr, num) {
  buildSchedule(...);
}
```

tidak mengembalikan jadwal.

Function perlu:

```js
return buildSchedule(...);
```

agar hasil akhir dapat digunakan oleh kode yang memanggil `remixPlaylist()`.

---

# Konsep Penting: Data Mengalir Antar Function

Salah satu pelajaran terbesar dari project ini adalah setiap function tidak bekerja sendirian.

Output satu function menjadi input function berikutnya.

```text
flattenPlaylists()
menghasilkan:
track + source

       ↓

scoreTracks()
menerima track + source
menghasilkan:
track + source + score

       ↓

dedupeTracks()
menghasilkan:
track unik

       ↓

enforceArtistQuota()
menghasilkan:
track yang lolos batas artist

       ↓

buildSchedule()
menghasilkan:
slot + trackId
```

Dengan pola ini, setiap function memiliki satu tanggung jawab yang jelas.

---

# Separation of Responsibility

Daripada membuat satu function sangat panjang yang melakukan semuanya, program membagi pekerjaan menjadi function-function kecil.

| Function | Tanggung Jawab |
|---|---|
| `flattenPlaylists()` | Menggabungkan playlist |
| `scoreTracks()` | Menghitung score |
| `dedupeTracks()` | Menghapus `trackId` duplikat |
| `enforceArtistQuota()` | Membatasi kemunculan artist |
| `buildSchedule()` | Membuat jadwal akhir |
| `remixPlaylist()` | Mengatur seluruh alur |

Pola seperti ini membuat program lebih mudah dibaca, diuji, dan diperbaiki.

---

# Hal yang Awalnya Membingungkan

Beberapa bagian yang membutuhkan perhatian lebih selama mengerjakan project ini adalah:

### `arr[i]` vs `arr[i][j]`

Pada nested array:

```js
arr[i]
```

masih merupakan playlist.

Untuk mendapatkan track:

```js
arr[i][j]
```

---

### Object vs Property Object

Ini adalah object lengkap:

```js
trackSekarang
```

Sedangkan:

```js
trackSekarang.trackId
```

hanya mengambil nilai `trackId`.

Contoh:

```js
trackSekarang
```

dapat berisi:

```js
{
  trackId: "trk101",
  artist: "Velvet Comet",
  votes: 5
}
```

Sedangkan:

```js
trackSekarang.trackId
```

hanya menghasilkan:

```text
"trk101"
```

---

### `source` Harus Tetap Dibawa

Setelah `flattenPlaylists()` menambahkan:

```js
source
```

property tersebut harus tetap tersedia ketika object baru dibuat pada `scoreTracks()`.

Jika salah menulis:

```js
sources
```

JavaScript akan mencari property bernama `sources`, yang tidak tersedia.

Hasilnya dapat menjadi:

```js
undefined
```

---

### Score Tidak Berarti Playlist Harus Diurutkan

Walaupun setiap track mendapatkan:

```js
score
```

user story pada lab ini tidak meminta proses sorting berdasarkan score.

Jadi program tetap mempertahankan urutan track selama tidak terkena aturan duplikat atau artist quota.

`scoreTracks()` hanya bertugas menghitung dan menambahkan property `score`.

---

# Pola Berpikir yang Saya Gunakan

Saat menghadapi function yang cukup panjang, saya mencoba tidak langsung memikirkan seluruh syntax.

Saya memecahnya menjadi:

```text
DATA MASUK
↓
AMBIL SATU DATA
↓
PERIKSA / HITUNG
↓
BUAT ATAU PILIH DATA
↓
PUSH KE HASIL
↓
RETURN
```

Contohnya pada `dedupeTracks()`:

```text
AMBIL track
↓
CEK apakah ID pernah muncul
↓
BELUM?
↓
SIMPAN ID
↓
PUSH track
```

Sedangkan `enforceArtistQuota()`:

```text
AMBIL track
↓
AMBIL artist
↓
CEK jumlah artist
↓
MASIH DI BAWAH BATAS?
↓
PUSH track
↓
jumlah artist + 1
```

Pola ini membantu saya memahami algoritma terlebih dahulu sebelum memikirkan syntax JavaScript.

---

# Catatan Tentang Efisiensi

Implementasi latihan ini sengaja menggunakan `for` loop biasa agar logika algoritmanya terlihat dengan jelas.

Pada `dedupeTracks()`, program menggunakan loop di dalam loop:

```text
track
  ↓
cek seluruh ID sebelumnya
```

Untuk project yang lebih besar, JavaScript memiliki struktur seperti:

```js
Set
```

yang dapat digunakan untuk mengecek ID duplikat dengan lebih efisien.

Namun pada latihan ini saya sengaja memahami proses manual terlebih dahulu agar mengetahui apa yang sebenarnya dilakukan ketika sebuah program melakukan deduplikasi.

---

# Kesimpulan

Lab ini bukan hanya latihan membuat playlist.

Project ini melatih bagaimana data melewati beberapa tahap pemrosesan:

```text
nested array
→ flat array
→ enriched data
→ deduplicated data
→ limited data
→ transformed data
→ final schedule
```

Saya belajar bahwa masalah yang terlihat besar dapat dipecah menjadi beberapa function kecil yang masing-masing mempunyai satu pekerjaan.

Konsep utama yang saya latih dalam project ini:

```text
Nested Array
Nested Loop
Object
Array
push()
Array.isArray()
Math.abs()
Boolean Flag
Duplicate Detection
Counter
Dynamic Object Property
Index
Return
Function Composition
Data Transformation
```

Hal yang paling penting bukan hanya berhasil membuat semua test lolos, tetapi mulai memahami bagaimana output dari satu function dapat menjadi input bagi function berikutnya sampai menghasilkan data akhir yang diinginkan.

---

## Project

**Platform:** freeCodeCamp  
**Track:** JavaScript Certification  
**Language:** JavaScript  
**Focus:** Array, Object, Loop, Data Transformation, Function Composition
