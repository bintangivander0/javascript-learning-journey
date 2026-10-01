# Build a Rock, Paper, Scissors Game

Ilustrasi:
<table align="center">
  <tr>
    <td>
      <img width="719" height="452" alt="image" src="https://github.com/user-attachments/assets/1f630997-2fdc-4f77-9e4e-4e350caa79b1" />
    </td>
    <td>
      <img width="722" height="449" alt="image" src="https://github.com/user-attachments/assets/232f5caa-ba24-4f5a-abb5-312648142776" />
    </td>
  </tr>
</table>

Workshop ini membuat game **Rock, Paper, Scissors** melawan komputer menggunakan HTML, CSS, dan JavaScript.

Player dapat memilih:

```text
Rock
Paper
Scissors
```

Komputer akan membuat pilihan secara random. Setiap ronde akan menentukan apakah player menang, computer menang, atau seri.

Pihak pertama yang mencapai **3 poin** memenangkan game.

Project ini melatih bagaimana:

```text
HTML
→ menyediakan struktur

CSS
→ mengatur tampilan

JavaScript
→ mengatur logic, event, score, dan perubahan DOM
```

---

# Struktur HTML

HTML sudah menyediakan seluruh tampilan dasar game.

Secara sederhana:

```text
body
│
├── h1
│
└── main
    │
    ├── .rules-container
    │
    ├── .score-container
    │   ├── #player-score
    │   └── #computer-score
    │
    ├── .options-container
    │   ├── #rock-btn
    │   ├── #paper-btn
    │   └── #scissors-btn
    │
    └── .results-container
        ├── #results-msg
        ├── #winner-msg
        └── #reset-game-btn
```

JavaScript nantinya mengambil elemen-elemen tersebut menggunakan ID atau class.

---

# Rules dengan `<details>` dan `<summary>`

Bagian rules menggunakan:

```html
<details class="rules-container">
  <summary>Rules to the game</summary>

  ...
</details>
```

`<details>` adalah elemen HTML bawaan untuk membuat bagian yang dapat dibuka dan ditutup.

Sedangkan:

```html
<summary>
```

menjadi bagian yang diklik oleh user.

Jadi fitur buka/tutup rules ini dapat bekerja tanpa JavaScript tambahan.

---

# Score Player dan Computer

HTML:

```html
<strong>
  Player Score:
  <span class="score" id="player-score">0</span>
</strong>

<strong>
  Computer Score:
  <span class="score" id="computer-score">0</span>
</strong>
```

Angka score ditempatkan di dalam `<span>` supaya JavaScript dapat mengubah hanya bagian angkanya.

Contohnya:

```text
Player Score: 0
↓
Player menang
↓
Player Score: 1
```

JavaScript mengambilnya melalui:

```js
document.getElementById("player-score");
```

dan:

```js
document.getElementById("computer-score");
```

---

# Tombol Pilihan

Player memiliki tiga tombol:

```html
<button id="rock-btn">Rock</button>
<button id="paper-btn">Paper</button>
<button id="scissors-btn">Scissors</button>
```

Masing-masing tombol mempunyai ID berbeda karena nantinya mempunyai pilihan yang berbeda.

```text
#rock-btn
→ "Rock"

#paper-btn
→ "Paper"

#scissors-btn
→ "Scissors"
```

---

# Container Hasil

```html
<div class="results-container">
  <p id="results-msg"></p>
  <p id="winner-msg"></p>

  <button
    class="btn"
    id="reset-game-btn"
  >
    Play again?
  </button>
</div>
```

Ada dua tempat untuk menampilkan pesan.

```text
#results-msg
→ hasil setiap ronde

#winner-msg
→ pemenang seluruh game
```

Contoh hasil ronde:

```text
Player wins! Rock beats Scissors
```

Sedangkan hasil akhir:

```text
Player has won the game!
```

---

# CSS Reset

CSS dimulai dengan:

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Selector:

```css
*
```

berarti memilih semua elemen.

