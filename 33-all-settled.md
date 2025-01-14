<h1>title</h1>

<br/>
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
