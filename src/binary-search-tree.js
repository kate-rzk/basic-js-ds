const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {  
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.treeRoot) {      
      this.treeRoot = newNode;
      return;    
    }
    let current = this.treeRoot;    
    while (current) {
      if (data < current.data) {        
        if (!current.left) {
          current.left = newNode;          
          return;
        }        
        current = current.left;
      } else if (data > current.data) {        
        if (!current.right) {
          current.right = newNode;          
          return;
        }        
        current = current.right;
      } else {        
        return; // No duplicates allowed
      }    
    }
  }

  has(data) {
    let current = this.treeRoot;
    while (current) {      
      if (data === current.data) {
        return true;      
      } else if (data < current.data) {
        current = current.left;      
      } else {
        current = current.right;      
      }
    }    
    return false;
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {      
      if (data === current.data) {
        return current;      
      } else if (data < current.data) {
        current = current.left;      
      } else {
        current = current.right;      
      }
    }    
    return null;
  }

  remove(data) {
    let current = this.treeRoot;
    let parent = null;    
    while (current) {
      if (data === current.data) {        
        if (!current.left && !current.right) { // case 1: no children
          if (current === this.treeRoot) {            
            this.treeRoot = null;
          } else if (current === parent.left) {            
            parent.left = null;
          } else {            
            parent.right = null;
          }        
        } else if (!current.right) { // case 2: only left child
          if (current === this.treeRoot) {            
            this.treeRoot = current.left;
          } else if (current === parent.left) {            
            parent.left = current.left;
          } else {            
            parent.right = current.left;
          }        
        } else if (!current.left) { // case 2: only right child
          if (current === this.treeRoot) {            
            this.treeRoot = current.right;
          } else if (current === parent.left) {            
            parent.left = current.right;
          } else {            
            parent.right = current.right;
          }        
        } else { // case 3: two children
          let successor = current.right;          
          let successorParent = current;
          while (successor.left) {            
            successorParent = successor;
            successor = successor.left;
          }          
          if (successor !== current.right) {
            successorParent.left = successor.right;            
            successor.right = current.right;
          }          
          if (current === this.treeRoot) {
            this.treeRoot = successor;          
          } else if (current === parent.left) {
            parent.left = successor;          
          } else {
            parent.right = successor;          
          }
          successor.left = current.left;        
        }
        return;      
      } else if (data < current.data) {
        parent = current;        
        current = current.left;
      } else {        
        parent = current;
        current = current.right;      
      }
    }  
  }

  min() {
    let current = this.treeRoot;    
    while (current && current.left) {
      current = current.left;    
    }
    return current ? current.data : null; 
  }

  max() {
    let current = this.treeRoot;    
    while (current && current.right) {
      current = current.right;    
    }
    return current ? current.data : null; 
  }
}

module.exports = {
  BinarySearchTree
};