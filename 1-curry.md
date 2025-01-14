<h1>1.implement curry()</h1>
<br />

Currying is a useful technique used in JavaScript applications.
<br />

Please implement a curry() function, which accepts a function and return a
curried one.
<br />

Here is an example

```js
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2, 3) // '1_2_3'
curriedJoin(1, 2)(3) // '1_2_3'
more to read
```

https://javascript.info/currying-partials

https://lodash.com/docs/4.17.15#curry

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