Sedangkan:

```css
*::before
*::after
```

juga memasukkan pseudo-element `::before` dan `::after`.

Tujuannya untuk menghilangkan margin dan padding bawaan browser sehingga layout lebih mudah dikontrol.

```css
box-sizing: border-box;
```

membuat `width` dan `height` ikut memperhitungkan:

```text
content
+
padding
+
border
```

---

# CSS Variables

Pada `:root` terdapat:

```css
:root {
  --very-dark-blue: #0a0a23;
  --white: #ffffff;
  --yellow: #f1be32;
  --golden-yellow: #feac32;
}
```

Ini disebut **CSS Custom Properties** atau CSS variables.

Contohnya:

```css
background-color: var(--very-dark-blue);
```

daripada terus menulis:

```css
background-color: #0a0a23;
```

Keuntungannya, warna dapat digunakan ulang dengan nama yang lebih mudah dipahami.

Mental model:

```text
--very-dark-blue
↓
menyimpan
↓
#0a0a23
```

Lalu digunakan melalui:

```css
var(--very-dark-blue)
```

---

# Styling Body

```css
body {
  background-color: var(--very-dark-blue);
  text-align: center;
  color: var(--white);
}
```

`body` menggunakan background biru gelap dan teks putih.

```css
text-align: center;
```

membuat teks dan beberapa inline content berada di tengah.

---

# Styling Tombol

```css
.btn {
  cursor: pointer;
  width: 100px;
  margin: 10px;

  color: var(--very-dark-blue);

  background-color:
    var(--golden-yellow);

  background-image:
    linear-gradient(#fecc4c, #ffac33);

  border-color:
    var(--golden-yellow);

  border-width: 3px;
}
```

Semua tombol menggunakan class:

```html
class="btn"
```

sehingga styling yang sama dapat digunakan berulang.

---

# `cursor: pointer`

```css
cursor: pointer;
```

mengubah cursor menjadi bentuk tangan ketika berada di atas tombol.

Ini memberikan tanda visual bahwa elemen tersebut dapat diklik.

---

# `linear-gradient()`

Background tombol menggunakan:

```css
background-image:
  linear-gradient(#fecc4c, #ffac33);
```

Artinya warna tombol tidak hanya satu warna tetapi berubah secara bertahap dari satu warna ke warna lainnya.

Ketika tombol di-hover:

```css
.btn:hover {
  background-image:
    linear-gradient(#ffcc4c, #f89808);
}
```

warna gradient berubah.

---

# Rules Container

```css
.rules-container {
  padding: 10px 0;
  margin: auto;

  border-radius: 15px;
  border: 5px solid var(--yellow);

  background-color: var(--white);
  color: var(--very-dark-blue);
}
```

`border-radius` membuat sudut container menjadi melengkung.

```css
border-radius: 15px;
```

Sedangkan:

```css
margin: auto;
```

nantinya membantu membuat container berada di tengah ketika memiliki ukuran tertentu.

---

# Menghilangkan Bullet List

```css
.rules-container ul {
  list-style-type: none;
}
```

Default `<ul>` biasanya memiliki bullet:

```text
• Rock beats Scissors
• Scissors beats Paper
• Paper beats Rock
```

Dengan:

```css
list-style-type: none;
```

menjadi:

```text
Rock beats Scissors
Scissors beats Paper
Paper beats Rock
```

---

# Media Query

```css
@media (min-width: 760px) {
  .rules-container {
    width: 60%;
  }
}
```

Ini membuat layout menjadi lebih responsive.

Artinya:

```text
jika lebar viewport >= 760px
↓
.rules-container
↓
width: 60%
```

Jadi pada layar yang cukup besar, kotak rules tidak memenuhi seluruh layar.

---

# Flexbox pada Score

```css
.score-container {
  display: flex;
  justify-content: space-around;

  margin: 30px 0;
  font-size: 1.2rem;
}
```

`display: flex` membuat:

```text
Player Score
Computer Score
```

