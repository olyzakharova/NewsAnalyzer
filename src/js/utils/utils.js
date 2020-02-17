/* eslint-disable eqeqeq */
export const monthNominative = ['январь', 'февраль', 'марть', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
export const monthGenitive = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export const dayOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
export const millisecondsOfDay = 24 * 60 * 60 * 1000;
export const preloader = document.querySelector('#preloader-search');
export const dateTo = new Date();
export const dateFrom = new Date(new Date().getTime() - 6 * millisecondsOfDay);

export function getDatesArray() {
  const array = [];
  const firstDay = new Date(Date.now() - 6 * millisecondsOfDay);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 6; i++) {
    array.push(new Date(firstDay.getTime() + millisecondsOfDay * i));
  }
  return array;
}

export function getActualMonth() {
  const averageMonth = getDatesArray();
  return monthNominative[averageMonth[Math.floor(averageMonth.length / 2)].getMonth()];
}

function getMonthStroke(number) {
  return monthGenitive[number];
}

export function getCustomDate(string) {
  const date = new Date(string);
  return `${date.getDate()} ${getMonthStroke(date.getMonth())}, ${date.getFullYear()}`;
}

export function getAllEntriesStroke(text, word) {
  return text.match(new RegExp(`${word}`, 'gi'));
}

export function loadingProcess(isLoading) {
  if (isLoading == true) {
    preloader.style.display = 'block';
  } else {
    preloader.style.display = 'none';
  }
}
