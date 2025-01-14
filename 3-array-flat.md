<h1>title</h1>

<br/>
<br/>

3. implement Array.prototype.flat()

There is already Array.prototype.flat() in JavaScript (ES2019), which reduces the nesting of Array. Please implement your own.

const arr = [1, [2], [3, [4]]];
flat(arr)
// [1, 2, 3, [4]]
flat(arr, 1)
// [1, 2, 3, [4]]
flat(arr, 2)
// [1, 2, 3, 4]
follow up

Are you able to solve it both recursively and iteratively? How do you handle sparse array?

Source for this

```javascript
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
```
