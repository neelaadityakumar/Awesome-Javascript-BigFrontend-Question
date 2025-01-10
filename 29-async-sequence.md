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
