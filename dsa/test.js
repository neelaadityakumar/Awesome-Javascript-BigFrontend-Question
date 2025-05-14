const count = (() => {
  let num = 0;
  const func = () => {
    return ++num;
  };
  func.reset = () => {
    num = 0;
  };
  return func;
})();

console.log(count());
console.log(count());
console.log(count());
count.reset();
console.log(count());
