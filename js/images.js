import {createPhotos} from './data.js';

//блок, в который будем вставлять миниатюры
const blokPictures = document.querySelector('.pictures');

//шаблон миниатюры
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//получили массив миниатюр
const images = createPhotos();

//фрагмент для создания элементов-миниатюр
const imagesListFragment = document.createDocumentFragment();

images.forEach((image) => {
//на основе шаблона создаем элемент ДОМ
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureTemplate.querySelector('.picture__img').src = image.url;
  pictureTemplate.querySelector('.picture__likes').textContent = image.likes;
  pictureTemplate.querySelector('.picture__comments').textContent = image.comments.length;
  imagesListFragment.appendChild(pictureElement);
});

blokPictures.appendChild(imagesListFragment);                //вставляем в документ
