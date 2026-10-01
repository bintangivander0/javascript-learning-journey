# Bagaimana Hubungan Antar Elemen (Node) di Dalam Pohon DOM?

Mari kita pelajari bagaimana elemen-elemen di dalam web saling terhubung satu sama lain. Sama seperti pohon di dunia nyata yang memiliki dahan besar dan ranting kecil, elemen di dalam DOM juga memiliki hubungan keluarga (hierarki).

Kita akan gunakan contoh kode HTML di bawah ini untuk melihat hubungannya:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Contoh Hubungan DOM</title>
  </head>
  <body>
    <h1>Judul Utama</h1>
    <p>Ini adalah paragraf.</p>
    <ul>
      <li>Pilihan 1</li>
      <li>Pilihan 2</li>
    </ul>
  </body>
</html>
```

## Istilah Hubungan Keluarga di Dalam DOM

Untuk mempermudah, kita bisa membayangkan pohon DOM seperti sebuah **pohon silsilah keluarga**:

### 1. Root (Akar / Kepala Keluarga)
* **Elemen `<html>`** adalah *root* atau akar paling atas. 
* Semua elemen lain di dalam web berada di dalam `<html>`, sehingga semua elemen adalah keturunan dari akar utama ini.

### 2. Parent (Orang Tua) dan Child (Anak)
* **Parent** adalah elemen pembungkus yang di dalamnya ada elemen lain.
* **Child** adalah elemen yang berada langsung di dalam elemen pembungkus tersebut.
* *Contoh:* Elemen `<body>` adalah **Parent** dari `<p>`. Sebaliknya, elemen `<p>` adalah **Child** dari `<body>`.

### 3. Siblings (Saudara Kandung)
* **Siblings** adalah elemen-elemen yang memiliki orang tua (Parent) yang sama persis.
* *Contoh 1:* Dua elemen `<li>` di atas adalah **Siblings** karena keduanya sama-sama berada di dalam satu pembungkus yang sama, yaitu `<ul>`.
* *Contoh 2:* Elemen `<h1>`, `<p>`, dan `<ul>` juga saling bersaudara (**Siblings**) karena mereka bertiga kompak tinggal di dalam `<body>`.

### 4. Descendant (Keturunan / Cucu / Cicit)
* Elemen yang berada di dalam elemen lain, baik secara langsung maupun tidak langsung (berada jauh di lapisan dalam).
* *Contoh:* Elemen `<li>` adalah **Descendant** dari `<body>`. Walaupun tidak langsung menempel, kita bisa menjangkau `<li>` jika kita berjalan turun dari `<body>` lalu masuk ke `<ul>`.

### 5. Ancestor (Luhur / Kakek / Nenek Moyang)
* Kebalikan dari keturunan, ini adalah elemen yang posisinya jauh lebih tinggi di dalam struktur pohon.
* *Contoh:* Elemen `<body>` adalah **Ancestor** dari elemen `<li>`.

---

## Kesimpulan
Memahami hubungan "keluarga" antar elemen ini sangat penting. Nantinya di JavaScript, kita bisa memanipulasi web dengan cara berjalan melompat dari satu elemen ke elemen lainnya (misalnya: dari anak melompat ke orang tuanya, atau dari sebuah elemen melompat ke saudara kandungnya).