menjadi flex item.

Kemudian:

```css
justify-content: space-around;
```

memberikan ruang di sekitar kedua item.

Secara kasar:

```text
|   Player Score   |   Computer Score   |
```

---

# Tombol Reset Disembunyikan

Pada awal game:

```css
#reset-game-btn {
  display: none;
}
```

Artinya tombol:

```text
Play again?
```

tidak terlihat saat game masih berlangsung.

JavaScript baru menampilkannya ketika game selesai:

```js
resetGameBtn.style.display = "block";
```

---

# JavaScript

Game memiliki beberapa function dengan tugas yang berbeda.

Struktur logic-nya:

```text
CLICK EVENT
│
└── showResults()
    │
    └── getRoundResults()
        │
        ├── getRandomComputerResult()
        │
        └── hasPlayerWonTheRound()
```

---

# Pilihan Game

```js
const options = [
  "Rock",
  "Paper",
  "Scissors"
];
```

Array ini menyimpan seluruh pilihan yang dapat dibuat oleh komputer.

```text
index 0 → Rock
index 1 → Paper
index 2 → Scissors
```

---

# Random Pilihan Computer

```js
function getRandomComputerResult() {
  const randomIndex =
    Math.floor(
      Math.random() * options.length
    );

  return options[randomIndex];
}
```

`Math.random()` menghasilkan angka:

```text
0 sampai kurang dari 1
```

Karena:

```js
options.length
```

bernilai:

```text
3
```

maka:

```js
Math.random() * options.length
```

menghasilkan angka dari:

```text
0 sampai kurang dari 3
```

Kemudian:

```js
Math.floor()
```

membulatkan ke bawah menjadi:

```text
0
1
2
```

Angka tersebut digunakan sebagai index array.

Contoh:

```text
randomIndex = 1
↓
options[1]
↓
"Paper"
```

---

# Mengecek Player Menang

```js
function hasPlayerWonTheRound(
  playerChoice,
  computerChoice
) {
  return (
    (
      playerChoice === "Rock" &&
      computerChoice === "Scissors"
    ) ||
    (
      playerChoice === "Scissors" &&
      computerChoice === "Paper"
    ) ||
    (
      playerChoice === "Paper" &&
      computerChoice === "Rock"
    )
  );
}
```

Function ini menghasilkan boolean.

```text
true
→ player menang

false
→ player kalah atau seri
```

Ada tiga kondisi kemenangan:

```text
Rock beats Scissors

Scissors beats Paper

Paper beats Rock
```

`&&` berarti kedua kondisi harus benar.

```text
Player Rock
DAN
Computer Scissors
```

Sedangkan `||` berarti cukup salah satu kombinasi kemenangan yang benar.

---

# State Score

```js
let playerScore = 0;
let computerScore = 0;
```

Score menggunakan `let` karena nilainya akan berubah.

```text
0
↓
1
↓
2
↓
3
```

Nilai seperti ini dapat dianggap sebagai **state** sederhana dari game.

---

# Mendapatkan Hasil Ronde

```js
function getRoundResults(userOption) {
  const computerResult =
    getRandomComputerResult();

  if (
    hasPlayerWonTheRound(
      userOption,
      computerResult
    )
  ) {
    playerScore++;

    return `Player wins! ${userOption} beats ${computerResult}`;

  } else if (
    computerResult === userOption
  ) {

    return `It's a tie! Both chose ${userOption}`;

  } else {

    computerScore++;

    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}
```

Alurnya:

```text
computer memilih
↓
player menang?
├── YA → playerScore++
│
└── TIDAK
    ↓
    pilihan sama?
    ├── YA → tie
    │
    └── TIDAK → computerScore++
```

---

# Mengambil Elemen DOM

```js
const playerScoreSpanElement =
  document.getElementById(
    "player-score"
  );

const computerScoreSpanElement =
  document.getElementById(
    "computer-score"
  );

const roundResultsMsg =
  document.getElementById(
    "results-msg"
  );

