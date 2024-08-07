Array.prototype.myMap = function (callback, thisArg) {
  const length = this.length;
  const result = [];

  for (let i = 0; i < length; i++) {
    if (this.hasOwnProperty(i)) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }

  return result;
};
//https://bigfrontend.dev/problem/implement-Array-prototype-map
