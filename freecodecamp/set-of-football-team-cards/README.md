# Build a Set of Football Team Cards

Ilustrasi:

<table align="center">
  <tr>
    <td>
      <img width="642" height="449" alt="image" src="https://github.com/user-attachments/assets/55cd2b84-dd6d-431c-9ece-8b2e469da755" />
    </td>
    <td>
      <img width="644" height="450" alt="image" src="https://github.com/user-attachments/assets/aea04d7f-6f93-4eed-b30a-c18df9813e03" />
    </td>
  </tr>
</table>

Lab ini membuat kumpulan kartu pemain sepak bola yang datanya berasal dari sebuah object JavaScript.

Informasi tim seperti nama tim, tahun, dan pelatih ditampilkan ke halaman. Daftar pemain juga dirender secara dinamis dan bisa difilter berdasarkan posisi melalui dropdown.

Pilihan filter:

```text
All Players
Forward
Midfielder
Defender
Goalkeeper
```

---

## Struktur Data

Data utama disimpan dalam sebuah object:

```js
const footballTeam = {
  team: "...",
  year: 2026,
  headCoach: "...",
  players: [
    {
      name: "...",
      position: "forward",
      isCaptain: false
    }
  ]
};
```

Object utama memiliki empat property:

```text
team
year
headCoach
players
```

Sedangkan setiap object di dalam `players` memiliki:

```text
name
position
isCaptain
```

`players` merupakan array karena satu tim memiliki banyak pemain.

---

## Menampilkan Informasi Tim

HTML sudah menyediakan:

```html
<span id="team"></span>
<span id="year"></span>
<span id="head-coach"></span>
```

Elemen tersebut diambil melalui DOM:

```js
const teamElement =
  document.querySelector("#team");

const yearElement =
  document.querySelector("#year");

const headCoachElement =
  document.querySelector("#head-coach");
```

Kemudian data dari object dimasukkan ke halaman:

```js
teamElement.textContent =
  footballTeam.team;

yearElement.textContent =
  footballTeam.year;

headCoachElement.textContent =
  footballTeam.headCoach;
```

Alurnya:

```text
footballTeam
↓
ambil property
↓
textContent
↓
HTML
```

---

## Menampilkan Player Cards

Container untuk pemain:

```html
<div id="player-cards"></div>
```

diambil dengan:

```js
const playerCards =
  document.querySelector("#player-cards");
```

Kemudian dibuat function untuk merender pemain:

```js
function displayPlayers(players) {
  const cards = players.map((player) => {
    return `
      <div class="player-card">
        <h2>
          ${player.isCaptain ? "(Captain) " : ""}
          ${player.name}
        </h2>

        <p>
          Position: ${player.position}
        </p>
      </div>
    `;
  });

  playerCards.innerHTML =
    cards.join("");
}
```

Function menerima sebuah array pemain.

```text
players
↓
map()
↓
setiap object menjadi HTML
↓
join("")
↓
innerHTML
↓
player cards muncul
```

---

## Menggunakan `map()`

`map()` digunakan untuk mengubah setiap object pemain menjadi string HTML.

Contoh data:

```js
{
  name: "Player A",
  position: "defender",
  isCaptain: false
}
```

diubah menjadi:

```html
<div class="player-card">
  <h2>Player A</h2>
  <p>Position: defender</p>
</div>
```

Jadi pola `map()` di sini:

```text
OBJECT PLAYER
↓
MAP
↓
HTML CARD
```

---

## Menampilkan Captain

Property:

```js
isCaptain
```

berisi boolean:

```js
true
false
```

Untuk menentukan apakah tulisan `(Captain)` harus muncul, digunakan ternary operator:

```js
player.isCaptain
  ? "(Captain) "
  : ""
```

Artinya:

```text
isCaptain === true
↓
tampilkan "(Captain)"

isCaptain === false
↓
tampilkan string kosong
```

Contoh:

```text
(Captain) Player A
```

atau:

```text
Player B
```

---

## Menggabungkan HTML dengan `join()`

Hasil `map()` masih berupa array string.

Contohnya:

```js
[
  "<div>Player A</div>",
  "<div>Player B</div>",
  "<div>Player C</div>"
]
```

Sebelum dimasukkan ke `innerHTML`, array tersebut digabung menggunakan:

```js
.join("")
```

Hasilnya menjadi satu string HTML:

```html
<div>Player A</div>
<div>Player B</div>
<div>Player C</div>
```

Kemudian:

```js
playerCards.innerHTML =
  cards.join("");
```

---

# Menampilkan Semua Pemain

Saat halaman pertama kali dibuka:

```js
displayPlayers(
  footballTeam.players
);
```

Semua pemain langsung ditampilkan.

Alurnya:

```text
footballTeam.players
↓
displayPlayers()
↓
map()
↓
join()
↓
innerHTML
```

