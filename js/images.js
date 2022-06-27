const createHtmlImages = function (arrayData) {
  //блок, в который будем вставлять миниатюры
  const picturesBlock = document.querySelector('.pictures');

  //шаблон миниатюры
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  //фрагмент для создания элементов-миниатюр
  const imagesListFragment = document.createDocumentFragment();

  arrayData.forEach((image) => {
  //на основе шаблона создаем элемент ДОМ
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureTemplate.querySelector('.picture__img').src = image.url;
    pictureTemplate.querySelector('.picture__likes').textContent = image.likes;
    pictureTemplate.querySelector('.picture__comments').textContent = image.comments.length;
    imagesListFragment.appendChild(pictureElement);
  });

  picturesBlock.appendChild(imagesListFragment);            //вставляем в документ
};

export {createHtmlImages};
