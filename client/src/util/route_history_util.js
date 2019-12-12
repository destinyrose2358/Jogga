class Node {
  constructor(newPositions) {
    this.prev = null;
    this.next = null;
    this.positions = newPositions;
  }
}

class History {
  constructor() {
    this.currentNode = new Node([]);
  }

  isEnd() {
    return !this.currentNode.next;
  }

  isStart() {
    return !this.currentNode.prev;
  }

  redo() {
    this.currentNode = this.isEnd() ? this.currentNode : this.currentNode.next;
  }

  undo() {
    this.currentNode = this.isStart() ? this.currentNode : this.currentNode.prev;
  }

  save(newPositions) {
    this.currentNode.next = new Node(newPositions);
    this.currentNode.next.prev = this.currentNode;
    this.currentNode = this.currentNode.next;
  }
}

export default History;