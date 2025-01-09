//https://bigfrontend.dev/problem/implement-Array-prototype.flat

function flat(arr, depth = 1) {
  const res = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      res.push(...flat(item, depth - 1));
    } else {
      res.push(item);
    }
  });
  return res;
}

const arr = [1, [2], [3, [4]]];
flat(arr);
// [1, 2, 3, [4]]
flat(arr, 1);
// [1, 2, 3, [4]]
flat(arr, 2);
// [1, 2, 3, 4]
