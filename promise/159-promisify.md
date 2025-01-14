<h1>title</h1>

<br/>
<br/>

```javascript
function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
}
//https://bigfrontend.dev/problem/promisify
```
