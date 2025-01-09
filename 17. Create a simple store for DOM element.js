class NodeStore {
  cache = {};
  set(node, value) {
    node.__ACCESS_KEY__ = Symbol();
    this.cache[node.__ACCESS_KEY__] = value;
  }

  get(node) {
    return this.cache[node.__ACCESS_KEY__];
  }

  has(node) {
    return !!this.cache[node.__ACCESS_KEY__];
  }
}
