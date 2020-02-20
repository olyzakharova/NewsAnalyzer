/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
// Класс DataStorage предоставляет интерфейс для работы с локальным хранилищем браузера.

export default class DataStorage {
  constructor(data) {
    this._data = data;
  }

  getData() {
    return this._data;
  }

  sortByData() {
    this._data = this._data.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  }

  updateData(data) {
    this._data = data;
  }

  reverseData() {
    this._data = this._data.reverse();
  }

  isEmpty() {
    return this._data.length == 0;
  }

  cutSomeElements(count) {
    return this._data.splice(-count, count).reverse();
  }
}
