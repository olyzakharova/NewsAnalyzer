/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */
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
    commitCard.querySelector('.slider__commit-date').textContent = getCustomDate(commit.commit.author.date);
    commitCard.querySelector('.slider__commit-card').href = commit.html_url;
    // commitCard.querySelector('.slider__commit-image').src = commit.author.avatar_url;
    // так как коммиты делались иногад с рабочего ноутбука с другим гитовым акком - пришлось сделать вот  так(либо лить коммиты с другого репозитория)
    commitCard.querySelector('.slider__commit-image').src = 'https://sun1-94.userapi.com/4DAQB-XrYwvSqpGeDGZIy-7n47oQZpUI3eI6Pw/6dq3kulEzfw.jpg';
    commitCard.querySelector('.slider__commit-image').alt = commit.commit.author.name;

    commitCard.querySelector('.slider__commit-email').textContent = commit.commit.author.email;
    commitCard.querySelector('.slider__commit-text').textContent = commit.commit.message;
    commitCard.querySelector('.slider__commit-name').textContent = commit.commit.author.name;

    return commitCard.cloneNode(true);
  }
}
