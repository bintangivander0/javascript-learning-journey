# Apa Saja Cara untuk Memvalidasi Form Menggunakan JavaScript?

Pada pelajaran sebelumnya, Anda sudah belajar menggunakan HTML untuk membatasi nilai yang boleh dikirim pengguna melalui form. Namun, terkadang validasi HTML saja belum cukup. Jika Anda ingin membuat validasi yang lebih kompleks, misalnya menampilkan pesan error buatan sendiri kepada pengguna, Anda perlu menggunakan JavaScript.

Beberapa elemen HTML, seperti `textarea` dan `input`, menyediakan **Constraint Validation API**. API ini memungkinkan Anda memeriksa apakah nilai yang diberikan pengguna pada elemen tersebut memenuhi aturan validasi HTML yang sudah Anda tulis, misalnya panjang minimum atau kecocokan dengan suatu pola.

> **Penjelasan tambahan:** Aturan yang dimaksud adalah aturan HTML yang memang sudah terpasang pada elemen, misalnya `required`, `type="email"`, `pattern`, `minlength`, `maxlength`, `min`, atau `max`. Constraint Validation API kemudian membantu JavaScript membaca dan melaporkan apakah aturan-aturan itu terpenuhi.

## Menyiapkan Form dengan Validasi HTML

Lalu, bagaimana cara menggunakannya? Misalnya, Anda ingin karyawan di sebuah perusahaan mengirim pesan umpan balik melalui form seperti berikut:

```html
<link rel="stylesheet" href="styles.css" />
<form>
  <label>Enter your email: </label>
  <input required type="email" />

  <label>Enter your feedback: </label>
  <textarea required placeholder="Your feedback here..."></textarea>

  <button type="submit">Submit Feedback</button>
</form>

```

```css
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Arial, sans-serif;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 3px rgba(0, 120, 212, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background-color: #0078d4;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #005ea2;
}


```

Di sini kita menggunakan `input` bertipe email yang sudah memiliki validasi bawaan. Validasi dasar ini dapat memeriksa hal sederhana, misalnya apakah input email memiliki tanda at (`@`).

Namun, bagaimana jika pengguna memasukkan alamat email seperti `example@email.com`? Alamat tersebut akan lolos validasi dasar, padahal kita ingin aturan yang lebih spesifik, yaitu hanya menerima alamat email perusahaan.

## Membatasi Input dengan Atribut `pattern`

Di sinilah atribut `pattern` dapat digunakan untuk menentukan bahwa alamat email harus berakhir dengan domain email perusahaan. Berikut bentuk contoh yang sudah diperbarui:

> **Penjelasan tambahan:** Nilai `pattern` ditulis sebagai pola regular expression dalam atribut HTML. Pada `pattern=".+@sampleCompany\.com"`, `.+` berarti ada satu atau lebih karakter sebelum `@`, sedangkan `\.` digunakan agar titik dibaca sebagai karakter titik biasa, bukan wildcard Regex.

```html
<link rel="stylesheet" href="styles.css" />
<form>
  <label>Enter your email: </label>
  <input required placeholder="username@sampleCompany.com" type="email" pattern=".+@sampleCompany\.com" />

  <label>Enter your feedback: </label>
  <textarea required placeholder="Your feedback here..."></textarea>

  <button type="submit">Submit Feedback</button>
</form>

```

```css
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Arial, sans-serif;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 3px rgba(0, 120, 212, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background-color: #0078d4;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #005ea2;
}


```

Sekarang, jika Anda mencoba mengirim form dengan format yang tidak sesuai, browser akan menampilkan pesan **"Please match the requested format."**

Walaupun `input` sudah memiliki teks placeholder yang menunjukkan format yang diinginkan, akan lebih baik jika kita juga menyediakan pesan error khusus menggunakan JavaScript.

## Memeriksa Validitas dengan `checkValidity()`

Pertama, mari kita lihat method `checkValidity()`:

```html
<link rel="stylesheet" href="styles.css" />
<form>
  <label>Enter your email: </label>
  <input required placeholder="username@sampleCompany.com" type="email" pattern=".+@sampleCompany\.com" />

  <label>Enter your feedback: </label>
  <textarea required placeholder="Your feedback here..."></textarea>

  <button type="submit">Submit Feedback</button>
</form>
<script src="index.js"></script>

```

```css
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Arial, sans-serif;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 3px rgba(0, 120, 212, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background-color: #0078d4;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #005ea2;
}


```

```js
const input = document.querySelector("input");

input.addEventListener("input", (e) => {
  console.log(e.target.checkValidity())
})

```

Pada contoh di atas, kita mengambil elemen input dari DOM lalu menambahkan event listener `input` pada elemen tersebut.

Kita sudah tahu bahwa `e.target` merujuk pada elemen yang memicu event. Dalam kasus ini, elemennya adalah `input`. Lalu, apa itu method `checkValidity()`?

Method ini merupakan bagian dari Constraint Validation API. `checkValidity()` mengembalikan `true` jika elemen memenuhi semua aturan validasi HTML yang ditentukan melalui atribut-atributnya, dan mengembalikan `false` jika ada aturan yang tidak terpenuhi.

> **Penjelasan tambahan:** `checkValidity()` hanya memberi hasil boolean tentang valid atau tidak valid. Method ini tidak dipakai untuk membuat pesan khusus. Untuk menampilkan pesan validasi ke pengguna, materi berikutnya menggunakan `reportValidity()`.

## Menampilkan Hasil Validasi dengan `reportValidity()`