const winnerMsgElement =
  document.getElementById(
    "winner-msg"
  );

const optionsContainer =
  document.querySelector(
    ".options-container"
  );

const resetGameBtn =
  document.getElementById(
    "reset-game-btn"
  );
```

JavaScript menyimpan referensi ke elemen HTML agar dapat mengubahnya nanti.

---

# `showResults()`

```js
function showResults(userOption) {
  roundResultsMsg.innerText =
    getRoundResults(userOption);

  computerScoreSpanElement.innerText =
    computerScore;

  playerScoreSpanElement.innerText =
    playerScore;

  if (
    playerScore === 3 ||
    computerScore === 3
  ) {
    winnerMsgElement.innerText = `${
      playerScore === 3
        ? "Player"
        : "Computer"
    } has won the game!`;

    resetGameBtn.style.display =
      "block";

    optionsContainer.style.display =
      "none";
  }
}
```

Function ini menghubungkan **logic game dengan DOM**.

Bagian paling penting adalah:

```js
getRoundResults(userOption)
```

dipanggil terlebih dahulu.

Kenapa?

Karena function tersebut juga melakukan:

```js
playerScore++;
```

atau:

```js
computerScore++;
```

Jadi score harus dihitung terlebih dahulu sebelum nilai terbaru ditampilkan ke halaman.

Mental model:

```text
proses ronde
↓
ubah score
↓
baru render score
```

---

# Menentukan Pemenang Game

Game berakhir ketika:

```js
playerScore === 3 ||
computerScore === 3
```

Jika salah satunya sudah mencapai 3, program menentukan pemenang menggunakan ternary operator:

```js
playerScore === 3
  ? "Player"
  : "Computer"
```

Mental model:

```text
playerScore === 3 ?

YA
→ "Player"

TIDAK
→ "Computer"
```

Kemudian:

```js
`${...} has won the game!`
```

menghasilkan:

```text
Player has won the game!
```

atau:

```text
Computer has won the game!
```

---

# Mengubah Tampilan Setelah Game Selesai

Jika sudah ada pemenang:

```js
resetGameBtn.style.display =
  "block";

optionsContainer.style.display =
  "none";
```

Maka:

```text
Rock / Paper / Scissors
→ disembunyikan

Play again?
→ ditampilkan
```

JavaScript di sini mengubah CSS secara langsung melalui:

```js
element.style.display
```

---

# Reset Game

```js
function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.textContent =
    playerScore;

  computerScoreSpanElement.textContent =
    computerScore;

  resetGameBtn.style.display =
    "none";

  optionsContainer.style.display =
    "block";

  winnerMsgElement.textContent =
    "";

  roundResultsMsg.textContent =
    "";
}
```

Reset mengembalikan game ke kondisi awal.

```text
playerScore → 0
computerScore → 0

score HTML → 0

Play again? → hide

pilihan Rock/Paper/Scissors → show

winner message → kosong

round message → kosong
```

---

# Event Reset

```js
resetGameBtn.addEventListener(
  "click",
  resetGame
);
```

Di sini digunakan:

```js
resetGame
```

bukan:

```js
resetGame()
```

karena kita memberikan **function reference** kepada event listener.

Function baru dijalankan ketika button diklik.

---

# Event Tombol Pilihan

```js
rockBtn.addEventListener(
  "click",
  function () {
    showResults("Rock");
  }
);
```

Begitu juga dengan Paper dan Scissors.

Tombol hanya mengirim pilihan player ke:

```js
showResults()
```

Contohnya:

```text
klik Rock
↓
showResults("Rock")
```

Tombol tidak perlu mengetahui siapa pemenangnya.

Function lain yang menangani logic tersebut.

---

# Hubungan HTML, CSS, dan JavaScript

Project ini memperlihatkan hubungan ketiganya dengan cukup jelas.

```text
HTML
↓
menyediakan elemen

