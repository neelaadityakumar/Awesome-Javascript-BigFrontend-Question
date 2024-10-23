function curry(func) {
  return function curried(...args) {
    const isArgsEnough =
      args.length >= func.length &&
      args.slice().every((arg) => arg !== curry.placeholder);

    if (isArgsEnough) {
      return func.apply(this, args);
    } else {
      return function (...newArgs) {
        const finalArgs = args
          .map((arg) => (arg === curry.placeholder ? newArgs.shift() : arg))
          .concat(newArgs);
        return curried(...finalArgs);
      };
    }
  };
}

curry.placeholder = Symbol();

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);
const _ = curry.placeholder;
curriedJoin(1, 2, 3); // '1_2_3'
curriedJoin(_, 2)(1, 3); // '1_2_3'
curriedJoin(_, _, _)(1)(_, 3)(2); // '1_2_3'

//https://bigfrontend.dev/problem/implement-curry-with-placeholder
