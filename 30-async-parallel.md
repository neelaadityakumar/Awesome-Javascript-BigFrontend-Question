<h1>title</h1>

<br/>
<br/>

```javascript
function parallel(funcs) {
  let hasError = false,
    funcIndex = 0,
    result = [];

  return function (finalCallback, input) {
    funcs.forEach((func, idx) => {
      func((err, cbData) => {
        if (hasError) {
          return;
        }
        if (err) {
          hasError = true;
          finalCallback(err, undefined);
          return;
        }
        result[idx] = cbData;
        funcIndex++;
        if (funcIndex === funcs.length) {
          finalCallback(undefined, result);
        }
      });
    });
  };
}
```

```

```
