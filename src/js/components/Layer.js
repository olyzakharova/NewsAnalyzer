import BaseComponent from './BaseComponent';

const instancesOfComponent = new Set();

export default class Layer extends BaseComponent {
  constructor(...args) {
    super(...args);
    instancesOfComponent.add(this);
  }

  static closeAllExceptThis(instance) {
    instancesOfComponent.forEach((item) => (item !== instance ? item.close() : item.open()));
  }
}
