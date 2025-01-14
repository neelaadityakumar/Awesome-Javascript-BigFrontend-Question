<h1>33. implement `Promise.allSettled()`
</h1>

<br/>
The Promise.allSettled() method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

from MDN
Different from Promise.all() which rejects right away once an error occurs, Promise.allSettled() waits for all promises to settle.

Now can you implement your own allSettled() ?

note

Do not use Promise.allSettled() directly, it helps nothing.

<br/>

```javascript
function allSettled(promises) {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  const results = [];
  let completed = 0;
  return new Promise((resolve) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    }
  });
}

//https://bigfrontend.dev/problem/implement-Promise-allSettled
```
