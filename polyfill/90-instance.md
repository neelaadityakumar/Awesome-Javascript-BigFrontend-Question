<h1>90. write your own `instanceof`
</h1>

<br/>Do you know how instanceOf works ?

If so, please write you own myInstanceOf().

```js
class A {}
class B extends A {}
const b = new B();
myInstanceOf(b, B); // true
myInstanceOf(b, A); // true
myInstanceOf(b, Object); // true
function C() {}
myInstanceOf(b, C); // false
C.prototype = B.prototype;
myInstanceOf(b, C); // true
C.prototype = {};
myInstanceOf(b, C); // false
```

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
