import Tree from "./tree.js";

function buildArrFromRandomNums() {
  const array = [];

  for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

function printElements(node) {
  console.log(node.data);
}

// Create a BST from an array of random numbers < 100
const tree = new Tree(buildArrFromRandomNums());

tree.prettyPrint();
console.log('The tree is balanced:', tree.isBalanced());

console.log('-----');

console.log('Elements in level-order:');
tree.levelOrder(printElements);
console.log('-----');

console.log('Elements in pre-order:');
tree.preOrder(printElements);
console.log('-----');

console.log('Elements in post-order:');
tree.postOrder(printElements);
console.log('-----');

console.log('Elements in in-order:');
tree.inOrder(printElements);

console.log('-----');
console.log('Unbalancing the tree...');

tree.insert(123);
tree.insert(174);
tree.insert(250);
tree.insert(427);
tree.insert(699);
tree.insert(826);
tree.insert(1050);
tree.insert(4362);
tree.insert(98764);

console.log('-----');
console.log('The tree is balanced:', tree.isBalanced());

console.log('-----');
console.log('Rebalancing the tree...');
tree.rebalance();

console.log('-----');
console.log('The tree is balanced:', tree.isBalanced());

console.log('-----');
tree.prettyPrint();

console.log('-----');

console.log('Elements in level-order:');
tree.levelOrder(printElements);
console.log('-----');

console.log('Elements in pre-order:');
tree.preOrder(printElements);
console.log('-----');

console.log('Elements in post-order:');
tree.postOrder(printElements);
console.log('-----');

console.log('Elements in in-order:');
tree.inOrder(printElements);
