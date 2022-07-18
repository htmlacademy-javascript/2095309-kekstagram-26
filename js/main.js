import {createHtmlImages} from './images.js';              //отрисовка фото в ДОМ
import {initFormEdit} from  './formEdit.js';
import {initImageEdit} from  './imgTools.js';
import {showAlert, debounce} from  './util.js';            //плашка с ошибкой
import {getData} from  './api.js';
import {initFilters} from  './filtering.js';

const RERENDER_DELAY = 500;

getData((offers) => {
  createHtmlImages(offers);
  initFilters(offers, debounce(createHtmlImages,RERENDER_DELAY));
},showAlert);                         //загружаем фото с сервера

initFormEdit();                     //инициализируем форму для загрузки и редактирования фото
initImageEdit();                   //создаем функционал для редактирования фото
