/* eslint-disable import/named */
import '../../vendor/normalize.css';
import '../../../node_modules/swiper/css/swiper.min.css';
import './style.css';

import Swiper from 'swiper';
import { GITHUB_NAME, GITHUB_REPOSITORIES } from '../../js/constants/constants';
import CardList from '../../js/components/CardLists';
import CommitCard from '../../js/components/CommitCard';
import Layer from '../../js/components/Layer';
import GithubApi from '../../js/modules/GithubApi';

const githubApiField = new GithubApi();
const cardList = new Layer(document.querySelector('.commits'));
const slider = new CardList(document.querySelector('.swiper-wrapper'));
const mySwiper = new Swiper('.swiper-container', {
  updateOnWindowResize: true,
  slidesPerView: 3,
  spaceBetween: 10,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2,
    },
    1023: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
const instruction = {
  before: () => cardList.close(),
  now: (commits) => commits.forEach((item) => slider.addCard(new CommitCard(item))),
  after: () => {
    if (!slider.isEmpty()) {
      mySwiper.update();
      cardList.open();
    }
  },
};

githubApiField.getCommits(GITHUB_NAME, GITHUB_REPOSITORIES, instruction);