Rock button
Score
Result message
Reset button
```

```text
CSS
↓
menentukan tampilan

warna
layout
Flexbox
responsive
show / hide default
```

```text
JavaScript
↓
menentukan perilaku

click
random
aturan game
score
winner
reset
update DOM
```

Contohnya:

```text
HTML:
#reset-game-btn

CSS:
display: none

JavaScript:
game selesai
↓
display = "block"
```

Jadi ketiganya saling bekerja sama.

---

# Alur Program Keseluruhan

```text
GAME DIMULAI
↓
score = 0 : 0
↓
Player klik Rock/Paper/Scissors
↓
showResults(userOption)
↓
getRoundResults(userOption)
↓
getRandomComputerResult()
↓
computer memilih
↓
hasPlayerWonTheRound()
↓
tentukan pemenang ronde
↓
update score
↓
update DOM
↓
score === 3?
│
├── TIDAK
│   → ronde berikutnya
│
└── YA
    ↓
    tampilkan winner
    ↓
    sembunyikan options
    ↓
    tampilkan Play again?
    ↓
    user klik reset
    ↓
    resetGame()
    ↓
    kembali ke awal
```

---

# Yang Saya Pelajari

### HTML

- `<details>` dan `<summary>`.
- Penggunaan `<span>` untuk bagian teks yang akan diubah JavaScript.
- Struktur container untuk memisahkan bagian aplikasi.
- ID sebagai penghubung antara HTML dan JavaScript.

### CSS

- Universal selector `*`.
- Pseudo-element `::before` dan `::after`.
- `box-sizing: border-box`.
- CSS Custom Properties / variables.
- `var()`.
- `linear-gradient()`.
- `:hover`.
- `border-radius`.
- `list-style-type`.
- Flexbox.
- `justify-content`.
- Media query.
- Responsive layout.
- `display: none`.
- Hubungan CSS dengan perubahan DOM melalui JavaScript.

### JavaScript

- Array.
- `Math.random()`.
- `Math.floor()`.
- Array index.
- Function dan parameter.
- Function yang mengembalikan boolean.
- `&&` dan `||`.
- `if / else if / else`.
- State sederhana dengan `let`.
- Increment `++`.
- Template literal.
- Ternary operator.
- `getElementById()`.
- `querySelector()`.
- `innerText`.
- `textContent`.
- `.style.display`.
- `addEventListener()`.
- Function reference.
- Memisahkan logic menjadi beberapa function.

---

# Catatan Pribadi

Hal paling penting dari workshop ini bukan hanya membuat Rock, Paper, Scissors.

Saya mulai melihat bagaimana aplikasi JavaScript dapat dibagi menjadi beberapa bagian kecil:

```text
getRandomComputerResult()
→ memilih data

hasPlayerWonTheRound()
→ mengecek aturan

getRoundResults()
→ memproses satu ronde

showResults()
→ menghubungkan logic dengan DOM

resetGame()
→ mengembalikan state
```

Daripada semua logic dimasukkan ke satu function besar, masing-masing function mempunyai tanggung jawab sendiri.

Pola yang ingin saya ingat:

```text
USER ACTION
↓
EVENT
↓
PROCESS LOGIC
↓
UPDATE STATE
↓
UPDATE DOM
```

Contoh nyata:

```text
klik Rock
↓
click event
↓
computer random
↓
bandingkan pilihan
↓
score berubah
↓
HTML diperbarui
```

Workshop ini juga membantu memahami bahwa CSS bukan hanya mempercantik halaman.

CSS menentukan keadaan awal tampilan:

```css
display: none;
```

dan JavaScript dapat mengubah keadaan tersebut:

```js
element.style.display = "block";
```

Jadi HTML, CSS, dan JavaScript bukan bagian yang benar-benar terpisah, tetapi bekerja bersama untuk membentuk aplikasi.

---

**Platform:** freeCodeCamp  
**Workshop:** Build a Rock, Paper, Scissors Game  
**Language:** HTML, CSS, JavaScript
