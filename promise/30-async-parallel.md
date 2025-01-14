<h1>30. implement async helper - `parallel()`
</h1>

<br/>
This problem is related to 29. implement async helper - sequence().

You are asked to implement an async function helper, parallel() which works like Promise.all(). Different from sequence(), the async function doesn't wait for each other, rather they are all triggered together.

All async functions have following interface

```js
type Callback = (error: Error, data: any) => void;
type AsyncFunc = (callback: Callback, data: any) => void;
```

Your parallel() should accept AsyncFunc array, and return a new function which triggers its own callback when all async functions are done or an error occurs.

Suppose we have an 3 async functions

```js
const async1 = (callback) => {
   callback(undefined, 1)
}
const async2 = (callback) => {
   callback(undefined, 2)
}
const async3 = (callback) => {
   callback(undefined, 3)
}
Your parallel() should be able to accomplish this

const all = parallel(
  [
    async1,
    async2,
    async3
  ]
)
all((error, data) => {
   console.log(data) // [1, 2, 3]
}, 1)

```

When error occurs, only first error is passed down to the last. Later errors or data are ignored.

<br/>

```javascript
function parallel(funcs) {
  let hasError = false,
    funcIndex = 0,
    result = [];

  return function (finalCallback, input) {
    funcs.forEach((func, idx) => {
      func((err, cbData) => {
        if (hasError) {
          return;
        }
        if (err) {
          hasError = true;
          finalCallback(err, undefined);
          return;
        }
        result[idx] = cbData;
        funcIndex++;
        if (funcIndex === funcs.length) {
          finalCallback(undefined, result);
        }
      });
    });
  };
}
```

```

```
