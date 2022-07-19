//блок, в который будем вставлять миниатюры
const picturesBlock = document.querySelector('.pictures');


const createHtmlImages = function (arrayData) {

  //удаляем фотки
  const clearPicturesBlock = function () {
    const picture = picturesBlock.querySelectorAll('a');
    for (const element of picture) {
      element.remove();
    }
  };
  clearPicturesBlock();

  //шаблон миниатюры
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  //фрагмент для создания элементов-миниатюр
  const imagesListFragment = document.createDocumentFragment();

  arrayData.forEach((image) => {
  //на основе шаблона создаем элемент ДОМ
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = image.url;
    pictureElement.querySelector('.picture__likes').textContent = image.likes;
    pictureElement.querySelector('.picture__comments').textContent = image.comments.length;
    imagesListFragment.appendChild(pictureElement);
  });

  picturesBlock.appendChild(imagesListFragment);            //вставляем в документ
};

export {createHtmlImages};
