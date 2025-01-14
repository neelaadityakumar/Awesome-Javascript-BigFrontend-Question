<h1>title</h1>

<br/>
<br/>

```javascript
/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */
const myNew = (constructor, ...args) => {
  // 1. A new object is created, inheriting from constructor's prototype.
  const that = Object.create(constructor.prototype);
  // your code here var that = Object.create(constructor.prototype);

  // 2. The constructor function is called with the specified arguments,
  //    and with this bound to the newly created object.
  const obj = constructor.apply(that, args);

  // 3. The object (not null, false, 3.1415 or other primitive types) returned by the constructor function becomes the result of the whole new expression.
  //    If the constructor function doesn't explicitly return an object,
  //    the object created in step 1 is used instead (normally constructors don't return a value, but they can choose to do so if they want to override the normal object creation process).

  return obj !== undefined ? obj : that;
};
//https://bigfrontend.dev/problem/create-your-own-new-operator
```
