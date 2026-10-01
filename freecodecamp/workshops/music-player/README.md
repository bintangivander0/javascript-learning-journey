# Build a Music Player

<p align="left">
  <img width="314" height="350" alt="image" src="https://github.com/user-attachments/assets/730b6144-7e96-4152-9c23-8ec274d4029f" />
  <img width="314" height="350" alt="image" src="https://github.com/user-attachments/assets/7027cc36-bcc2-4be2-8413-79c19849d79f" />
  <img width="314" height="350" alt="image" src="https://github.com/user-attachments/assets/a0e8a0b9-ec4f-4aac-8087-0ae768c4b1ce" />
</p>

Lab ini membuat **music player interaktif** yang dapat memutar lagu dari playlist, menghentikan lagu sementara, berpindah ke lagu berikutnya atau sebelumnya, serta melanjutkan lagu dari posisi terakhir setelah di-pause.

Project ini berfokus pada penggunaan object `Audio`, event pada elemen audio, manipulasi DOM, state sederhana melalui object, array method `find()`, optional chaining, serta pengelolaan aksesibilitas menggunakan attribute ARIA.

## Output Program

Program menampilkan sebuah music player dengan lima lagu:

```text
Hello World
In the Zone
Camper Cat
Electronic
Sailing Away
```

User dapat:

```text
Play lagu
Pause lagu
Melanjutkan lagu dari posisi terakhir
Memilih lagu langsung dari playlist
Memutar lagu sebelumnya
Memutar lagu berikutnya
Melanjutkan playlist otomatis ketika lagu selesai
Melihat lagu aktif melalui highlight pada playlist
```

Judul lagu dan nama artist yang sedang aktif juga ditampilkan pada bagian player.

## Source Code

```js
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");
const allSongs = [
  {
    id: 0,
    title: "Hello World",
    artist: "Rafael",
    duration: "0:23",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/hello-world.mp3",
  },
  {
    id: 1,
    title: "In the Zone",
    artist: "Rafael",
    duration: "0:11",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/in-the-zone.mp3",
  },
  {
    id: 2,
    title: "Camper Cat",
    artist: "Rafael",
    duration: "0:21",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/camper-cat.mp3",
  },
  {
    id: 3,
    title: "Electronic",
    artist: "Rafael",
    duration: "0:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/electronic.mp3",
  },
  {
    id: 4,
    title: "Sailing Away",
    artist: "Rafael",
    duration: "0:22",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/sailing-away.mp3",
  },
];

const audio = new Audio();

const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id, start=true) => {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData.currentSong === null || start) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  setPlayerDisplay();
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

const getNextSong = () => userData.songs[getCurrentSongIndex() + 1];

const getPreviousSong = () => userData.songs[getCurrentSongIndex() - 1];

const playPreviousSong = () => {
  if (userData.currentSong === null) return;
  const previousSong = getPreviousSong();
  if (previousSong) {
    playSong(previousSong.id);
  } else {
    playSong(userData.songs[0].id);
  }
};

const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
    return;
  }
  const nextSong = getNextSong();
  if (nextSong) {
    playSong(nextSong.id);
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
    pauseSong();
  }
};

const setPlayerDisplay = () => {
  const currentTitle = userData.currentSong?.title;
  const currentArtist = userData.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const previousCurrentSong = document.querySelector('.playlist-song[aria-current="true"]');
  previousCurrentSong?.removeAttribute("aria-current");
  const songToHighlight = document.getElementById(
    `song-${userData.currentSong?.id}`
  );

  songToHighlight?.setAttribute("aria-current", "true");
};

const setPlayButtonAccessibleText = () => {
  const song = userData.currentSong;
  playButton.setAttribute("aria-label", userData.currentSong ? `Play ${song.title}` : "Play");
};

playButton.addEventListener("click", () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  } else {
    playSong(userData.currentSong.id, false);
  }
});

const songs = document.querySelectorAll(".playlist-song");

songs.forEach((song) => {
  const id = song.getAttribute("id").slice(5);
  const songBtn = song.querySelector("button");
  songBtn.addEventListener("click", () => {
    playSong(Number(id));
  });
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

audio.addEventListener("ended", playNextSong);
```

