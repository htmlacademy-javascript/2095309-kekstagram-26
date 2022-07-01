const uploadFile = document.querySelector('#upload-file');          //поле Загрузить
const imgUpload = document.querySelector('.img-upload__overlay');  //форма редактирования изображения
const body = document.querySelector('body');
const uploadCancel = imgUpload.querySelector('#upload-cancel');    //Кнопка закрытия формы редактирования изображения
const hashtags = document.querySelector('[name="hashtags"]');     //поле хештега
const description = imgUpload.querySelector('[name="description"]'); //поле комментария

const pristine = new Pristine(imgUpload);

const closeForm = function () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value='';
  hashtags.value='';
  description.value='';
};

//Обработчик события при загрузке файла
const onUploadFileChange = function () {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');

  //обработчик закрытия ESC
  const onImgUploadKeydown = function (evt) {
    if (evt.key === 'Escape') {
      if (hashtags !== document.activeElement) {
        closeForm();
        document.removeEventListener('keydown', onImgUploadKeydown);
      }
    }
  };
  //добавляем событие для ESC
  document.addEventListener('keydown', onImgUploadKeydown);
};

const createFormEdit = function () {
  //добавить событие при загрузке файла
  uploadFile.addEventListener('change', onUploadFileChange);

  //обработчик события для закрытия крестиком
  const onImgUploadClick = function () {
    closeForm();
  };
  //добавляем событие при закрытии крестиком
  uploadCancel.addEventListener('click',onImgUploadClick);

  //валидация
  imgUpload.addEventListener('submit', (evt) => {
    //console.log(evt);
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      //console.log('Можно отправлять');
    } else {
      //console.log('Форма невалидна');
    }

  });
};
export {createFormEdit};

