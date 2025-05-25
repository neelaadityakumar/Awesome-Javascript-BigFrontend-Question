const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result;
  #handlers = [];
  #called = false;

  constructor(executor) {
    try {
      executor(
        (value) => this.#resolve(value),
        (error) => this.#reject(error)
      );
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value) {
    if (this.#called) return;
    this.#called = true;
    if (value instanceof MyPromise) {
      value.then(
        (v) => {
          this.#state = FULFILLED;
          this.#result = v;
          this.#queueHandlers();
        },
        (e) => {
          this.#state = REJECTED;
          this.#result = e;
          this.#queueHandlers();
        }
      );
    } else {
      this.#state = FULFILLED;
      this.#result = value;
      this.#queueHandlers();
    }
  }

  #reject(reason) {
    if (this.#called) return;
    this.#called = true;

    this.#state = REJECTED;
    this.#result = reason;
    this.#queueHandlers();
  }

  #queueHandlers() {
    // This method is called when state becomes FULFILLED, REJECTED,
    // or if .then is called on an already FULFILLED/REJECTED promise.
    // RUNNING state does not trigger handlers on its own.

    const handlersToExecute = this.#handlers;
    this.#handlers = [];

    handlersToExecute.forEach(
      ({ onFulfilled, onRejected, resolveNext, rejectNext }) => {
        const callback = this.#state === FULFILLED ? onFulfilled : onRejected;
        queueMicrotask(() => {
          try {
            const returnValue = callback(this.#result);
            resolveNext(returnValue);
          } catch (error) {
            rejectNext(error);
          }
        });
      }
    );
  }

  then(onFulfilled, onRejected) {
    const wrappedOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    const wrappedOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const nextPromise = new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled: wrappedOnFulfilled,
        onRejected: wrappedOnRejected,
        resolveNext: resolve,
        rejectNext: reject,
      });
    });

    if (this.#state === FULFILLED || this.#state === REJECTED) {
      this.#queueHandlers();
    }
    return nextPromise;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
