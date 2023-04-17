const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {    
    this.root = null;
  }
  root() {
    this.root;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.root) {      this.root = newNode;
      return;    }
    let current = this.root;    while (current) {
      if (data < current.data) {        if (!current.left) {
          current.left = newNode;          return;
        }        current = current.left;
      } else if (data > current.data) {        if (!current.right) {
          current.right = newNode;          return;
        }        current = current.right;
      } else {        return; // No duplicates allowed
      }    }
  }

  has(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {        return true;
      } else if (data < current.data) {        current = current.left;
      } else {        current = current.right;
      }    }
    return false; 
  }

  find(data) {
    let current = this.root;    while (current) {
      if (data === current.data) {        return current;
      } else if (data < current.data) {        current = current.left;
      } else {        current = current.right;
      }    }
    return null;
  }

  remove(data) {
    
    let current = this.root;    let parent = null;
    while (current) {      if (data === current.data) {
        if (!current.left && !current.right) { 
                  if (current === this.root) {
            this.root = null;          } else if (current === parent.left) {
            parent.left = null;          } else {
            parent.right = null;          }
        } else if (!current.right) { // case 2: only left child          
          if (current === this.root) {
            this.root = current.left;          } else if (current === parent.left) {
            parent.left = current.left;          } else {
            parent.right = current.left;          }
        } else if (!current.left) { // case 2: only right child          
          if (current === this.root) {
            this.root = current.right;          } else if (current === parent.left) {
            parent.left = current.right;          } else {
            parent.right = current.right;          }
        } else { // case 3: two children         
           let successor = current.right;
          let successorParent = current;          while (successor.left) {
            successorParent = successor;            successor = successor.left;
          }          if (successor !== current.right) {
            successorParent.left = successor.right;            successor.right = current.right;
          }          if (current === this.root) {
            this.root = successor;          } else if (current === parent.left) {
            parent.left = successor;          } else {
            parent.right = successor;          }
          successor.left = current.left;        }
        return;
      } else if (data < current.data) {        parent = current;
        current = current.left;
      } else {        parent = current;
        current = current.right;      }
    }
  }

  min() {
    let current = this.root;    while (current && current.left) {
      current = current.left;    }
    return current ? current.data : null; 
  }

  max() {
    let current = this.root;
    while (current && current.right) {      current = current.right;
    }    return current ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree
};