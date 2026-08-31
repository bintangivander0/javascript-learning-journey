# DNA Pairing Generator

Program ini digunakan untuk memasangkan elemen-elemen DNA berdasarkan input string yang diberikan. Setiap karakter akan dipasangkan dengan pasangan basa komplementernya dalam bentuk array dua dimensi.

Aturan pasangan DNA:
* **A** (Adenine) berpasangan dengan **T** (Thymine)
* **T** (Thymine) berpasangan dengan **A** (Adenine)
* **C** (Cytosine) berpasangan dengan **G** (Guanine)
* **G** (Guanine) berpasangan dengan **C** (Cytosine)

## Yang Saya Pelajari

* `.split("")` untuk memecah string menjadi array per karakter.
* `for...of` loop untuk mengiterasi setiap elemen array.
* Percabangan `if...else if` untuk menentukan pasangan basa yang cocok.
* `.push()` untuk memasukkan array pasangan baru ke dalam array hasil.
* *Alternative:* Menggunakan objek (kamus pasangan) dan `.map()` untuk sintaks yang lebih ringkas.

## Parameter dna

Parameter `dna` berupa sebuah string yang berisi kumpulan huruf representasi DNA (A, T, C, G).

Contoh:

```javascript
pairElement("ATCGA");
```

Hasil: `[["A", "T"], ["T", "A"], ["C", "G"], ["G", "C"], ["A", "T"]]`
