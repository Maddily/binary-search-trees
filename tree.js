import Node from './node.js';

export default class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = null;
    this.buildTree();
  }

  buildTree() {
    this.root = this.arrayToBst(this.array, 0, this.array.length - 1);
  }

  arrayToBst(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);

    const root = new Node(array[mid]);
    root.leftChild = this.arrayToBst(array, start, mid - 1);
    root.rightChild = this.arrayToBst(array, mid + 1, end);

    return root;
  }

  insert(value) {
    this.insertRecursive(this.root, value);
  }

  insertRecursive(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (root.data > value) {
      root.leftChild = this.insertRecursive(root.leftChild, value);
    }

    if (root.data < value) {
      root.rightChild = this.insertRecursive(root.rightChild, value);
    }

    return root;
  }

  deleteItem(value) {
    this.deleteItemRecursive(this.root, value);
  }

  deleteItemRecursive(node, value) {
    if (node && node.data === value) {
      // If the node is childless
      if (!node.leftChild && !node.rightChild) {
        return null;
      }

      // If the node has one child
      if (
        node &&
        ((node.leftChild && !node.rightChild) ||
          (!node.leftChild && node.rightChild))
      ) {
        // If it has a left child
        if (node.leftChild) {
          return node.leftChild;
          // If it has a right child
        } else {
          return node.rightChild;
        }
      }

      // If the node has two children
      if (node && node.leftChild && node.rightChild) {
        // Obtain in-order successor from the right subtree
        const { inOrderSuccessor, inOrderSuccessorParent } =
          this.findInOrderSuccessorAndItsParent(node);

        node.data = inOrderSuccessor.data;
        // If the in-order successor is a leaf node
        if (!inOrderSuccessor.leftChild && !inOrderSuccessor.rightChild) {
          // If the in-order successor is a right child
          if (
            inOrderSuccessorParent.rightChild.data === inOrderSuccessor.data
          ) {
            inOrderSuccessorParent.rightChild = null;
          } else {
            // If the in-order successor is a left child
            inOrderSuccessorParent.leftChild = null;
          }
        } else {
          // If the in-order successor has one child (right)
          // If the in-order successor is a right child
          if (
            inOrderSuccessorParent.rightChild.data === inOrderSuccessor.data
          ) {
            inOrderSuccessorParent.rightChild = inOrderSuccessor.rightChild;
            // If the in-order successor is a left child
          } else {
            inOrderSuccessorParent.leftChild = inOrderSuccessor.rightChild;
          }
        }
        return node;
      }
    }

    if (node && node.data > value) {
      node.leftChild = this.deleteItemRecursive(node.leftChild, value);
    }

    if (node && node.data < value) {
      node.rightChild = this.deleteItemRecursive(node.rightChild, value);
    }

    return node;
  }

  findInOrderSuccessorAndItsParent(node) {
    let inOrderSuccessor = node.rightChild;
    let inOrderSuccessorParent = node;

    while (inOrderSuccessor.leftChild) {
      inOrderSuccessorParent = inOrderSuccessor;
      inOrderSuccessor = inOrderSuccessor.leftChild;
    }

    return { inOrderSuccessor, inOrderSuccessorParent };
  }

  find(value) {
    return this.findRecursive(this.root, value);
  }

  findRecursive(node, value) {
    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.findRecursive(node.leftChild, value);
    } else {
      return this.findRecursive(node.rightChild, value);
    }
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error('A callback function is required as an argument.');
    }

    const queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();

      callback(node);

      if (node.leftChild) queue.push(node.leftChild);
      if (node.rightChild) queue.push(node.rightChild);
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error('A callback function is required as an argument.');
    }

    this.inOrderRecursive(this.root, callback);
  }

  inOrderRecursive(node, callback) {
    if (node === null) return;

    this.inOrderRecursive(node.leftChild, callback);
    callback(node);
    this.inOrderRecursive(node.rightChild, callback);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error('A callback function is required as an argument.');
    }

    this.preOrderRecursive(this.root, callback);
  }

  preOrderRecursive(node, callback) {
    if (node === null) return;

    callback(node);
    this.preOrderRecursive(node.leftChild, callback);
    this.preOrderRecursive(node.rightChild, callback);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error('A callback function is required as an argument.');
    }

    this.postOrderRecursive(this.root, callback);
  }

  postOrderRecursive(node, callback) {
    if (node === null) return;

    this.postOrderRecursive(node.leftChild, callback);
    this.postOrderRecursive(node.rightChild, callback);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;

    const leftSubTreeHeight = this.height(node.leftChild);
    const rightSubTreeHeight = this.height(node.rightChild);

    const height = Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;

    return height;
  }

  depth(node) {
    if (node === null) return -1;

    let depth = 0;
    let current = tree.root;

    while (current) {
      if (current.data === node.data) return depth;

      if (node.data < current.data) {
        current = current.leftChild;
      } else {
        current = current.rightChild;
      }

      depth += 1;
    }
  }

  isBalanced() {
    const balanced = this.isBalancedRecursive(this.root);

    if (balanced !== -1) return true;

    return false;
  }

  isBalancedRecursive(node) {
    if (node === null) return 0;

    const leftSubTreeHeight = this.isBalancedRecursive(node.leftChild);
    if (leftSubTreeHeight === -1) return -1;

    const rightSubTreeHeight = this.isBalancedRecursive(node.rightChild);
    if (rightSubTreeHeight === -1) return -1;

    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1) return -1;

    return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
  }

  rebalance() {
    // Create an array from the tree
    this.array = [];
    this.buildArray(this.root);

    // Build tree
    this.buildTree();
  }

  buildArray(node) {
    if (node === null) return;

    this.buildArray(node.leftChild);
    this.array.push(node.data);
    this.buildArray(node.rightChild);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }
}
