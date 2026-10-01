function diffArray(arr1, arr2) {
  const unikDiArr1 = arr1.filter((item) => !arr2.includes(item));
  const unikDiArr2 = arr2.filter((item) => !arr1.includes(item));
  return unikDiArr1.concat(unikDiArr2);
}
