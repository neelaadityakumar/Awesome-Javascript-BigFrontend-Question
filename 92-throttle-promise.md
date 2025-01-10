```javascript
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
//https://bigfrontend.dev/problem/throttle-Promises

async function throttlePromises(funcs, max) {
  const results = [];
  let completed = 0,
    total = funcs.length;
  while (completed < total) {
    const partialResults = await Promise.all(
      funcs.slice(completed, completed + max).map((func) => func())
    );
    results.push(...partialResults);
    completed += max;
  }
  return results;
}
```
