const fileChooser = document.querySelector('.img-upload__start input[type=file]');  //поле, по которому выбираем фото
const preview = document.querySelector('#img_preview');                             //куда подставляем фото

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const initChoosePhoto = function () {
  //подпиываемся на событие выбора файла
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

export {initChoosePhoto};

