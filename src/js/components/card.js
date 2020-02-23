// Класс карточки новости
import { getCustomDate } from '../utils/utils';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
export default class Card {
  constructor(card) {
    this.element = this._create(card);
  }

  _create(card) {
    const newsCard = document.querySelector('#card-container').content;
    const image = newsCard.querySelector('.card__picture');
    image.src = card.urlToImage;
    image.setAttribute('alt', `${card.title}`);
    newsCard.querySelector('.card').href = card.url;
    newsCard.querySelector('.card__date').textContent = getCustomDate(card.publishedAt);
    newsCard.querySelector('.card__title').textContent = card.title;
    newsCard.querySelector('.card__text').textContent = card.description;
    newsCard.querySelector('.card__source').textContent = card.source.name;
    return newsCard.cloneNode(true);
  }
}
