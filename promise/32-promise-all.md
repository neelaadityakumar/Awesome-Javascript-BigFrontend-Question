<h1>32. implement `Promise.all()`
</h1>

<br/>
The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises

source - MDN

Could you write your own all() ? which should works the same as Promise.all()

note

Do not use Promise.all() directly, it is not helping

<br/>

```javascript
function all(promises) {
  return new Promise((resolve, reject) => {
    const result = [];

    if (promises.length === 0) {
      resolve(result);
      return;
    }

    let countPending = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        result[index] = value;
        countPending--;
        if (countPending === 0) {
          resolve(result);
        }
      }, reject);
    });
  });
}

//https://bigfrontend.dev/problem/implement-Promise-all
```
