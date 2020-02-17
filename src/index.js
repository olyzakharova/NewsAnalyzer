/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import './style.css';

import { millisecondsOfDay } from './js/utils/utils';
import { NEWS_API_KEY, NEWS_COUNT, STEP_SHOW } from './js/constants/constants';
import NewsApi from './js/modules/NewsApi';
import Card from './js/components/Card';
import CardList from './js/components/CardLists';
import Layer from './js/components/Layer';
import SearchFormElement from './js/components/SearchFormElement';
import SearchInput from './js/components/SearchInput';
import BaseComponent from './js/components/BaseComponent';
import DataStorage from './js/modules/DataStorage';

const cardList = new Layer(document.querySelector('.results'));
const preloader = new Layer(document.querySelector('#preloader-search'));
const notFoundBlock = new Layer(document.querySelector('#preloader-notfound'));
const errorMessage = new BaseComponent(document.querySelector('.search__error'));
const container = new CardList(document.querySelector('.results__container'));
const api = new NewsApi(NEWS_API_KEY);
const dataStorage = new DataStorage([]);
const today = new Date(Date.now()).toISOString().replace(/^(.+)T(.+)/, '$1');
const weekAgo = new Date(Date.now() - 6 * millisecondsOfDay).toISOString().replace(/^(.+)T(.+)/, '$1');

function validate() {
  if (!this.value) {
    errorMessage.open();
    buttonSearch.getElement().classList.add('search__button-disabled');
  } else {
    errorMessage.close();
    buttonSearch.getElement().classList.remove('search__button-disabled');
  }
}

function searchNews(event) {
  event.preventDefault();
  if (searchInput.getValue()) {
    container.removeChilds();
    localStorage.clear();
    api.getNews(searchInput.getValue(), weekAgo, today, NEWS_COUNT, instruction);
  } else errorMessage.open();
}

function showMore() {
  const data = dataStorage.cutSomeElements(STEP_SHOW);
  data.length < STEP_SHOW || dataStorage.isEmpty() ? buttonShowMore.close()
    : buttonShowMore.open();
  data.forEach((item) => container.addCard(new Card(item)));
}
const searchInput = new SearchInput(document.querySelector('.search__form-input'), { input: validate });
const buttonSearch = new SearchFormElement(document.querySelector('.search__button'), { click: searchNews });
const buttonShowMore = new BaseComponent(document.querySelector('.results__button'), { click: showMore });
const instruction = {
  before: () => {
    Layer.closeAllExceptThis(preloader);
    buttonSearch.disable();
    searchInput.disable();
  },
  now: (news) => {
    localStorage.setItem('news', JSON.stringify(news));
    localStorage.setItem('keyword', searchInput.getValue().trim());
    dataStorage.updateData(news.articles);
    dataStorage.sortByData();
  },
  after: () => {
    buttonSearch.enable();
    searchInput.enable();
    if (dataStorage.isEmpty()) {
      localStorage.clear();
      Layer.closeAllExceptThis(notFoundBlock);
    } else {
      showMore();
      Layer.closeAllExceptThis(cardList);
    }
  },
};

errorMessage.close();
if (localStorage.getItem('news')) {
  dataStorage.updateData(JSON.parse(localStorage.getItem('news')).articles);
  dataStorage.sortByData();
  searchInput.setValue(localStorage.getItem('keyword'));
  buttonSearch.getElement().classList.remove('search__button-disabled');
  showMore();
  Layer.closeAllExceptThis(cardList);
} else {
  buttonSearch.getElement().classList.add('search__button-disabled');
  Layer.closeAllExceptThis();
}
