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
