/* eslint-disable max-len */
// В критериях JavaScript-кода «на пятёрку» есть пункт «создание базового компонента» — BaseComponent. Дело в том, что многие интерфейсные классы принимают обработчики событий, которые добавляют элементам интерфейса. Чтобы эта функциональность не дублировалась, имеет смысл выделить её в отдельный класс. Тогда интерфейсные классы смогут его расширять и получать функциональность автоматически.
// У класса BaseComponent должен быть метод constructor. Он принимает на вход массив обработчиков событий и вызывает приватный метод _setHandlers. Этот метод добавляет обработчики конкретным элементам.

/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
export default class BaseComponent {
  constructor(element, handlers = {}) {
    this._element = element;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    for (const event in handlers) {
      this._element.addEventListener(event, handlers[event]);
    }
  }

  open() {
    // eslint-disable-next-line no-underscore-dangle
    this._element.setAttribute('style', 'display: flex');
  }

  close() {
    this._element.setAttribute('style', 'display: none');
  }

  getElement() {
    return this._element;
  }
}
