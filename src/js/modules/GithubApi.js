/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
// Класс, аналогичный NewsApi, но отвечает за взаимодействие с Github. Вместо метода getNews у этого класса метод getCommits

// class GithubApi {
//   constructor(apiUrl, githubKey) {
//     this.apiUrl = apiUrl;
//     this.githubKey = githubKey;
//   }

//   getCommits() {
//     return fetch(`${this.apiUrl}/repos/olyzakharova/NewsAnalyzer/commits`, {
//       headers: {
//         authorization: this.githubKey,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       });
//   }
// }

// export const githubApiAccess = new GithubApi('https://api.github.com', '0970ebe028d825922b9ad9513789034a3f206e69');

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
