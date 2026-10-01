# HTML Entity Converter

Program ini digunakan untuk mengonversi karakter khusus dalam sebuah string menjadi entitas HTML padanannya. Ini sangat berguna untuk mencegah serangan XSS (Cross-Site Scripting) atau memastikan teks teks tampil dengan benar di halaman web.

Aturan konversi HTML:

- `&` (Ampersand) dikonversi menjadi `&amp;`
- `<` (Less than) dikonversi menjadi `&lt;`
- `>` (Greater than) dikonversi menjadi `&gt;`
- `"` (Double quote) dikonversi menjadi `&quot;`
- `'` (Single quote) dikonversi menjadi `&apos;`

## Yang Saya Pelajari

- `.split("")` untuk memecah string teks menjadi array per karakter agar bisa dimodifikasi.
- Perulangan `for` konvensional untuk mengiterasi indeks dari setiap karakter dalam array.
- Percabangan `if...else if` untuk mencocokkan karakter khusus dengan entitas HTML yang sesuai.
- `.join("")` untuk menggabungkan kembali array karakter yang telah diubah menjadi satu string utuh.
- **Alternative:** Menggunakan metode `.replace()` dengan *Regular Expression* (Regex) atau objek kamus untuk sintaks yang jauh lebih ringkas.

## Parameter str

Parameter `str` berupa sebuah string yang berisi teks atau kalimat yang ingin diperiksa dan dikonversi karakter khususnya.

Contoh:

```javascript
convertHTML("Dolce & Gabbana");
```
Hasil: `"Dolce &amp; Gabbana"`