## 1. Menyimpan Data Playlist

Data lagu disimpan di dalam array:

```js
const allSongs = [
```

Setiap lagu berbentuk object yang memiliki:

```js
{
  id,
  title,
  artist,
  duration,
  src
}
```

Contohnya:

```js
{
  id: 0,
  title: "Hello World",
  artist: "Rafael",
  duration: "0:23",
  src: "https://cdn.freecodecamp.org/curriculum/js-music-player/hello-world.mp3",
}
```

Property:

```js
src
```

menyimpan alamat file audio yang nantinya diberikan ke object `Audio`.

Dengan struktur seperti ini, setiap lagu memiliki data yang jelas dan dapat dicari berdasarkan `id`.

## 2. Membuat Object `Audio`

```js
const audio = new Audio();
```

`new Audio()` membuat object audio JavaScript yang dapat digunakan untuk mengontrol pemutaran suara tanpa harus membuat elemen `<audio>` langsung di HTML.

Object ini kemudian digunakan untuk:

```js
audio.src
audio.title
audio.currentTime
audio.play()
audio.pause()
```

Artinya seluruh kontrol utama audio dilakukan melalui JavaScript.

## 3. Menyimpan State Player

```js
const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0,
};
```

Object `userData` menyimpan kondisi player saat ini.

Property:

```js
songs
```

menyimpan seluruh playlist.

Property:

```js
currentSong
```

menyimpan lagu yang sedang aktif.

Pada awal program nilainya:

```js
null
```

karena belum ada lagu yang dipilih.

Sedangkan:

```js
songCurrentTime
```

digunakan untuk menyimpan posisi waktu terakhir ketika lagu di-pause.

## 4. Memutar Lagu

Function utama untuk memutar lagu adalah:

```js
const playSong = (id, start=true) => {
```

Function menerima:

```js
id
```

untuk menentukan lagu yang akan dimainkan.

Parameter kedua:

```js
start=true
```

menentukan apakah lagu harus dimulai dari awal atau dilanjutkan dari posisi terakhir.

Lagu dicari menggunakan:

```js
const song = userData.songs.find((song) => song.id === id);
```

Method:

```js
find()
```

akan mencari object lagu dengan `id` yang sesuai.

Setelah lagu ditemukan:

```js
audio.src = song.src;
audio.title = song.title;
```

source audio dan title diperbarui berdasarkan lagu tersebut.

## 5. Mengatur Posisi Awal Lagu

Di dalam `playSong()` terdapat kondisi:

```js
if (userData.currentSong === null || start) {
  audio.currentTime = 0;
} else {
  audio.currentTime = userData.songCurrentTime;
}
```

Jika belum ada lagu aktif:

```js
userData.currentSong === null
```

atau parameter:

```js
start
```

bernilai `true`, lagu dimulai dari:

```js
audio.currentTime = 0;
```

Tetapi jika lagu sedang dilanjutkan setelah pause:

```js
audio.currentTime = userData.songCurrentTime;
```

player kembali ke posisi terakhir yang sudah disimpan.

## 6. Menjalankan Audio dan Memperbarui Tampilan

Setelah data lagu siap, state diperbarui:

```js
userData.currentSong = song;
```

Kemudian class:

```js
playing
```

ditambahkan ke tombol play:

```js
playButton.classList.add("playing");
```

CSS menggunakan class tersebut untuk mengubah warna icon play menjadi warna highlight.

Selanjutnya beberapa function dipanggil:

```js
setPlayerDisplay();
highlightCurrentSong();
setPlayButtonAccessibleText();
```

dan audio mulai dimainkan dengan:

```js
audio.play();
```

## 7. Pause dan Menyimpan Posisi Lagu

