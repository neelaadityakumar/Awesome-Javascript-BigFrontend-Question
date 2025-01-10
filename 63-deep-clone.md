```javascript
function cloneDeep(obj, map = new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  //map for cycle detection

  if (map.has(obj)) {
    return map.get(obj);
  }

  const output = Array.isArray(obj) ? [] : {};
  map.set(obj, output);
  //symbol keys + regular keys
  const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];

  for (const key of keys) {
    const val = obj[key];
    output[key] = cloneDeep(val, map);
  }

  return output;
}
//https://bigfrontend.dev/problem/create-cloneDeep
```
