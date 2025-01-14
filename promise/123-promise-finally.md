<h1>123. implement Promise.prototype.finally()
</h1>

<br/>Promise.prototype.finally() could be used to run a callback when a promise is settled(either fulfilled or rejected).

Notice that the callback passed finally() doesn't receive any argument, meaning it doesn't modify the value in the promise chain (care for rejection).

<br/>

```javascript
function myFinally(promise, onFinally) {
  return promise
    .then((val) => {
      return Promise.resolve(onFinally()).then(() => val);
    })
    .catch((reason) => {
      return Promise.resolve(onFinally()).then(() => Promise.reject(reason));
    });
}

//https://bigfrontend.dev/problem/implement-Promise-prototype-finally
```
