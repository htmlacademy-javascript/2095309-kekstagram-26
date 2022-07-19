import {createHtmlImages} from './images.js';              //отрисовка фото в ДОМ
import {initFormEdit} from  './form-edit.js';
import {initImageEdit} from  './img-tools.js';
import {showAlert, debounce} from  './util.js';            //плашка с ошибкой
import {getData} from  './api.js';
import {initFilters} from  './filtering.js';

const RERENDER_DELAY = 500;

//асинхронная функция для отрисовки фото, а потом появление фильтров
const screen = async (offers) => {
  const response = await createHtmlImages(offers);
  if (response.ok) {
    initFilters(offers, debounce(createHtmlImages,RERENDER_DELAY));
  }
};

getData((offers) => {                //получение данных с сервера и отрисовка экрана
  screen(offers);
},showAlert);

initFormEdit();                     //инициализируем форму для загрузки и редактирования фото
initImageEdit();                   //создаем функционал для редактирования фото

