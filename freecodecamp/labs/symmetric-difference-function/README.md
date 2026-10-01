# Build a Symmetric Difference Function

Lab ini membuat function untuk membandingkan dua array lalu mengambil elemen yang **hanya ada di salah satu array**, bukan yang ada di keduanya.

Contoh:

```js
const arr1 = ["diamond", "stick", "apple"];
const arr2 = ["stick", "emerald", "bread"];
```

Hasil:

```js
["diamond", "apple", "emerald", "bread"]
```

`"stick"` tidak ikut karena ada di kedua array.

## Function

```js
function diffArray(arr1, arr2) {
  const unikDiArr1 =
    arr1.filter((item) => !arr2.includes(item));

  const unikDiArr2 =
    arr2.filter((item) => !arr1.includes(item));

  return unikDiArr1.concat(unikDiArr2);
}
```

## Cara Kerja

Pertama, cari elemen dari `arr1` yang tidak ada di `arr2`:

```js
const unikDiArr1 =
  arr1.filter((item) => !arr2.includes(item));
```

Lalu lakukan kebalikannya:

```js
const unikDiArr2 =
  arr2.filter((item) => !arr1.includes(item));
```

Terakhir, gabungkan kedua hasil tersebut:

```js
return unikDiArr1.concat(unikDiArr2);
```

Alurnya:

```text
arr1
↓
ambil yang tidak ada di arr2

arr2
↓
ambil yang tidak ada di arr1

↓
gabungkan hasil
```

## Yang Saya Pelajari

- `filter()` untuk menyaring elemen berdasarkan kondisi.
- `includes()` untuk mengecek apakah suatu nilai ada di dalam array.
- Operator NOT `!` untuk membalik kondisi.
- `concat()` untuk menggabungkan dua array.
- Membandingkan dua array tanpa harus memakai nested loop.
- Memahami konsep **symmetric difference**.

## Catatan

Bagian pentingnya ada di:

```js
!arr2.includes(item)
```

Artinya:

> ambil `item` hanya jika item tersebut **tidak ada** di `arr2`.

Begitu juga sebaliknya untuk `arr2`.

Kalau kedua array sama persis, hasil akhirnya:

```js
[]
```

karena tidak ada elemen yang hanya muncul di salah satu array.

**Platform:** freeCodeCamp  
**Lab:** Build a Symmetric Difference Function  
**Language:** JavaScript
