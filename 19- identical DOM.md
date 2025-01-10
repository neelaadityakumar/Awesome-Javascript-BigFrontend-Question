```javascript
/**
 * https://bigfrontend.dev/problem/find-corresponding-node-in-two-identical-DOM-tree
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, t_a) => {
  const search = (nodeA, nodeB) => {
    if (!nodeA || !nodeB) return null;
    else if (nodeA == t_a) return nodeB;
    for (let i = 0; i < nodeA.children.length; i++) {
      const child = search(nodeA.children[i], nodeB.children[i]);
      if (child) {
        return child;
      }
    }
  };

  return search(rootA, rootB);
};
```
