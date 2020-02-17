/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
// Аналогичен компоненту NewsCard только для карточек коммитов на странице «О проекте».

import { getCustomDate } from '../utils/utils';

export default class CommitCard {
  constructor(commit) {
    this.element = this._create(commit);
  }

  _create(commit) {
    const commitCard = document.querySelector('#commit-card').content;
    const image = commitCard.querySelector('.slider__commit-image');
    image.src = commit.author.avatar_url;
    image.setAttribute('alt', `${commit.author.login}`);
    // document.querySelector('#commit-card').setAttribute('onclick', 'location.href = `https://github.com/olyzakharova/NewsAnalyzer/commits`');
    commitCard.querySelector('.slider__commit-date').textContent = getCustomDate(commit.commit.author.date);
    commitCard.querySelector('.slider__commit-name').textContent = commit.author.login;
    commitCard.querySelector('.slider__commit-email').textContent = commit.commit.author.email;
    commitCard.querySelector('.slider__commit-text').textContent = commit.commit.message;
    return commitCard.cloneNode(true);
  }
}