Function pause:

```js
const pauseSong = () => {
```

sebelum menghentikan audio, posisi lagu disimpan:

```js
userData.songCurrentTime = audio.currentTime;
```

Class visual pada tombol play kemudian dihapus:

```js
playButton.classList.remove("playing");
```

dan audio dihentikan sementara:

```js
audio.pause();
```

Karena `currentTime` disimpan, lagu dapat dilanjutkan dari posisi yang sama.

## 8. Mencari Lagu Sebelumnya dan Berikutnya

Index lagu aktif diperoleh melalui:

```js
const getCurrentSongIndex = () =>
  userData.songs.indexOf(userData.currentSong);
```

Kemudian lagu berikutnya diambil dengan:

```js
const getNextSong = () =>
  userData.songs[getCurrentSongIndex() + 1];
```

Sedangkan lagu sebelumnya:

```js
const getPreviousSong = () =>
  userData.songs[getCurrentSongIndex() - 1];
```

Dengan cara ini perpindahan lagu mengikuti posisi lagu di dalam array `songs`.

## 9. Tombol Previous

Function:

```js
const playPreviousSong = () => {
```

pertama memeriksa apakah sudah ada lagu aktif:

```js
if (userData.currentSong === null) return;
```

Jika belum ada lagu yang sedang dipilih, function berhenti.

Jika lagu sebelumnya tersedia:

```js
if (previousSong) {
  playSong(previousSong.id);
}
```

lagu tersebut langsung dimainkan.

Tetapi jika posisi sekarang sudah berada di lagu pertama:

```js
else {
  playSong(userData.songs[0].id);
}
```

player tetap memainkan lagu pertama.

## 10. Tombol Next

Function:

```js
const playNextSong = () => {
```

memiliki dua kondisi utama.

Jika belum ada lagu aktif:

```js
if (userData.currentSong === null) {
  playSong(userData.songs[0].id);
  return;
}
```

player memulai lagu pertama.

Jika ada lagu berikutnya:

```js
if (nextSong) {
  playSong(nextSong.id);
}
```

lagu berikutnya dimainkan.

Tetapi ketika lagu terakhir sudah selesai:

```js
userData.currentSong = null;
userData.songCurrentTime = 0;
```

state player dikembalikan ke kondisi awal.

Tampilan dan highlight juga di-reset:

```js
setPlayerDisplay();
highlightCurrentSong();
setPlayButtonAccessibleText();
pauseSong();
```

## 11. Menampilkan Judul dan Artist

Function:

```js
const setPlayerDisplay = () => {
```

mengambil title dan artist dari lagu aktif:

```js
const currentTitle = userData.currentSong?.title;
const currentArtist = userData.currentSong?.artist;
```

Operator:

```js
?.
```

disebut optional chaining.

Operator ini mencegah error ketika:

```js
userData.currentSong
```

masih bernilai `null`.

Judul dan artist kemudian dimasukkan ke HTML:

```js
playingSong.textContent = currentTitle ? currentTitle : "";
songArtist.textContent = currentArtist ? currentArtist : "";
```

Jika tidak ada lagu aktif, kedua elemen dikosongkan.

## 12. Memberi Highlight pada Lagu Aktif

Function:

```js
const highlightCurrentSong = () => {
```

mencari lagu yang sebelumnya memiliki:

```html
aria-current="true"
```

melalui:

```js
document.querySelector('.playlist-song[aria-current="true"]');
```

Attribute tersebut kemudian dihapus:

```js
previousCurrentSong?.removeAttribute("aria-current");
```

Lalu lagu yang sedang aktif dicari berdasarkan `id`:

```js
const songToHighlight = document.getElementById(
  `song-${userData.currentSong?.id}`
);
```

dan diberi:

```js
songToHighlight?.setAttribute("aria-current", "true");
```

CSS sudah memiliki selector:

```css
[aria-current="true"] {
  background-color: var(--background-color);
}
```

