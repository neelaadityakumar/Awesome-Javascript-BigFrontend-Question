<h1>5. implement throttle() with leading & trailing option
</h1>

<br/>
This is a follow up on 4. implement basic throttle(), please refer to it for detailed explanation.

In this problem, you are asked to implement a enhanced throttle() which accepts third parameter, option: {leading: boolean, trailing: boolean}

leading: whether to invoke right away
trailing: whether to invoke after the delay. 4. implement basic throttle() is the default case with {leading: true, trailing: true}.

Explanation

for the previous example of throttling by 3 dashes

─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
with {leading: true, trailing: true}, we get as below

─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G
with {leading: false, trailing: true}, A and E are swallowed.

─ ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ G
with {leading: true, trailing: false}, only A D E are kept

─ A ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ E
with {leading: false, trailing: false}, of course, nothing happens.

notes

please follow above spec. the behavior is not exactly the same as lodash.throttle()

because window.setTimeout and window.clearTimeout are not accurate in browser environment, they are replaced to other implementation when judging your code. They still have the same interface, and internally keep track of the timing for testing purpose.

Something like below will be used to do the test.

```js
let currentTime = 0;
const run = (input) => {
  currentTime = 0;
  const calls = [];
  const func = (arg) => {
    calls.push(`${arg}@${currentTime}`);
  };
  const throttled = throttle(func, 3);
  input.forEach((call) => {
    const [arg, time] = call.split("@");
    setTimeout(() => throttled(arg), time);
  });
  return calls;
};
expect(run(["A@0", "B@2", "C@3"])).toEqual(["A@0", "C@3"]);
```

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

```
