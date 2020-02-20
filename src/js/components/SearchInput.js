/* eslint-disable no-underscore-dangle */
// /* eslint-disable import/no-cycle */
// /* eslint-disable import/named */
// /* eslint-disable eqeqeq */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
// /* eslint-disable max-len */

import SearchFormElement from './SearchFormElement';

export default class SearchInput extends SearchFormElement {
  constructor(...args) {
    super(...args);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getValue() {
    return this._element.value;
  }

  setValue(value) {
    this._element.value = value;
  }
}
