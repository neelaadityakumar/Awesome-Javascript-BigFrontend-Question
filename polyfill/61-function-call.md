<h1>61. create your own `Function.prototype.call`
</h1>

<br/>Function.prototype.call is very useful when we want to alter the this of a function.

Can you implement your own myCall, which returns the same result as Function.prototype.call?

For the newest ECMAScript spec, thisArg are not transformed. And not replaced with window in Strict Mode.

Your implementation should follow above spec and do what non Strict Mode does.

Function.prototype.call/apply/bind and Reflect.apply should not be used.
<br/>

```javascript
Function.prototype.mycall = function (thisArg, ...args) {
  let fn = this;
  let obj = Object(thisArg || window); // To handle testcase 'undefined null should be replaced with window '
  //'primitive values 1, `1` should be transformed'
  const symbol = Symbol(); // create unique key
  //unique key to handle testcase 'thisArg should not have property conflict if you add new property to it'
  obj[symbol] = fn; //Create this function on object and assign the function because in function
  //printFullName defnition this should refer to object
  let res = obj[symbol](...args); //Call the function --> see previous step
  delete obj[symbol]; //To handle testcase 'thisArg should not be kept unchanged after the call'
  return res;
};
//https://bigfrontend.dev/problem/create-call-method
```
