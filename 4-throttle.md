<h1>title</h1>

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
