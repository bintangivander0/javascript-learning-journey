// Penghapus nilai-nilai yang termasuk nilai false.
function bouncer(arr) {
  const result = [];
  const nilaiFalse = [false, null, 0, "", undefined, NaN];
  for (let i = 0; i < arr.length; i++) {
    if (!nilaiFalse.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(bouncer([7, "ate", "", false, 9]));
console.log(bouncer([]));
