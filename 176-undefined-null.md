<h1>176. undefined to null
</h1>

<br/>
<br/>

```javascript
function undefinedToNull(arg) {
  if (Array.isArray(arg)) {
    return arg.map(undefinedToNull);
  }

  if (typeof arg !== "object") {
    return arg === undefined ? null : arg;
  }
  for (let key in arg) {
    arg[key] = undefinedToNull(arg[key]);
  }
  return arg;
}
//https://bigfrontend.dev/problem/undefined-to-null
```
