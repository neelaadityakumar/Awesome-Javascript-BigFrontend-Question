```javascript
function sum(...args) {
  let res = 0;
  for (let i = 0; i < args.length; i++) {
    res += args[i];
  }
  return res;
}

function curriedJoin(...initialArgs) {
  let sums = sum.call(null, ...initialArgs);

  const curried = (...args) => {
    sums += sum.call(null, ...args);
    return curried;
  };

  curried.valueOf = () => sums;

  return curried;
}

const result = curriedJoin(1, 2)(2, 2)(12)(3)(1, 2);
console.log(+result);
```
