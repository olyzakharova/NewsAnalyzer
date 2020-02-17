/* eslint-disable no-underscore-dangle */
import BaseComponent from './BaseComponent';

export default class SearchFormElement extends BaseComponent {
  enable() {
    this._element.removeAttribute('disabled');
  }

  disable() {
    this._element.setAttribute('disabled', true);
  }
}
