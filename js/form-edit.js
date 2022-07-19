import {sendData} from  './api.js';
import {removeFilters} from  './img-tools.js';
import {initChoosePhoto} from  './upload-photo.js';

const uploadFile = document.querySelector('#upload-file');                    //поле Загрузить
const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');     //элемент для скрытия формы
const uploadCancelButton = imgUploadOverlay.querySelector('#upload-cancel'); //Кнопка закрытия формы редактирования изображения
const hashtagsField = document.querySelector('[name="hashtags"]');          //поле хештега
const descriptionField = imgUploadOverlay.querySelector('[name="description"]'); //поле комментария

const imgUploadForm = document.querySelector('.img-upload__form');    //форма редактирования изображения
const submitButton = imgUploadForm.querySelector('#upload-submit');   //кнопка отправки
const pristine = new Pristine(imgUploadForm);

//блокировка - разблокировка кнопки отправки формы
const blockSubmitButton = function () {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};
const unblockSubmitButton = function () {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};


const initFormEdit = function () {
  const MAX_HASHTAGS = 5;

  initChoosePhoto();                        //создаем обработчик для загрузки своего фото

  const closeForm = function (save) {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');

    if (!save) {
      uploadFile.value='';
      hashtagsField.value='';
      descriptionField.value='';
      removeFilters();
    }

  };
  //обработчик закрытия ESC
  const onImgUploadKeydown = function (evt) {
    if (evt.key === 'Escape') {
      if (hashtagsField !== document.activeElement && descriptionField !== document.activeElement) {
        closeForm(false);
        document.removeEventListener('keydown', onImgUploadKeydown);
      }
    }
  };

  //закрыть форму и удалить обработчик на ESC
  const closeUserModal = function (save) {
    closeForm(save);
    document.removeEventListener('keydown', onImgUploadKeydown);
    unblockSubmitButton();
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
    closeUserModal(false);
  };

  //создаем пользовательский валидатор на поле хештег (в разметке добавили класс по умолчанию form-group )
  const re = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;

  const reportAnError = function () {
    return `не может быть более ${MAX_HASHTAGS} хештегов`;
  };

  pristine.addValidator(hashtagsField, (value) => {
    const hashtags = value.split(' ');
    if (hashtags.filter(Boolean).length > MAX_HASHTAGS) {
      return false;
    }
    return true;
  }, reportAnError(),3,false);

  pristine.addValidator(hashtagsField, (value) => {
    const hashtags = value.split(' ');
    const hashtagsFilter = hashtags.filter(Boolean);
    const uniqueHashtags = hashtagsFilter.filter((item, index) => hashtagsFilter.indexOf(item) === index);
    if (hashtagsFilter.length !== uniqueHashtags.length) {
      return false;
    }
    return true;
  }, 'хэштеги не должны повторяться',1,false);

  pristine.addValidator(hashtagsField, (value) => {
    const hashtags = value.split(' ');
    const hashtagsFilter = hashtags.filter(Boolean);

    for (let i = 0; i <= hashtagsFilter.length - 1; i++) {
      if (!(re.test(hashtagsFilter[i])))  {
        return false;
      }
    }
    return true;
  }, 'Неверный хештег',2,false);

  //создаем пользовательский валидатор на поле комментария (в разметке добавили класс по умолчанию form-group )
  pristine.addValidator(descriptionField, (value) => {
    if (value.length > 140) {
      return false;
    }
    return true;
  }, 'Длина строки должна быть не более 140 символов',1,false);

  //добавить событие при загрузке файла
  uploadFile.addEventListener('change', onUploadFileChange);

  //добавляем событие при закрытии крестиком
  uploadCancelButton.addEventListener('click',onImgUploadClick);

  //добавляем событие на отправку формы
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid)  {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(closeUserModal,unblockSubmitButton,formData);  //showMessage
    }
  });

};
export {initFormEdit};


