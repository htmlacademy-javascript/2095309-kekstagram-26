const uploadFile = document.querySelector('#upload-file');                    //поле Загрузить
const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');     //элемент для скрытия формы
const uploadCancelButton = imgUploadOverlay.querySelector('#upload-cancel'); //Кнопка закрытия формы редактирования изображения
const hashtagsField = document.querySelector('[name="hashtags"]');          //поле хештега
const descriptionField = imgUploadOverlay.querySelector('[name="description"]'); //поле комментария

const imgForm = document.querySelector('.img-upload__form');    //форма редактирования изображения
const pristine = new Pristine(imgUploadOverlay);

const initFormEdit = function () {
  const MAX_HASHTAGS = 5;

  const closeForm = function () {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value='';
    hashtagsField.value='';
    descriptionField.value='';
  };
  //обработчик закрытия ESC
  const onImgUploadKeydown = function (evt) {
    if (evt.key === 'Escape') {
      if (hashtagsField !== document.activeElement) {
        closeForm();
        document.removeEventListener('keydown', onImgUploadKeydown);
      }
    }
  };

  //Обработчик события при загрузке файла
  const onUploadFileChange = function () {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    //добавляем событие для ESC
    document.addEventListener('keydown', onImgUploadKeydown);
  };

  //обработчик события для закрытия крестиком
  const onImgUploadClick = function () {
    closeForm();
    document.removeEventListener('keydown', onImgUploadKeydown); //куда поставить эту команду?
  };

  //создаем пользовательский валидатор на поле хештег (в разметке добавили класс по умолчанию form-group )
  const re = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;

  pristine.addValidator(hashtagsField, (value) => {
    const hashtags = value.split(' ');
    if (hashtags.filter(Boolean).length > MAX_HASHTAGS) {
      return false;
    }
    return true;
  }, 'не может быть более 5 хештегов',3,false);

  pristine.addValidator(hashtagsField, (value) => {
    const hashtags = value.split(' ');
    const arrayHashtagsFilter = hashtags.filter(Boolean);

    for (let i = 0; i <= arrayHashtagsFilter.length - 1; i++) {
      if (!(re.test(arrayHashtagsFilter[i])))  {
        return false;
      }
    }
    return true;
  }, 'Неверный хештег',2,false);

  //добавить событие при загрузке файла
  uploadFile.addEventListener('change', onUploadFileChange);

  //добавляем событие при закрытии крестиком
  uploadCancelButton.addEventListener('click',onImgUploadClick);

  //добавляем событие на отправку формы
  imgForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });

};
export {initFormEdit};


