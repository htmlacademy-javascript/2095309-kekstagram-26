import {createHtmlImages} from './images.js';     //отрисовка фото в ДОМ
import {initFormEdit} from  './formEdit.js';
import {initImageEdit} from  './imgTools.js';
import {showAlert} from  './util.js';            //плашка с ошибкой
import {getData} from  './api.js';


getData(createHtmlImages,showAlert);      //загружаем фото с сервера

initFormEdit();                     //инициализируем форму для загрузки и редактирования фото
initImageEdit();                   //создаем функционал для редактирования фото


