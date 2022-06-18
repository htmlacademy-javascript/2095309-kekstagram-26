
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
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
  const NUMBER_MIN = 1;   // минимальный номер для адреса картинки
  const NUMBER_MAX = 6;   // максимальный номер для адреса картинки
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(NUMBER_MIN, NUMBER_MAX)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names),
  };
};

const comments = [];
//функция для создания массива всех возможных объектов-комментариев
const createComments = function () {
  for (let i = 0; i <= messages.length - 1; i++) {
    comments.push(createComment(i));
  }
};

//Функция создает массив комментариев для конкретного фото
const makeCommentsForPhoto = function () {
  const photoComments = [];
  const commentsCount = getRandomInt(1, 2);   // у каждой фото 1 или 2 коммента
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
    likes: getRandomInt(15, 200),
    comments: makeCommentsForPhoto(),
  };
};

//функция для создания объектов - описаний фото
const createPhotos = function () {
  const ELEMENTS_COUNT = 25;
  const photos = [];
  for (let i = 1; i <= ELEMENTS_COUNT; i++) {
    photos.push(createPhotoDescription(i));
  }
  return photos;
};

createComments();  //создали массив всех возможных комментов
createPhotos();  //создали все описания фото. Объекты содержатся в массиве photos

