# Form Validation with JavaScript Review

> **Catatan belajar:** Struktur dan urutan kalimat materi sumber dipertahankan. Penjelasan tambahan berlabel **Catatan mentor** ditambahkan tepat setelah bagian yang memuat istilah teknis, istilah yang mudah ambigu, atau singkatan.

## Interactive Editor

> **Catatan mentor:** *Interactive Editor* adalah editor kode interaktif di halaman belajar yang memungkinkan contoh kode diedit dan dijalankan langsung tanpa harus pindah ke editor lain.

Turn static code examples into interactive editors. This allows you to edit and run the code directly on the page.

> **Catatan mentor:** *Static code examples* berarti contoh kode yang awalnya hanya ditampilkan untuk dibaca, sedangkan *interactive editors* memungkinkan kode tersebut diubah dan dieksekusi langsung pada halaman.

## Validating Forms with JavaScript

> **Catatan mentor:** *Form validation* adalah proses memeriksa apakah data yang dimasukkan pengguna sudah memenuhi aturan yang ditentukan sebelum data tersebut diproses lebih lanjut.

### Constraint Validation API

Constraint Validation API: Certain HTML elements, such as the textarea and input elements, expose a constraint validation API. This API allows you to assert that the user's provided value for that element passes any HTML-level validation you have written, such as minimum length or pattern matching.

> **Catatan mentor:** **API** adalah singkatan dari *Application Programming Interface*. Pada bagian ini, *Constraint Validation API* adalah fitur bawaan browser yang dapat membaca aturan validasi dari atribut HTML seperti `required`, `min`, `max`, `minlength`, `maxlength`, `type`, dan `pattern`.

> **Catatan mentor:** *HTML-level validation* berarti aturan validasi yang ditulis langsung pada elemen HTML, sedangkan *pattern matching* berarti membandingkan nilai input dengan pola tertentu, biasanya pola dari regular expression.

### `checkValidity()` Method

checkValidity() method: This method returns true if the element matches all HTML validation (based on its attributes), and false if it fails.

> **Catatan mentor:** `checkValidity()` menghasilkan nilai Boolean, yaitu `true` atau `false`, berdasarkan apakah semua aturan validasi HTML pada elemen tersebut terpenuhi.

```html
<form>
  <label>
    Email:
    <input
      id="email"
      type="email"
      required
      pattern=".+\.com$"
      placeholder="example@site.com"
    />
  </label>
</form>

<script>
  const input = document.getElementById("email");

  input.addEventListener("input", (e) => {
    if (!e.target.checkValidity()) {
      e.target.setCustomValidity("You must use a .com email.");
    } else {
      e.target.setCustomValidity("");
    }
  });
</script>
```

> **Catatan mentor:** Pada contoh ini, atribut `required` mewajibkan field diisi dan atribut `pattern=".+\.com$"` mewajibkan nilai berakhir dengan `.com`.

> **Catatan mentor:** `setCustomValidity()` menetapkan pesan validasi khusus. Ketika input sudah valid, pesan tersebut harus dikosongkan kembali dengan `setCustomValidity("")` agar elemen tidak tetap dianggap invalid karena custom error sebelumnya.

### `reportValidity()` Method

reportValidity() Method: This method tells the browser that the input is invalid.

> **Catatan mentor:** Dalam praktiknya, `reportValidity()` meminta browser memeriksa keadaan validasi saat ini dan menampilkan pesan validasi bawaan jika elemen tidak valid; method ini tidak membuat input menjadi invalid dengan sendirinya.

```html
<form>
  <label>
    Email:
    <input
      id="email2"
      type="email"
      required
      pattern=".+\.com$"
      placeholder="example@site.com"
    />
  </label>
</form>

<script>
  const input = document.getElementById("email2");

  input.addEventListener("input", (e) => {
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
    }
  });
</script>
```

> **Catatan mentor:** Pada contoh ini, `checkValidity()` digunakan terlebih dahulu untuk mengetahui apakah input valid, lalu `reportValidity()` digunakan agar browser menampilkan feedback validasi kepada pengguna.

### `validity` Property

validity Property: This property is used to get the validity state of form controls (like `<input>`, `<select>`, etc.) and provides information about whether the user input meets the constraints defined for that element (e.g., required fields, pattern constraints, maximum length, etc.).

> **Catatan mentor:** *Validity state* adalah kumpulan informasi validasi yang disediakan browser melalui object `ValidityState`, misalnya apakah field kosong ketika `required`, tidak cocok dengan `pattern`, terlalu pendek, terlalu panjang, atau berada di luar rentang angka yang diizinkan.

