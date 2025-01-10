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
