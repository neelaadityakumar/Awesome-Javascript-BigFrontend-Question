<h1>67. create your own Promise
</h1>

<br/>Promise is widely used nowadays, hard to think how we handled Callback Hell in the old times.

Can you implement a MyPromise Class by yourself?

At least it should match following requirements

new promise: new MyPromise((resolve, reject) => {})
chaining : MyPromise.prototype.then() then handlers should be called asynchronously
rejection handler: MyPromise.prototype.catch()
static methods: MyPromise.resolve(), MyPromise.reject().
This is a challenging problem. Recommend you read about Promise thoroughly first.
<br/>

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(value) {
    if (this.state !== "pending") return;

    this.state = "fulfilled";
    this.result = value;

    queueMicrotask(() => {
      if (this.onFulfilled === undefined) return;

      try {
        const returnValue = this.onFulfilled(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  _reject(error) {
    if (this.state !== "pending") return;

    this.state = "rejected";
    this.result = error;

    queueMicrotask(() => {
      if (this.onRejected === undefined) return;

      try {
        const returnValue = this.onRejected(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  then(onFulfilled, onRejected) {
    // Register consuming functions.
    const isOnFulfilledFunction = typeof onFulfilled === "function";
    this.onFulfilled = isOnFulfilledFunction ? onFulfilled : (value) => value;

    const isOnRejectedFunction = typeof onRejected === "function";
    this.onRejected = isOnRejectedFunction
      ? onRejected
      : (error) => {
          throw error;
        };

    return new MyPromise((resolve, reject) => {
      // Register `resolve` and `reject`, so that we can
      // resolve or reject this promise in `_resolve`
      // or `_reject`.
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    const isValuePromise = value instanceof MyPromise;

    if (isValuePromise) {
      return value;
    }

    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }
}
```
