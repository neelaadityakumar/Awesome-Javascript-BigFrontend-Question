<h1>19. find corresponding node in two identical DOM tree
</h1>

<br/>Given two same DOM tree A, B, and an Element a in A, find the corresponding Element b in B.

By corresponding, we mean a and b have the same relative position to their DOM tree root.

follow up

This could be a problem on general Tree structure with only children.

Could you solve it recursively and iteratively?

Could you solve this problem with special DOM api for better performance?

What are the time cost for each solution?
<br/>

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
