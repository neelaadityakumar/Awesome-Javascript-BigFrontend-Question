<h1>29. implement async helper - `sequence()`
</h1>

<br/>
This problem is similar to 11. what is Composition? create a pipe().

You are asked to implement an async function helper, sequence() which chains up async functions, like what pipe() does.

All async functions have following interface

```js
type Callback = (error: Error, data: any) => void;
type AsyncFunc = (callback: Callback, data: any) => void;
```

Your sequence() should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.

Suppose we have an async func which just multiple a number by 2

```js

const asyncTimes2 = (callback, num) => {
   setTimeout(() => callback(null, num * 2), 100)
}
Your sequence() should be able to accomplish this

const asyncTimes4 = sequence(
  [
    asyncTimes2,
    asyncTimes2
  ]
)
asyncTimes4((error, data) => {
   console.log(data) // 4
}, 1)

```

Once an error occurs, it should trigger the last callback without triggering the uncalled functions.

Follow up

Can you solve it with and without Promise?
<br/>

```javascript
function promisify(func, input) {
  return new Promise((resolve, reject) => {
    func((err, data) => {
      if (!err) resolve(data);
      reject(err);
    }, input);
  });
}
function sequence(funcs) {
  return async function (callback, initData) {
    let ret = initData;
    try {
      for (let func of funcs) {
        ret = await promisify(func, ret);
      }
    } catch (ex) {
      callback(ex, ret);
    }
    callback(undefined, ret);
  };
}
//https://bigfrontend.dev/problem/implement-async-helper-sequence
//
function sequence(funcs) {
  return function (callback, value) {
    function execute(idx, val) {
      if (idx === funcs.length) return callback(undefined, val);
      funcs[idx](function (error, data) {
        if (error) return callback(error);
        return execute(++idx, data);
      }, val);
    }
    execute(0, value);
  };
}
```
