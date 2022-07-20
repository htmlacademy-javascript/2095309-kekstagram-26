import {getRandomInt} from  './util.js';

const MAX = 10;            //количество случайных фото

//создаем обаботчики на фильтр
const filterDiscussedButton = document.querySelector('#filter-discussed');    //обсуждаемые
const filterRandomButton = document.querySelector('#filter-random');          //случайные
const filterDefaultButton = document.querySelector('#filter-default');        //по умолчанию

//функция для сортировки по уменьшению комментов
const sortDesc = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const initFilters = function (photos, cb) {

  document.querySelector('.img-filters--inactive').classList.remove('img-filters--inactive');
  const onFilterClick = function (evt, drawPhoto, sortingFunction) {
    const resultingArray = sortingFunction();
    drawPhoto(resultingArray);
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');  //снимаем выделение у предыдущего фильтра
    evt.target.classList.add('img-filters__button--active');
  };
  //обработчик обсуждаемых
  filterDiscussedButton.addEventListener('click', (evt) => onFilterClick(evt, cb, () => photos.slice().sort(sortDesc)));

  //функция возвращает MAX случайных элементов массива
  const sortRandomly = function (elements) {
    const lengthPhotos = elements.length - 1;
    const arr =[];
    while (arr.length < MAX) {
      const randomNumber = getRandomInt(0, lengthPhotos);
      if (!arr.includes(randomNumber)) {
        arr.push(randomNumber);
      }
    }
    const resultingArray = elements.filter((item, index) => arr.includes(index));
    return resultingArray;
  };
  //обработчик случайных
  filterRandomButton.addEventListener('click', (evt) => onFilterClick(evt, cb, () => sortRandomly(photos)));

  //обработчик по умолчанию
  filterDefaultButton.addEventListener('click', (evt) => onFilterClick(evt, cb, () => photos));

};

export {initFilters};
