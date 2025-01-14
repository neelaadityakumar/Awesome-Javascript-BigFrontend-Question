<h1>title</h1>

<br/>
<br/>
```javascript
function throttle(func, wait, option = { leading: true, trailing: true }) {
  var { leading, trailing } = option;
  var lastArgs = null;
  var waiting = null;

const setTimer = () => {
if (lastArgs && trailing) {
func.apply(this, lastArgs);
lastArgs = null;
waiting = setTimeout(setTimer, wait);
} else {
waiting = null;
}
};

return function (...args) {
if (!waiting) {
if (leading) {
func.apply(this, args);
}
waiting = setTimeout(setTimer, wait);
} else {
lastArgs = args;
}
};
}

```

```