> **Catatan mentor:** **e.g.** adalah singkatan dari bahasa Latin *exempli gratia* yang berarti “for example” atau “sebagai contoh”.

```html
<input
  id="age"
  type="number"
  min="18"
  placeholder="Enter age (18+)"
/>

<script>
  const input = document.getElementById("age");

  input.addEventListener("input", (e) => {
    console.log(e.target.validity);
  });
</script>
```

> **Catatan mentor:** Karena input memakai `type="number"` dan `min="18"`, browser dapat mencatat keadaan seperti `rangeUnderflow` jika nilai yang dimasukkan lebih kecil dari 18.

### `patternMismatch` Property

patternMismatch Property: This will be true if the value doesn't match the specified regular expression pattern.

> **Catatan mentor:** `patternMismatch` merupakan salah satu property di dalam `validity`; nilainya menjadi `true` ketika nilai input tidak cocok dengan pola yang ditentukan oleh atribut `pattern`.

## `preventDefault()` Method

preventDefault() Method

> **Catatan mentor:** `preventDefault()` adalah method pada object event yang digunakan untuk mencegah perilaku bawaan browser dari event tersebut.

Definition: Every event that triggers in the DOM has some sort of default behavior. The click event on a checkbox toggles the state of that checkbox, by default. Pressing the Spacebar on a focused button activates the button. The preventDefault() method on these Event objects stops that behavior from happening.

> **Catatan mentor:** **DOM** adalah singkatan dari *Document Object Model*, yaitu representasi struktur dokumen HTML yang dapat dibaca dan dimanipulasi melalui JavaScript.

> **Catatan mentor:** *Default behavior* adalah tindakan yang secara otomatis dilakukan browser ketika suatu event terjadi, misalnya mencentang checkbox saat diklik atau melakukan submit saat form dikirim.

> **Catatan mentor:** *Event object* adalah object yang berisi informasi tentang event yang sedang terjadi, misalnya elemen target, jenis event, tombol keyboard yang ditekan, serta method seperti `preventDefault()`.

```html
<form id="form">
  <input type="text" placeholder="Try to submit" />
  <button type="submit">Submit</button>
</form>

<p id="status"></p>

<script>
  const form = document.getElementById("form");
  const status = document.getElementById("status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "Form submission prevented.";
  });
</script>
```

> **Catatan mentor:** `event.preventDefault()` pada contoh ini mencegah proses submit bawaan browser, sehingga JavaScript dapat menjalankan perilaku sendiri tanpa perpindahan halaman akibat submit normal.

## Submitting Forms

Submitting Forms

> **Catatan mentor:** *Submitting a form* berarti memulai proses pengiriman data form sesuai konfigurasi yang dimiliki elemen `<form>` atau sesuai logic JavaScript yang menangani proses tersebut.

Definition: There are three ways a form can be submitted. The first is when the user clicks a button in the form which has the type attribute set to submit. The second is when the user presses the Enter key on any editable input field in the form. The third is through a JavaScript call to the requestSubmit() or submit() methods of the form element.

> **Catatan mentor:** `type="submit"` memberi tahu browser bahwa button tersebut berfungsi untuk mengirim form.

> **Catatan mentor:** `requestSubmit()` meminta form melakukan proses submit yang mengikuti mekanisme validasi dan submit event, sedangkan `submit()` melakukan pengiriman form secara programatis dengan perilaku yang berbeda dan tidak identik dengan klik submit button.

### `action` Attribute

action Attribute: The action attribute should contain either a URL or a relative path for the current domain. This value determines where the form attempts to send data - if you do not set an action attribute, the form will send data to the current page's URL.

> **Catatan mentor:** **URL** adalah singkatan dari *Uniform Resource Locator*, yaitu alamat yang menunjuk ke suatu resource di web.

> **Catatan mentor:** *Relative path* adalah alamat yang ditulis relatif terhadap domain atau lokasi halaman saat ini, misalnya `/data`, bukan alamat lengkap seperti `https://example.com/data`.

> **Catatan mentor:** *Current domain* berarti domain tempat halaman yang sedang dibuka berjalan saat ini.

```html
<form action="https://freecodecamp.org" method="GET">
  <input
    type="number"
    name="number"
    placeholder="Enter a number"
  />
  <button type="submit">Submit</button>
</form>
```

