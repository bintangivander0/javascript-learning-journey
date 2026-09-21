# Build a Customer Complaint Form

<p align="center">
  ![alt text](image.png)
</p>

Lab ini membuat form keluhan pelanggan dengan **validasi menggunakan JavaScript**.

HTML dan CSS sudah disediakan oleh freeCodeCamp. Fokus project ini adalah membaca nilai form, memvalidasi setiap field, memberikan feedback visual dengan border hijau atau merah, serta memeriksa seluruh form kembali saat user melakukan submit.

## Fitur

- Validasi nama agar tidak kosong.
- Validasi format email.
- Validasi nomor pesanan dengan format `2024######`.
- Validasi product code dengan format `XX##-X###-XX#`.
- Validasi quantity sebagai positive integer.
- Memastikan minimal satu complaint checkbox dipilih.
- Memvalidasi complaint description hanya ketika opsi **Other** dipilih.
- Memastikan satu desired solution dipilih.
- Memvalidasi solution description hanya ketika opsi **Other** dipilih.
- Memberikan border hijau untuk field valid.
- Memberikan border merah untuk field invalid.
- Memvalidasi seluruh form kembali saat submit.

## Validation Rules

| Field | Rule |
|---|---|
| Full Name | Tidak boleh kosong |
| Email | Harus mengikuti format email |
| Order No | 10 digit dan diawali `2024` |
| Product Code | Format `XX##-X###-XX#` |
| Quantity | Positive integer mulai dari `1` |
| Complaint Reason | Minimal satu checkbox dipilih |
| Complaint Description | Minimal 20 karakter jika `Other` dipilih |
| Desired Solution | Minimal satu radio button dipilih |
| Solution Description | Minimal 20 karakter jika `Other` dipilih |

## Struktur Project

```text
index.html
styles.css
script.js
assets/
└── customer-complaint-form.png
```

## `validateForm()`

Pusat validasi project berada di function:

```js
function validateForm() {
  ...
}
```

Function ini membaca seluruh nilai form lalu mengembalikan object hasil validasi:

```js
{
  "full-name": true,
  "email": true,
  "order-no": true,
  "product-code": true,
  "quantity": true,
  "complaints-group": true,
  "complaint-description": true,
  "solutions-group": true,
  "solution-description": true
}
```

Setiap value berupa `true` atau `false`. Object ini kemudian dipakai kembali oleh event validation dan submit handler.

## Validasi Full Name

```js
const isNameValid = nameValue.trim().length > 0;
```

`trim()` membuat input yang hanya berisi spasi tetap dianggap tidak valid.

## Validasi Email

```js
const emailRegex =
  /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
```

Regex memeriksa adanya bagian sebelum `@`, domain, titik, dan domain akhir.

## Validasi Order Number

```js
const orderNoRegex = /^2024\d{6}$/;
```

Artinya:

```text
2024 + 6 digit
```

Contoh valid:

```text
2024123456
```

## Validasi Product Code

```js
const productCodeRegex =
  /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/;
```

Format:

```text
XX##-X###-XX#
```

Contoh:

```text
AB12-C345-DE6
```

Huruf boleh uppercase maupun lowercase.

## Validasi Quantity

```js
const quantityRegex = /^[1-9]\d*$/;
```

Karakter pertama harus `1-9`, sehingga `0` tidak dianggap positive integer.

## Checkbox Complaint

Minimal satu checkbox dicek dengan:

```js
document.querySelector(
  'input[name="complaint"]:checked'
) !== null;
```

Jika ada satu checkbox yang checked, hasilnya `true`.

## Conditional Complaint Description

Complaint description hanya wajib jika checkbox **Other** dipilih:

```js
const otherComplaintChecked =
  document.getElementById("other-complaint").checked;

const isComplaintDescValid =
  !otherComplaintChecked ||
  complaintDescValue.trim().length >= 20;
```

Logikanya:

```text
Other tidak dipilih
-> description tidak wajib
-> true

Other dipilih + kurang dari 20 karakter
-> false

Other dipilih + minimal 20 karakter
-> true
```

## Radio Desired Solution

Radio group dicek dengan:

```js
document.querySelector(
  'input[name="solutions"]:checked'
) !== null;
```

Minimal satu solution harus dipilih.

## Conditional Solution Description

```js
const otherSolutionChecked =
  document.getElementById("other-solution").checked;

const isSolutionDescValid =
  !otherSolutionChecked ||
  solutionDescValue.trim().length >= 20;
```

Description hanya wajib ketika radio **Other** dipilih.

## Validation Saat Event `change`

Input biasa menggunakan satu function:

```js
function validateField(e) {
  const validation = validateForm();
  const fieldName = e.target.id;

  if (validation[fieldName]) {
    e.target.style.borderColor = "green";
  } else {
    e.target.style.borderColor = "red";
  }
}
```

Bagian pentingnya:

```js
const fieldName = e.target.id;
```

Jika field yang berubah mempunyai:

```html
<input id="email">
```

maka:

```js
validation[fieldName]
```

sama dengan:

```js
validation["email"]
```

Dengan cara ini satu function dapat digunakan untuk beberapa input.

## Checkbox dan Radio Group

Checkbox dan radio berbeda karena border harus diberikan pada **fieldset**, bukan masing-masing input.

Complaint group:

```js
function validateComplaintGroup() {
  const validation = validateForm();

  if (validation["complaints-group"]) {
    complaintsGroup.style.borderColor = "green";
  } else {
    complaintsGroup.style.borderColor = "red";
  }
}
```

Solution group:

```js
function validateSolutionGroup() {
  const validation = validateForm();

  if (validation["solutions-group"]) {
    solutionsGroup.style.borderColor = "green";
  } else {
    solutionsGroup.style.borderColor = "red";
  }
}
```

Event listener dipasang ke setiap checkbox dan radio menggunakan `for...of`.

## `isValid()`

```js
function isValid(validationObject) {
  return Object.values(validationObject)
    .every(value => value === true);
}
```

Misalnya:

```js
{
  "full-name": true,
  "email": true,
  "order-no": false
}
```

`Object.values()` menghasilkan:

```js
[true, true, false]
```

Kemudian `.every()` memeriksa apakah semua value bernilai `true`.

Karena masih ada satu `false`, hasil akhirnya juga `false`.

## Validasi Saat Submit

```js
form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();

  const validation = validateForm();
  const formIsValid = isValid(validation);

  ...
});
```

`preventDefault()` menghentikan default form submission.

Setelah itu seluruh validasi dihitung kembali.

Input biasa dikumpulkan dalam array:

```js
const normalFields = [
  nameInput,
  emailInput,
  orderNoInput,
  productCodeInput,
  quantityInput
];
```

Lalu setiap field diperiksa:

```js
for (const field of normalFields) {
  if (validation[field.id]) {
    field.style.borderColor = "green";
  } else {
    field.style.borderColor = "red";
  }
}
```

Complaint group, complaint description, solutions group, dan solution description juga diperiksa dengan pola yang sama.

## Alur Program

```text
User mengisi form
        |
        v
change event
        |
        v
validateForm()
        |
        v
field valid?
   /          \
 yes          no
  |            |
  v            v
green         red


Saat submit
        |
        v
preventDefault()
        |
        v
validateForm()
        |
        v
isValid()
        |
        v
semua field diperiksa kembali
```

## Konsep JavaScript yang Dilatih

| Konsep | Digunakan untuk |
|---|---|
| DOM Selection | Mengambil input, textarea, fieldset, checkbox, dan radio |
| `querySelectorAll()` | Mengambil kumpulan checkbox dan radio |
| `:checked` | Mengecek pilihan aktif |
| Regex | Memvalidasi format input |
| `trim()` | Menolak input whitespace-only |
| Event `change` | Memberikan feedback saat field berubah |
| Event `submit` | Memvalidasi seluruh form |
| `preventDefault()` | Menghentikan submit bawaan browser |
| Object | Menyimpan seluruh hasil validasi |
| Dynamic property access | Membaca `validation[field.id]` |
| `Object.values()` | Mengambil semua value object |
| `.every()` | Memastikan semua hasil valid |
| `for...of` | Memproses banyak field |
| Conditional logic | Menentukan description wajib atau tidak |
| `style.borderColor` | Memberikan feedback visual |

## Catatan Pribadi

Lab ini mempertemukan beberapa materi yang sebelumnya dipelajari terpisah:

```text
Regex
DOM
Events
Objects
Loops
Form Validation
preventDefault()
```

Bagian yang paling penting adalah menjadikan satu object sebagai pusat hasil validasi:

```js
{
  "full-name": true,
  "email": false,
  ...
}
```

Dari object tersebut program bisa menentukan field mana yang valid, field mana yang invalid, border mana yang harus hijau atau merah, dan apakah seluruh form sudah valid.

Alur yang perlu saya pahami dari project ini:

```text
DOM field
-> validateForm()
-> object boolean
-> event handler membaca object
-> UI berubah
```

Jadi fokus lab ini bukan hanya membuat Regex, tetapi mengatur **alur validasi form secara keseluruhan**.

## Status Lab

**Platform:** freeCodeCamp  
**Section:** Form Validation  
**Lab:** Build a Customer Complaint Form  
**Languages:** HTML, CSS, JavaScript
