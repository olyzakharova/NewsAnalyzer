/* eslint-disable no-confusing-arrow */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
// eslint-disable-next-line max-len
// Класс, отвечающий за логику работы графиков со статистикой на странице аналитики. Конструктор класса получает объект, содержащий текущее состояние локального браузерного хранилища.

/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import {
  dayOfWeek, monthGenitive, millisecondsOfDay, getAllEntriesStroke,
} from '../utils/utils';

import DataStorage from '../modules/DataStorage';

const storageForTitlesCount = new DataStorage([]);
const dateOfDiagramm = document.querySelector('.analytics__header-date');
const analyticsRequest = document.querySelector('.analytics__header-title');
const weeksAmount = document.getElementById('week-amount');
const titlesAmount = document.getElementById('title-amount');
const request = localStorage.getItem('keyword');
const storageParsed = JSON.parse(localStorage.getItem('news'));

(function setTitle() {
  analyticsRequest.textContent = `Вы спросили: «${request}»`;
}());
(function setAmountTitles() {
  storageForTitlesCount.updateData(storageParsed.articles);
  titlesAmount.textContent = storageForTitlesCount.getData().reduce((prev, article) => getAllEntriesStroke(article.title, request) ? ++prev : prev, 0);
}());

(function setAmountNews() {
  weeksAmount.textContent = storageParsed.totalResults;
}());

class Statistics {
  constructor(searchRequest, data) {
    this.searchRequest = searchRequest;
    this.data = data;
    this.daily();
  }

  daily() {
    const articles = {};

    this.data.articles.forEach((element) => {
      const date = new Date(element.publishedAt.substring(0, 10)).getDate();

      if (date in articles) {
        articles[date]++;
      } else {
        articles[date] = 1;
      }
    });

    this.graph(articles);
  }

  graph(articles) {
    const weekAgo = new Date(new Date().getTime() - 6 * millisecondsOfDay);

    for (let i = 0; i <= 6; i++) {
      const date = new Date(weekAgo.getTime() + (i * millisecondsOfDay));
      const day = date.getDate();
      const weekDay = dayOfWeek[`${date.getDay()}`].toLowerCase();

      document.querySelector(`.day-${i}`).textContent = `${day}, ${weekDay}`;

      if (day in articles) {
        const widthGraph = (articles[`${day}`]);

        document.querySelector(`.chart-${i}`).style.width = `${widthGraph}%`;
        document.querySelector(`.chart-${i}`).textContent = `${articles[`${day}`]}`;
      } else {
        document.querySelector(`.chart-${i}`).style.width = '0';
      }
    }
  }

  setMonth() {
    const dateToFormat = new Date(localStorage.getItem('date'));
    const month = dateToFormat.getMonth();
    const finalMonth = `${monthGenitive[month]}`;
    dateOfDiagramm.textContent = `Дата (${finalMonth})`;
  }
}

const statistics = new Statistics(request, storageParsed);
statistics.setMonth();
