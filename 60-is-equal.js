function isEqual(a, b, map = new Map()) {
  // your code here
  if (a === b) return true;
  if (map.has(a) || map.has(b)) return true;
  map.set(a, b);
  if (typeof a === "object" && typeof b === "object") {
    const a_keys = Object.keys(a);
    const b_keys = Object.keys(b);
    if (a_keys.length !== b_keys.length) return false;
    for (let i = 0; i < a_keys.length; i++) {
      if (!isEqual(a[a_keys[i]], b[b_keys[i]], map)) return false;
    }
    return true;
  }
  return false;
}
//https://bigfrontend.dev/problem/implement-deep-equal-isEqual
