<h1>24. create a Priority Queue in JavaScript
</h1>

<br/>
Priority Queue is a commonly used data structure in algorithm problem. Especially useful for Top K problem with a huge amount of input data, since it could avoid sorting the whole but keep a fixed-length sorted portion of it.

Since there is no built-in Priority Queue in JavaScript, in a real interview, you should tell interview saying that "Suppose we already have a Priority Queue Class I can use", there is no time for you to write a Priority Queue from scratch.

But it is a good coding problem to practice, so please implement a Priority Queue with following interface

```js
class PriorityQueue {
  // compare is a function defines the priority, which is the order
  // the elements closer to first element is sooner to be removed.
  constructor(compare) {

  }

  // add a new element to the queue
  // you need to put it in the right order
  add(element) {
  }
  // remove the head element and return
  poll() {

  }
  // get the head element
  peek() {
  }
  // get the amount of items in the queue
  size() {
  }
}
Here is an example to make it clearer

const pq = new PriorityQueue((a, b) => a - b)
// (a, b) => a - b means
// smaller numbers are closer to index:0
// which means smaller number are to be removed sooner
pq.add(5)
// now 5 is the only element
pq.add(2)
// 2 added
pq.add(1)
// 1 added
pq.peek()
// since smaller number are sooner to be removed
// so this gives us 1
pq.poll()
// 1
// 1 is removed, 2 and 5 are left
pq.peek()
// 2 is the smallest now, this returns 2
pq.poll()
// 2
// 2 is removed, only 5 is left
```

<br/>

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
