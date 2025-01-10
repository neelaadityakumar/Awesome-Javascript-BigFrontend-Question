```javascript
const leftChild = (index) => index * 2;
const rightChild = (index) => index * 2 + 1;
const parent = (index) => Math.floor(index / 2);
class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.compare = (a, b) => compare(a, b) > 0; // we just compare if a > b
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[0];
  }

  add(element) {
    this.heap.push(element);
    if (this.heap.length > 1) {
      this.moveUp(this.heap.length - 1);
    }
  }
  moveUp(index) {
    if (index === 0) {
      return;
    }
    const parentIdx = parent(index);
    if (this.compare(this.heap[parentIdx], this.heap[index])) {
      this.swap(parentIdx, index);
      this.moveUp(parentIdx);
    }
  }
  poll() {
    const root = this.heap.shift();
    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();
    this.heapify(0);
    return root;
  }

  heapify(index) {
    const childIdx = this.getChildIdx(index); // child index with which we need to swap
    if (index !== childIdx) {
      this.swap(index, childIdx);
      this.heapify(childIdx);
    }
  }
  getChildIdx(index) {
    let left = leftChild(index);
    let right = rightChild(index);
    if (
      left < this.heap.length &&
      this.compare(this.heap[index], this.heap[left])
    ) {
      index = left;
    }
    if (
      right < this.heap.length &&
      this.compare(this.heap[index], this.heap[right])
    ) {
      index = right;
    }
    return index;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
```
