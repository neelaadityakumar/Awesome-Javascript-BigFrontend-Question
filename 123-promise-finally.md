<h1>title</h1>

<br/>
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