---

# Dropdown Filter

HTML menyediakan:

```html
<select id="players">
```

dengan beberapa value:

```text
all
forward
midfielder
defender
goalkeeper
```

Elemen dropdown diambil melalui:

```js
const playersDropdown =
  document.querySelector("#players");
```

---

# Event `change`

Karena program harus bereaksi ketika pilihan dropdown berubah, digunakan:

```js
addEventListener("change", ...)
```

```js
playersDropdown.addEventListener(
  "change",
  () => {

  }
);
```

Value yang sedang dipilih dapat dibaca melalui:

```js
playersDropdown.value
```

Contoh:

```text
user memilih Position Defender
↓
playersDropdown.value
↓
"defender"
```

---

# Filter Berdasarkan Posisi

Pilihan dropdown disimpan:

```js
const selectedPosition =
  playersDropdown.value;
```

Kemudian ditentukan data mana yang akan ditampilkan.

```js
const filteredPlayers =
  selectedPosition === "all"
    ? footballTeam.players
    : footballTeam.players.filter(
        (player) =>
          player.position ===
          selectedPosition
      );
```

Jika user memilih:

```text
all
```

maka seluruh pemain digunakan.

Jika memilih posisi tertentu:

```text
forward
midfielder
defender
goalkeeper
```

maka digunakan:

```js
filter()
```

---

## Cara Kerja `filter()`

Misalnya:

```js
selectedPosition = "forward";
```

Program mengecek setiap pemain:

```js
player.position ===
selectedPosition
```

Secara sederhana:

```text
Player A
position = forward
↓
true
↓
masuk hasil filter


Player B
position = defender
↓
false
↓
tidak masuk
```

`filter()` tidak mengubah array asli.

Ia menghasilkan array baru berisi pemain yang sesuai kondisi.

---

# Render Ulang Setelah Filter

Setelah array pemain ditentukan:

```js
displayPlayers(filteredPlayers);
```

Function `displayPlayers()` tidak peduli apakah data yang diberikan berisi:

```text
semua pemain
```

atau:

```text
hanya defender
```

Function hanya menerima array lalu merendernya.

Ini membuat function bisa digunakan ulang.

```text
ALL PLAYERS
↓
displayPlayers()

FORWARD PLAYERS
↓
displayPlayers()

DEFENDER PLAYERS
↓
displayPlayers()
```

---

# Alur Filter Keseluruhan

```text
user memilih dropdown
↓
change event
↓
playersDropdown.value
↓
selectedPosition
↓
"all" ?
│
├── YA
│   ↓
│   footballTeam.players
│
└── TIDAK
    ↓
    filter()
    ↓
    player.position === selectedPosition
↓
displayPlayers()
↓
map()
↓
join("")
↓
innerHTML
↓
cards diperbarui
```

---

# Hubungan Data dan DOM

Lab ini menunjukkan pola yang cukup sering digunakan dalam aplikasi JavaScript:

```text
DATA
↓
PROCESS
↓
RENDER
```

Pada project ini:

```text
footballTeam.players
↓
filter()
↓
map()
↓
join()
↓
innerHTML
```

Atau lebih singkat:

```text
data
→ filter
→ map
→ join
→ render
```

---

# Yang Saya Pelajari

Dari lab ini saya belajar:

- Object sebagai penyimpan data utama.
- Array of objects.
- Nested data.
- Boolean property.
- Mengakses object property dengan dot notation.
- `querySelector()`.
- `textContent`.
- `innerHTML`.
- `map()`.
- `filter()`.
- `join()`.
- Template literal.
- Ternary operator.
- Event `change`.
- `.value` pada `<select>`.
- Render data secara dinamis ke DOM.
- Memisahkan data dengan tampilan.
- Membuat function render yang bisa digunakan ulang.

---

## Catatan

Bagian paling penting dari lab ini adalah memahami bahwa HTML card tidak harus ditulis satu per satu secara manual.

Data pemain sudah tersedia dalam:

```js
footballTeam.players
```

JavaScript bisa mengubah data tersebut menjadi tampilan.

```text
PLAYER OBJECT
↓
map()
↓
HTML STRING
↓
join()
↓
innerHTML
↓
PLAYER CARD
```

Filter juga tidak langsung mengubah HTML.

Pertama program menentukan data yang ingin digunakan:

```text
semua pemain
atau
pemain berdasarkan posisi
```

Baru data tersebut diberikan kepada:

```js
displayPlayers()
```

Pola yang ingin saya ingat dari lab ini:

```text
ambil data
↓
pilih / filter data
↓
ubah data menjadi HTML
↓
gabungkan HTML
↓
render ke DOM
```

---

**Platform:** freeCodeCamp  
**Lab:** Build a Set of Football Team Cards  
**Language:** HTML, CSS, JavaScript
