
//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);

  if (min < max) {
    min = Math.ceil(min);       //округление вверх
    max = Math.floor(max);      //округление вниз
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return min;
}

function checkLength(checkline, maxLength) {
  return checkline.length <= maxLength;
}

checkLength('Какая-то строка', 30);

const ELEMENTS_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES_COMMENT = [
  'Антон',
  'Дарья',
  'Вера',
  'Иван',
  'Сперанца',
  'Святослав'
];

const NUMBER_MIN = 1;   // минимальный номер для адреса картинки
const NUMBER_MAX = 6;   // максимальный номер для адреса картинки

//Случайный элемент из массива
const getRandomArrayElement = function (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
};

//функция для создания объекта-комментария
const createComment = function (id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(NUMBER_MIN, NUMBER_MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES_COMMENT),
  };
};

const COMMENTS = [];
//функция для создания массива всех возможных объектов-комментариев
const makeArrayComments = function () {
  for (let i = 0; i <= MESSAGES.length - 1; i++) {
    COMMENTS.push(createComment(i));
  }
};

//Функция создает массив комментариев для конкретного фото
const makeCommentsForPhoto = function () {
  const COMMENTS_PHOTO = [];
  const COMMENTS_COUNT = getRandomInt(1, 2);   // у каждой фото 1 или 2 коммента
  for (let i = 0; i < COMMENTS_COUNT; i++) {
    COMMENTS_PHOTO.push(getRandomArrayElement(COMMENTS));
  }
  return COMMENTS_PHOTO;
};

//функция для создания объекта-описание фото
const createPhotoDescription = function (id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание ${id}`,
    likes: getRandomInt(15, 200),
    comments: makeCommentsForPhoto(),
  };
};

//функция для создания объектов - описаний фото
const createPhotos = function () {
  const PHOTOS = [];
  for (let i = 1; i <= ELEMENTS_COUNT; i++) {
    PHOTOS.push(createPhotoDescription(i));
  }
  return PHOTOS;
};

makeArrayComments();  //создали массив всех возможных комментов
createPhotos();  //создали все описания фото. Объекты содержатся в массиве PHOTOS
