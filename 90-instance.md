<h1>title</h1>

<br/>
<br/>

```javascript
/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */
function myInstanceOf(obj, target) {
  // your code here
  if (obj === null || typeof obj !== "object") return false;
  while (obj) {
    if (obj.__proto__ === target.prototype) return true;
    obj = obj.__proto__;
  }
  return false;
}

//https://bigfrontend.dev/problem/write-your-own-instanceof
```
