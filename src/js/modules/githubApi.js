/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
// Класс, аналогичный NewsApi, но отвечает за взаимодействие с Github. Вместо метода getNews у этого класса метод getCommits

import { GITHUB_URL } from '../constants/constants';
import BaseApi from './BaseApi';

export default class GithubApi extends BaseApi {
  constructor() {
    super(GITHUB_URL, { 'Content-Type': 'application/json' });
  }

  getCommits(username, repository, instruction) {
    if (instruction.before) instruction.before();
    return fetch(`${this._url}/repos/${username}/${repository}/commits`)
      .then(this._getResponseJson)
      .then((commits) => {
        if (instruction.now) instruction.now(commits);
      })
      .catch(this._errorMessage)
      .finally(() => {
        if (instruction.after) instruction.after();
      });
  }
}
