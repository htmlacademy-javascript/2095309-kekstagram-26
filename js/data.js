import {getRandomInt} from './util.js';

const COMMENTS_MIN = 1;   // минимальное кол-во комментов
const COMMENTS_MAX = 2;   // максимальное кол-во комментов
const ADDRESS_MIN = 1;   // минимальный номер для адреса картинки
const ADDRESS_MAX = 6;   // максимальный номер для адреса картинки
const LIKE_MIN = 15;   // минимальное кол-во лайков
const LIKE_MAX = 200;   // максимальное кол-во лайков

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Антон',
  'Дарья',
  'Вера',
  'Иван',
  'Сперанца',
  'Святослав'
];

//Случайный элемент из массива
const getRandomArrayElement = function (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
};

//функция для создания объекта-комментария
const createComment = function (id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(ADDRESS_MIN, ADDRESS_MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const comments = [];
//функция для создания массива всех возможных объектов-комментариев
const createComments = function () {
  for (let i = 0; i <= MESSAGES.length - 1; i++) {
    comments.push(createComment(i));
  }
};

//Функция создает массив комментариев для конкретного фото
const makeCommentsForPhoto = function () {
  const photoComments = [];
  const commentsCount = getRandomInt(COMMENTS_MIN, COMMENTS_MAX);
  for (let i = 0; i < commentsCount; i++) {
    photoComments.push(getRandomArrayElement(comments));
  }
  return photoComments;
};

//функция для создания объекта-описание фото
const createPhotoDescription = function (id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание ${id}`,
    likes: getRandomInt(LIKE_MIN, LIKE_MAX),
    comments: makeCommentsForPhoto(),
  };
};

//функция для создания объектов - описаний фото
const createPhotos = function () {
  const ELEMENTS_COUNT = 25;
  const photos = [];
  createComments();  //создали массив всех возможных комментов
  for (let i = 1; i <= ELEMENTS_COUNT; i++) {
    photos.push(createPhotoDescription(i));
  }
  return photos;
};

export {createPhotos};