sehingga lagu aktif terlihat berbeda dari lagu lain di playlist.

## 13. Accessible Text pada Tombol Play

Function:

```js
const setPlayButtonAccessibleText = () => {
```

mengubah `aria-label` tombol play.

Jika ada lagu aktif:

```js
`Play ${song.title}`
```

digunakan sebagai label.

Jika belum ada lagu:

```text
Play
```

yang digunakan.

Kode lengkapnya:

```js
playButton.setAttribute(
  "aria-label",
  userData.currentSong ? `Play ${song.title}` : "Play"
);
```

Hal ini membantu screen reader memahami fungsi tombol dengan lebih jelas.

## 14. Event pada Tombol Play

Event listener tombol play:

```js
playButton.addEventListener("click", () => {
```

memeriksa apakah player sudah memiliki lagu aktif.

Jika belum:

```js
playSong(userData.songs[0].id);
```

lagu pertama dimainkan.

Jika sudah ada lagu aktif:

```js
playSong(userData.currentSong.id, false);
```

parameter:

```js
false
```

membuat `playSong()` menggunakan:

```js
userData.songCurrentTime
```

sehingga lagu dilanjutkan dari posisi terakhir setelah pause.

## 15. Memilih Lagu dari Playlist

Semua elemen lagu diambil melalui:

```js
const songs = document.querySelectorAll(".playlist-song");
```

Kemudian setiap lagu diproses dengan:

```js
songs.forEach((song) => {
```

ID dari HTML:

```html
id="song-0"
```

dipotong menggunakan:

```js
song.getAttribute("id").slice(5);
```

Hasilnya:

```text
0
```

Kemudian tombol di dalam lagu diberi event listener:

```js
songBtn.addEventListener("click", () => {
  playSong(Number(id));
});
```

`Number(id)` mengubah nilai ID dari string menjadi number agar cocok dengan `id` pada object lagu.

## 16. Event Play, Pause, Next, dan Previous

Tombol pause menggunakan:

```js
pauseButton.addEventListener("click", pauseSong);
```

Tombol next:

```js
nextButton.addEventListener("click", playNextSong);
```

Tombol previous:

```js
previousButton.addEventListener("click", playPreviousSong);
```

Setiap tombol langsung menghubungkan interaksi user ke function yang sesuai.

## 17. Event `ended` pada Audio

Audio memiliki event:

```js
audio.addEventListener("ended", playNextSong);
```

Event:

```js
ended
```

dijalankan otomatis ketika lagu selesai diputar.

Saat event terjadi, function:

```js
playNextSong
```

dipanggil.

Karena itu lagu berikutnya dapat dimainkan tanpa user harus menekan tombol `Next`.

Ketika lagu terakhir selesai, state player dikembalikan ke kondisi awal.

## Perbedaan Play Baru dan Resume

| Kondisi | Pemanggilan | Posisi audio |
|---|---|---|
| Memilih lagu baru | `playSong(id)` | Mulai dari `0` |
| Menekan play pertama kali | `playSong(firstSong.id)` | Mulai dari `0` |
| Resume setelah pause | `playSong(currentSong.id, false)` | Lanjut dari `songCurrentTime` |

Perbedaannya ditentukan oleh parameter:

```js
start
```

pada function:

```js
playSong(id, start=true)
```

## Kenapa Menggunakan `userData`?

```js
const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0,
};
```

Object ini membuat data penting player berada di satu tempat.

Program tidak perlu mencari ulang seluruh kondisi player dari DOM setiap kali tombol ditekan.

State seperti:

```js
currentSong
```

dan:

```js
songCurrentTime
```

dapat dibaca langsung oleh function lain.

Cara ini membuat alur program lebih mudah diikuti karena setiap function menggunakan sumber state yang sama.

## Alur Program

Program melakukan beberapa pekerjaan utama:

