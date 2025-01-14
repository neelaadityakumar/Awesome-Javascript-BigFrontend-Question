<h1>35. implement `Promise.race()`
</h1>

<br/>
This problem is similar to 31. implement async helper - race(), but with Promise.

The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise. source: MDN

Can you create a race() which works the same as Promise.race()?
<br/>

```javascript
function race(promises) {
  return new Promise((resolve, reject) =>
    promises.forEach((promise) => promise.then(resolve, reject))
  );
}
//https://bigfrontend.dev/problem/implement-Promise-race
```
