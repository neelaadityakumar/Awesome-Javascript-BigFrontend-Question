<h1>146. implement Array.prototype.reduce()
</h1>

<br/>Array.prototype.reduce() is a handy method to process arrays.

Here is a simple task - Could you implement it by yourself?

```js
[1, 2, 3].myReduce((sum, item) => sum + item);
```

// 6
do not use native Array.prototype.reduce() in your code
your function is only tested against valid array (no array-like objects)
thanks to pajadev for suggesting this
<br/>

```javascript
Array.prototype.myReduce = function (...args) {
  const hasInitialValue = args.length > 1;
  if (!hasInitialValue && this.length === 0) {
    throw new Error();
  }

  let result = hasInitialValue ? args[1] : this[0];

  for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
    result = args[0](result, this[i], i, this);
  }

  return result;
};
//https://bigfrontend.dev/problem/implement-Array-prototype-reduce
```