> **Catatan mentor:** Pada contoh ini, data form dikirim menuju URL `https://freecodecamp.org` menggunakan method `GET`.

### `method` Attribute

method Attribute: This attribute accepts a standard HTTP method, such as GET or POST, and uses that method when making the request to the action URL. When a method is not set, the form will default to a GET request. The data in the form will be URL encoded as name=value pairs and appended to the action URL as query parameters.

> **Catatan mentor:** **HTTP** adalah singkatan dari *Hypertext Transfer Protocol*, yaitu protokol yang digunakan client dan server untuk bertukar request dan response di web.

> **Catatan mentor:** `GET` biasanya digunakan untuk meminta atau mengambil data, sedangkan `POST` biasanya digunakan ketika client mengirim data ke server untuk diproses atau disimpan.

> **Catatan mentor:** *URL encoded* berarti karakter dalam data form diubah ke format aman untuk dikirim melalui URL atau body request sesuai aturan encoding form.

> **Catatan mentor:** Pasangan `name=value` menggunakan nilai atribut `name` sebagai key dan nilai input sebagai value.

> **Catatan mentor:** *Query parameters* adalah data tambahan yang ditempel pada URL setelah tanda `?`, misalnya `?number=3342`.

```html
<form action="/data" method="POST">
  <input
    type="number"
    id="input"
    placeholder="Enter a number"
    name="number"
  />
  <button type="submit">Submit</button>
</form>
```

> **Catatan mentor:** Pada form ini, data dikirim ke path `/data` menggunakan `POST`, sehingga data form tidak ditempelkan ke URL sebagai query string seperti pada submit `GET` biasa.

### `enctype` Attribute

enctype Attribute: The form element accepts an enctype attribute, which represents the encoding type to use for the data. This attribute only accepts three values: application/x-www-form-urlencoded (which is the default, sending the data as a URL-encoded form body), text/plain (which sends the data in plaintext form, in name=value pairs separated by new lines), or multipart/form-data, which is specifically for handling forms with a file upload.

> **Catatan mentor:** `enctype` adalah singkatan dari *encoding type*, yaitu format yang digunakan browser ketika mengemas data form untuk dikirim.

> **Catatan mentor:** `application/x-www-form-urlencoded` adalah format default yang mengubah data menjadi pasangan `name=value` yang di-encode.

> **Catatan mentor:** `text/plain` mengirim data dalam bentuk teks biasa sehingga formatnya mudah dibaca, tetapi format ini jarang dipilih untuk pengiriman form aplikasi web yang membutuhkan struktur data yang lebih jelas.

> **Catatan mentor:** `multipart/form-data` membagi data menjadi beberapa bagian sehingga cocok digunakan ketika form mengirim file bersama field lain.

## Ringkasan

| Konsep | Fungsi utama | Hal yang perlu diingat |
|---|---|---|
| Constraint Validation API | Membaca dan mengecek aturan validasi HTML | Bekerja berdasarkan constraint seperti `required`, `pattern`, `min`, dan lainnya |
| `checkValidity()` | Mengecek apakah elemen valid | Menghasilkan `true` atau `false` |
| `reportValidity()` | Meminta browser menampilkan hasil validasi | Berguna untuk menampilkan pesan validasi browser |
| `validity` | Melihat detail keadaan validasi | Menghasilkan object `ValidityState` |
| `patternMismatch` | Mengetahui ketidakcocokan dengan `pattern` | `true` berarti nilai tidak cocok dengan pattern |
| `preventDefault()` | Mencegah default behavior event | Sering dipakai pada `submit` agar JavaScript mengambil alih proses |
| `action` | Menentukan tujuan pengiriman form | Bisa URL lengkap atau relative path |
| `method` | Menentukan HTTP method | Form default ke `GET` bila method tidak ditulis |
| `enctype` | Menentukan encoding data form | `multipart/form-data` digunakan untuk file upload |

## Ingat!

- `checkValidity()` digunakan untuk **mengecek** validitas.
- `reportValidity()` digunakan ketika ingin browser **menampilkan feedback validasi**.
- `validity` memberi detail tentang **alasan** suatu input valid atau invalid.
- `preventDefault()` mencegah perilaku bawaan event, bukan menghentikan seluruh JavaScript event handling.
- `GET` dan `POST` adalah HTTP methods yang mengatur cara request form dikirim.
- `action`, `method`, dan `enctype` menentukan bagaimana form berkomunikasi dengan tujuan pengiriman datanya.
