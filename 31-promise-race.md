<h1>title</h1>

<br/>
<br/>

```javascript
function race(funcs) {
  return function (cb) {
    let handled = false;
    funcs.forEach((func) => {
      func((e, v) => {
        if (!handled) {
          handled = true;
          cb(e, v);
        }
      });
    });
  };
}
```
