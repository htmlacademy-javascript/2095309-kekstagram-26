
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

const ELEMENT_COUNT = 25;

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME_COMMENT = [
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
const createComment = function (idx) {
  return {
    id: idx,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME_COMMENT),
  };
};

const COMMENTS =[];
//функция для создания массива всех возможных объектов-комментариев
const makeArrayComments = function () {
  for (let i = 0; i <= MESSAGE.length - 1; i++) {
    COMMENTS.push(createComment(i));
  }
};

//Функция создает массив комментариев для конкретного фото
const makeCommentsForPhoto = function () {
  const COMMENT_PHOTO = [];
  const COUNT_COMMENT = getRandomInt(1, 2);   // у каждой фото 1 или 2 коммента
  for (let i = 0; i < COUNT_COMMENT; i++) {
    COMMENT_PHOTO.push(getRandomArrayElement(COMMENTS));
  }
  return COMMENT_PHOTO;
};

//функция для создания объекта-описание фото
const createDescriptionPhoto = function (idx) {
  return {
    id: idx,
    url: `photos/${idx}.jpg`,
    description: `Описание ${idx}`,
    likes: getRandomInt(15, 200),
    comments: makeCommentsForPhoto(),
  };
};

const PHOTOS =[];
//функция для создания объектов - описаний фото
const makeArrayPhotos = function () {
  for (let i = 1; i <= ELEMENT_COUNT; i++) {
    PHOTOS.push(createDescriptionPhoto(i));
  }
};

makeArrayComments();  //создали массив всех возможных комментов
makeArrayPhotos();  //создали все описания фото. Объекты содержатся в массиве PHOTOS

