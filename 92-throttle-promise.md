```javascript
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
async function throttlePromises(funcs, max) {
  let start = 0;
  const ret = [];
  while (ret.length < funcs.length) {
    const thunk = funcs.slice(start, start + max);
    let res;
    try {
      res = await Promise.all(thunk.map((func) => func()));
    } catch (ex) {
      throw ex;
    }
    ret.push(...res);
    start += max;
  }
  return ret;
}
//https://bigfrontend.dev/problem/throttle-Promises
```