1. Menyimpan seluruh data lagu di dalam array `allSongs`.
2. Membuat object `Audio` untuk mengontrol pemutaran lagu.
3. Menyimpan state player di dalam `userData`.
4. Memutar lagu berdasarkan `id`.
5. Menyimpan posisi audio ketika lagu di-pause.
6. Memindahkan lagu menggunakan tombol previous dan next.
7. Memperbarui judul, artist, highlight, dan `aria-label`.
8. Memberi event listener pada setiap lagu di playlist.
9. Menjalankan lagu berikutnya secara otomatis ketika event `ended` terjadi.

Dengan begitu seluruh bagian player saling terhubung melalui state dan event JavaScript.

## Konsep JavaScript yang Dilatih

| Konsep | Digunakan untuk |
|---|---|
| `new Audio()` | Membuat object audio |
| Array of objects | Menyimpan data playlist |
| Object | Menyimpan state player |
| `find()` | Mencari lagu berdasarkan `id` |
| `indexOf()` | Menemukan posisi lagu aktif |
| Function | Memisahkan logic player |
| Arrow function | Menulis function secara ringkas |
| Default parameter | Mengatur nilai awal `start=true` |
| Optional chaining `?.` | Menghindari error saat data bernilai `null` |
| Template literal | Membuat ID dan accessible text |
| `textContent` | Mengubah judul dan artist di halaman |
| `classList.add()` | Menambahkan state visual tombol play |
| `classList.remove()` | Menghapus state visual tombol play |
| `setAttribute()` | Menambahkan attribute ARIA |
| `removeAttribute()` | Menghapus attribute ARIA sebelumnya |
| `querySelector()` | Mencari elemen tertentu |
| `querySelectorAll()` | Mengambil semua lagu dari playlist |
| `forEach()` | Memberi event ke setiap lagu |
| `slice()` | Mengambil angka dari ID HTML |
| `Number()` | Mengubah ID string menjadi number |
| `addEventListener()` | Menangani interaksi user dan event audio |
| Event `click` | Menangani tombol player |
| Event `ended` | Menjalankan lagu berikutnya otomatis |
| `audio.currentTime` | Membaca dan mengatur posisi lagu |
| `audio.play()` | Memulai pemutaran audio |
| `audio.pause()` | Menghentikan audio sementara |

## Catatan Pribadi

Bagian penting dari lab ini adalah memahami bahwa music player tidak hanya membutuhkan function untuk:

```js
audio.play();
```

dan:

```js
audio.pause();
```

tetapi juga membutuhkan state untuk mengetahui lagu apa yang sedang aktif dan posisi terakhir lagu tersebut.

Pada project ini state utama disimpan di:

```js
userData.currentSong
```

dan:

```js
userData.songCurrentTime
```

Ketika lagu di-pause:

```js
userData.songCurrentTime = audio.currentTime;
```

posisi terakhir disimpan.

Kemudian ketika tombol play ditekan lagi:

```js
playSong(userData.currentSong.id, false);
```

nilai:

```js
false
```

membuat lagu tidak dimulai dari awal.

Bagian lain yang menarik adalah event:

```js
audio.addEventListener("ended", playNextSong);
```

karena object audio sendiri dapat memberi tahu JavaScript ketika lagu sudah selesai.

Dari sini terasa jelas bahwa event tidak hanya berasal dari klik user, tetapi juga dapat berasal dari perubahan kondisi media.

Selain logic audio, project ini juga memperlihatkan bahwa aksesibilitas dapat menjadi bagian dari state aplikasi.

Attribute:

```html
aria-current="true"
```

dipakai untuk menandai lagu aktif, sedangkan:

```html
aria-label
```

pada tombol play ikut diperbarui sesuai lagu yang sedang dipilih.

## Status Lab

**Platform:** freeCodeCamp  
**Certification:** JavaScript Certification  
**Chapter:** Audio and Video Events  
**Lab:** Build a Music Player  
**Language:** JavaScript  
**Frontend:** HTML & CSS  
**Status:** Completed
