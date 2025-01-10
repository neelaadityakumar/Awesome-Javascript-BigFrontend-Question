```javascript
const map = new Map();
let globalId = 0;
function mySetInterval(func, delay, period) {
  let count = 0;
  let id = globalId++;

  function run() {
    let _id = setTimeout(() => {
      func();
      count++;
      run();
    }, delay + period * count);
    map.set(id, _id);
  }

  run();

  return id;
}
/**
 * @param { number } id
 */
function myClearInterval(id) {
  clearTimeout(map.get(id));
  map.delete(id);
}
//https://bigfrontend.dev/problem/create-an-interval
```
