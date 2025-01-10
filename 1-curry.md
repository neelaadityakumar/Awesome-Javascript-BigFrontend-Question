```javascript
function curry(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...missingArgs) => {
      return curried(...args, ...missingArgs);
    };
  }
  return curried;
}

function curry_2(fn) {
  let totalArgs = [];
  function curried(...args) {
    totalArgs = totalArgs.concat(args);

    if (totalArgs.length >= fn.length) {
      const result = fn(...totalArgs);
      totalArgs = [];
      return result;
    }
    return curried;
  }
  return curried;
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);
console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(1)(2, 3)); // '1_2_3'
console.log(curriedJoin(1, 2)(3)); // '1_2_3'

//https://bigfrontend.dev/problem/implement-curry
```
