/* eslint-disable no-tabs */
/* eslint-disable no-underscore-dangle */
import { NEWS_API_URL } from '../constants/constants';
import BaseApi from './BaseApi';

export default class NewsApi extends BaseApi {
  constructor(apiKey) {
    super(NEWS_API_URL, { 'Content-Type': 'application/json' });
    this._apiKey = apiKey;
  }

  getNews(keyword, from, to, size, instruction) {
    if (instruction.before) instruction.before();
    return fetch(`${this._url}/everything?
		q=${keyword}&
		from=${from}&
		to=${to}&
		language=ru
		&pageSize=${size}&
		apiKey=${this._apiKey}`)
      .then(this._getResponseJson)
      .then((news) => {
        if (instruction.now) instruction.now(news);
      })
      .catch(this._errorMessage)
      .finally(() => {
        if (instruction.after) instruction.after();
      });
  }

  getTitlesNews(keyword, from, to, size, instruction) {
    if (instruction.before) instruction.before();
    return fetch(`${this._url}/everything?
  	qInTitle=${keyword}&
  	from=${from}&
  	to=${to}&
  	language=ru
  	&pageSize=${size}&
  	apiKey=${this._apiKey}`)
      .then(this._getResponseJson)
      .then((news) => {
        if (instruction.now) instruction.now(news);
      })
      .catch(this._errorMessage)
      .finally(() => {
        if (instruction.after) instruction.after();
      });
  }
}
