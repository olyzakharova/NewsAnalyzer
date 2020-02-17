/* eslint-disable no-underscore-dangle */
export default class CardList {
  constructor(block) {
    this._block = block;
  }

  addCard({ element }) {
    this._block.appendChild(element);
  }

  isEmpty() {
    // eslint-disable-next-line eqeqeq
    return this._block.children.length == 0;
  }

  removeChilds() {
    [...this._block.children].forEach((item) => item.remove());
  }
}
