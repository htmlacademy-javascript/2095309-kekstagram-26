import {getRandomInt} from  './util.js';

//создаем обаботчики на фильтр
const filterDiscussedButton = document.querySelector('#filter-discussed');    //обсуждаемые
const filterRandomButton = document.querySelector('#filter-random');          //случайные
const filterDefaultButton = document.querySelector('#filter-default');        //по умолчанию
const filterButton = document.querySelectorAll('.img-filters__button');       //все фильтры

// функция: убрать класс активности у всех фильтров
const clearActive = function () {
  for (const element of filterButton) {
    element.classList.remove('img-filters__button--active');
  }
};

//функция для сортировки по уменьшению комментов
const sortDesc = (photo1, photo2) => parseFloat(photo2.comments.length) - parseFloat(photo1.comments.length);

const initFilters = function (photos, cb) {
  const onFilterClick = function (cb1, sortingFunction, evt) {
    const resultingArray = sortingFunction();
    cb1(resultingArray);
    clearActive();
    evt.target.classList.add('img-filters__button--active');
  };
  //обработчик обсуждаемых
  filterDiscussedButton.addEventListener('click', (evt) => onFilterClick(cb, () => photos.slice().sort(sortDesc),evt));

  //функция возвращает MAX случайных элементов массива
  const sortRandomly = function (elements) {
    const MAX = 10;
    const lengthPhotos = elements.length - 1;
    const arr =[];
    while (arr.length < MAX) {
      const randomNumber = getRandomInt(0, lengthPhotos);
      if (! arr.includes(randomNumber)) {
        arr.push(randomNumber);
      }
    }
    const resultingArray = elements.filter((item, index) => arr.includes(index));
    return resultingArray;
  };
  //обработчик случайных
  filterRandomButton.addEventListener('click', (evt) => onFilterClick(cb, () => sortRandomly(photos),evt));

  //обработчик по умолчанию
  filterDefaultButton.addEventListener('click', (evt) => onFilterClick(cb, () => photos, evt));

};

export {initFilters};
