<h1>113. Virtual DOM I
</h1>

<br/>
Suppose you have solved 110. serialize and deserialize binary tree, have you wondered how to do similar task to DOM tree ?

HTML string could be thought as some sort of serialization, the browser parses(deserialize) the HTML → construct the DOM tree.

Besides XML base, we could try JSON for this. If we log the element presentation in React, like below

```jsx
const el = <div>
 <h1> this is </h1>
 <p className="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a>
 </p>
</div>;
console.log(el)
we would get this( ref, key .etc are stripped off)

{
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: ' this is '
        }
      },
      {
        type: 'p',
        props: {
          className: 'paragraph',
          children: [
            ' a ',
            {
              type: 'button',
              props: {
                children: ' button '
              }
            },
            ' from',
            {
              type: 'a',
              props: {
                href: 'https://bfe.dev',
                children: [
                  {
                    type: 'b',
                    props: {
                      children: 'BFE'
                    }
                  },
                  '.dev'
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
```

Clearly this is the same tree structure but only in object literal.

Now you are asked to serialize/deserialize the DOM tree, like what React does.

Note

Functions like event handlers and custom components are beyond the scope of this problem, you can ignore them, just focus on basic HTML tags.

You should support:

TextNode (string) as children
single child and multiple children
camelCased properties.
virtualize() takes in a real DOM tree and create an object literal render() takes in a object literal presentation and recreate a DOM tree.
<br/>

```javascript
function virtualize(element) {
  // virtualize top level element
  // recursively handle the children (childNodes)
  const result = {
    type: element.tagName.toLowerCase(),
    props: {},
  };
  // props (without children)
  for (let attr of element.attributes) {
    const name = attr.name === "class" ? "className" : attr.name;
    result.props[name] = attr.value;
  }
  // children
  const children = [];
  for (let node of element.childNodes) {
    if (node.nodeType === 3) {
      // text node
      children.push(node.textContent);
    } else {
      children.push(virtualize(node));
    }
  }

  result.props.children = children.length === 1 ? children[0] : children;

  return result;
}
/**
 * @param {object} valid JSON presentation
 * @return {HTMLElement}
 */
function render(json) {
  // create the top level emlement
  // recursively append the children
  // textnode
  if (typeof json === "string") {
    return document.createTextNode(json);
  }

  // element
  const {
    type,
    props: { children, ...attrs },
  } = json;
  const element = document.createElement(type);

  for (let [attr, value] of Object.entries(attrs)) {
    element[attr] = value;
  }

  const childrenArr = Array.isArray(children) ? children : [children];

  for (let child of childrenArr) {
    element.append(render(child));
  }

  return element;
}
//https://bigfrontend.dev/problem/Virtual-DOM-I
```
