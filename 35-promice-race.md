<h1>title</h1>

<br/>
<br/>

```javascript
function race(promises) {
  return new Promise((resolve, reject) =>
    promises.forEach((promise) => promise.then(resolve, reject))
  );
}
//https://bigfrontend.dev/problem/implement-Promise-race
```
