<h1>4. implement basic throttle()
</h1>

Throttling is a common technique used in Web apps, in most cases using lodash solution would be a good choice.

In case you forgot, throttle(func, delay) returns a throttled function, which invokes func at a max frequency no matter how throttled one is called.

Here is an example.

Before throttling we have following series of calls.

─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
After throttling at wait time of 3 dashes, it becomes like this.

─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G
A is triggered right way because not in waiting time. B is swallowed because B, C are in the cooling time from A, and C is called after B.

Could you implement your own version of basic throttle()?

notes

Please follow above spec, the behavior is not exactly the same as lodash.throttle().

Since window.setTimeout and window.clearTimeout are not accurate in browser environment, they are replaced with other implementation when judging your code. They still have the same interfaces, and internally keep track of the timing for testing purpose.

Some code like below is used to test your implementation.

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
<br/>

```javascript
function throttle(func, wait) {
  // Track if we are waiting. Initially, we are not.
  let isWaiting = false;
  // Track arguments of next call
  let nextArgsForExec = null;

  return function (...args) {
    // If we are waiting,
    if (isWaiting) {
      // ...store arguments of next call
      nextArgsForExec = args;
      return;
    }

    // If we are not waiting, execute 'func' with passed arguments
    func.apply(this, args);
    // Prevent future execution of 'func'
    isWaiting = true;

    // After wait time,
    setTimeout(() => {
      // ...allow execution of 'func'
      isWaiting = false;

      // If arguments of next call exists,
      if (nextArgsForExec) {
        // ...execute function throttled and pass next call's arguments
        // to it. Since now we are not waiting, 'func' will be executed
        // and isWaiting will be reset to true.
        func.apply(this, nextArgsForExec);
        // ...reset arguments of next call to null.
        nextArgsForExec = null;
      }
    }, wait);
  };
}

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
console.log(run(["A@0", "B@2", "C@3"]));
//toEqual(['A@0', 'C@3'])

//https://bigfrontend.dev/problem/implement-basic-throttle

//A more simple throttle function
function throttle(func, interval) {
  let isRunning = false;
  return function (...args) {
    if (!isRunning) {
      isRunning = true;
      func.apply(this, args);
      setTimeout(() => {
        isRunning = false;
      }, interval);
    }
  };
}
```

```

```
