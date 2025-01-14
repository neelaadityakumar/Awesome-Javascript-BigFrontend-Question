<h1>title</h1>

<br/>
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
