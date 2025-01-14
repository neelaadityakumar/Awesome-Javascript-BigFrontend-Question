<h1>34. implement `Promise.any()`
</h1>

<br/>
from MDN

Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfils, returns a single promise that resolves with the value from that promise

Can you implement a any() to work the same as Promise.any()?

note

AggregateError is not supported in Chrome yet, but you can still use it in your code since we will add the Class into your code. Do something like following:

```js
new AggregateError("No Promise in Promise.any was resolved", errors);
```

<br/>

```javascript
function any(promises) {
  // your code here
  if (!promises.length) throw new AggregateError("No Promise passed");

  return new Promise((resolve, reject) => {
    let settledCount = 0,
      errors = [];
    promises.forEach((promise, index) =>
      promise
        .then((data) => resolve(data))
        .catch((err) => {
          errors[index] = err;
          if (++settledCount === promises.length)
            reject(
              new AggregateError(
                "No Promise in Promise.any was resolved",
                errors
              )
            );
        })
    );
  });
}
//https://bigfrontend.dev/problem/implement-Promise-any
```