Ketika kita mencoba input yang tidak valid, nilai `false` akan tercetak di console. Setelah kita mengetahui bahwa input tersebut tidak valid, selanjutnya kita dapat meminta browser menampilkan kondisi tidak valid itu kepada pengguna:

```html
<link rel="stylesheet" href="styles.css" />
<form>
  <label>Enter your email: </label>
  <input required placeholder="username@sampleCompany.com" type="email" pattern=".+@sampleCompany\.com" />

  <label>Enter your feedback: </label>
  <textarea required placeholder="Your feedback here..."></textarea>

  <button type="submit">Submit Feedback</button>
</form>
<script src="index.js"></script>

```

```css
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Arial, sans-serif;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 3px rgba(0, 120, 212, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background-color: #0078d4;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #005ea2;
}


```

```js
const input = document.querySelector("input");

input.addEventListener("input", (e) => {
  if (!e.target.checkValidity()) {
    e.target.reportValidity();
  }
})

```

Hasilnya, Anda akan melihat pesan error bawaan browser: **"Please match the requested format."**

> **Penjelasan tambahan:** `reportValidity()` meminta browser menampilkan UI/pesan validasi yang sesuai dengan kondisi input saat itu. Pesan bawaan bisa berbeda sedikit antar-browser atau bahasa browser.

## Menetapkan Pesan Khusus dengan `setCustomValidity()`

`reportValidity()` dapat menampilkan kondisi tidak valid secara langsung tanpa harus menunggu form dikirim. Namun, pesan yang digunakan masih merupakan pesan bawaan browser. Hal ini karena `reportValidity()` hanya meminta browser melaporkan bahwa input tidak valid; browser tetap menentukan pesan yang menjelaskan penyebabnya. Untuk menentukan pesan error sendiri, kita dapat menggunakan method `setCustomValidity()`.

```html
<link rel="stylesheet" href="styles.css" />
<form>
  <label>Enter your email: </label>
  <input required placeholder="username@sampleCompany.com" type="email" pattern=".+@sampleCompany\.com" />

  <label>Enter your feedback: </label>
  <textarea required placeholder="Your feedback here..."></textarea>

  <button type="submit">Submit Feedback</button>
</form>
<script src="index.js"></script>

```

```css
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Arial, sans-serif;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 3px rgba(0, 120, 212, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background-color: #0078d4;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #005ea2;
}


```

```js
const input = document.querySelector("input");

input.addEventListener("input", (e) => {
  if (!e.target.checkValidity()) {
    e.target.setCustomValidity(
      "You must use a company email address that ends in @sampleCompany.com"
    );
  }
});

```

Method ini menerima sebuah pesan error khusus yang dapat ditampilkan kepada pengguna. Hasilnya, Anda akan melihat pesan khusus: `You must use a company email address that ends in @sampleCompany.com`.

> **Penjelasan tambahan:** `setCustomValidity("pesan")` membuat elemen dianggap memiliki custom error. Ketika input sudah benar, custom error biasanya perlu dibersihkan kembali dengan `setCustomValidity("")`; jika tidak, pesan khusus lama dapat terus membuat input dianggap tidak valid. Pesan akan terlihat ketika browser melaporkan validitas, misalnya saat submit atau ketika `reportValidity()` dipanggil.

## Mempelajari Property `validity`

Jika Anda ingin melihat lebih jauh berbagai jenis kondisi validitas dan mengetahui alasan suatu validasi gagal, Anda dapat menampilkan property `validity` ke console seperti berikut:

```html
<link rel="stylesheet" href="styles.css" />
<form>
  <label>Enter your email: </label>
  <input required placeholder="username@sampleCompany.com" type="email" pattern=".+@sampleCompany\.com" />

  <label>Enter your feedback: </label>
  <textarea required placeholder="Your feedback here..."></textarea>

  <button type="submit">Submit Feedback</button>
</form>
<script src="index.js"></script>

```

```css
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Arial, sans-serif;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #0078d4;
  box-shadow: 0 0 3px rgba(0, 120, 212, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background-color: #0078d4;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #005ea2;
}


```

```js
const input = document.querySelector("input");

input.addEventListener("input", (e) => {
  console.log(e.target.validity);
})

```

Property `validity` merupakan instance dari object `ValidityState`. Berikut contoh bentuk object yang mungkin terlihat di browser:

> **Penjelasan tambahan:** Setiap property pada `ValidityState` menunjukkan jenis masalah tertentu. Property `valid` hanya bernilai `true` jika tidak ada kondisi validasi yang gagal dan tidak ada custom error aktif.

```js
ValidityState {
  badInput: false,
  customError: false,
  patternMismatch: true,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: true,
  valueMissing: false,
  valid: false
}

```

Di dalamnya terdapat beberapa property yang berguna. Semua property tersebut menyimpan nilai boolean `true` atau `false`.

Beberapa property yang dapat Anda pelajari lebih lanjut antara lain `valueMissing`, yang bernilai `true` ketika field yang memiliki atribut `required` dibiarkan kosong, serta `patternMismatch`, yang bernilai `true` jika nilai input tidak cocok dengan pola regular expression yang sudah ditentukan.

> **Penjelasan tambahan:** Contoh lain pada object tersebut: `typeMismatch` dapat menjadi `true` ketika format nilai tidak sesuai dengan tipe input, `tooShort` dan `tooLong` berkaitan dengan batas panjang, sedangkan `rangeUnderflow` dan `rangeOverflow` berkaitan dengan batas nilai minimum dan maksimum.

Setelah pelajaran ini, Anda disarankan mencoba sendiri contoh-contoh yang diberikan dan mengeksplorasi lebih banyak property validitas yang tersedia.
