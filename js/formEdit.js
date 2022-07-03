const uploadFile = document.querySelector('#upload-file');          //поле Загрузить
const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload__overlay');  //элемент для скрытия формы
const uploadCancel = imgUpload.querySelector('#upload-cancel');    //Кнопка закрытия формы редактирования изображения
const hashtags = document.querySelector('[name="hashtags"]');     //поле хештега
const description = imgUpload.querySelector('[name="description"]'); //поле комментария

const imgForm = document.querySelector('.img-upload__form');    //форма редактирования изображения
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

const showFormEdit = function () {
  //добавить событие при загрузке файла
  uploadFile.addEventListener('change', onUploadFileChange);

  //обработчик события для закрытия крестиком
  const onImgUploadClick = function () {
    closeForm();
  };
  //добавляем событие при закрытии крестиком
  uploadCancel.addEventListener('click',onImgUploadClick);

  //создаем пользовательский валидатор на поле хештег (в разметке добавили класс по умолчанию form-group )
  const re = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;

  pristine.addValidator(hashtags, (value) => {
    const arrayHashtags = value.split(' ');
    if (arrayHashtags.filter(Boolean).length > 5) {
      return false;
    }
    return true;
  }, 'не может быть более 5 хештегов',3,false);

  pristine.addValidator(hashtags, (value) => {
    const arrayHashtags = value.split(' ');
    const arrayHashtagsFilter = arrayHashtags.filter(Boolean);

    for (let i = 0; i <= arrayHashtagsFilter.length - 1; i++) {
      if (!(re.test(arrayHashtagsFilter[i])))  {
        return false;
      }
    }
    return true;
  }, 'Неверный хештег',2,false);

  imgForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};
export {showFormEdit};


