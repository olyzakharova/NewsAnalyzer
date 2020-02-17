// Родительский класс Api

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-promise-reject-errors */
export default class BaseApi {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseJson(result) {
    return result.ok ? result.json()
      : Promise.reject(`${result.statusText}: ${result.status}`);
  }
}
