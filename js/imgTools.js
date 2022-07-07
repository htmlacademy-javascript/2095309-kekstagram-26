const scaleSmallerElement = document.querySelector('.scale__control--smaller');    //+
const scaleBiggerElement = document.querySelector('.scale__control--bigger');      //-
const scaleValueElement = document.querySelector('.scale__control--value');        //

const effectsListElement = document.querySelector('.effects__list');      //список фильтров
const imgUploadElement = document.querySelector('.img-upload__preview'); //div Для превью
const previewElement = imgUploadElement.querySelector('img');            // превью

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');     //поле для значения уровня слайдера

//значения слайдера для разных фильтров
const filtrs = {
  chrome: {
    range: {min: 0,  max: 1},
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return `grayscale(${value.toFixed(0)})`;
        } else {
          return `grayscale(${value.toFixed(1)})`;
        }
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  sepia: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return `sepia(${value.toFixed(0)})`;
        } else {
          return `sepia(${value.toFixed(1)})`;
        }
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  marvin: {
    range: {min: 0,  max: 100},
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return `invert(${value.toFixed(0)}%)`;
        } else {
          return `invert(${value.toFixed(1)}%)`;
        }
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  phobos: {
    range: {min: 0, max: 3},
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return `blur(${value.toFixed(0)}px)`;
        } else {
          return `blur(${value.toFixed(1)}px)`;
        }
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  heat: {
    range: {min: 0, max: 3},
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return `brightness(${value.toFixed(0)})`;
        } else {
          return `brightness(${value.toFixed(1)})`;
        }
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  }
};

const editImage = function () {
  const updateSliderValueElement = (value) => {sliderValueElement.value = value;};  // ф-ия заполнения поля значением слайдера

  //----------------------Масштаб-----------------------------------------------------
  const getPercent = function (step) {
    const MIN_SCALE = 25;
    const MAX_SCALE = 100;
    let scale = Number(scaleValueElement.value.slice(0,scaleValueElement.value.length-1));
    if ((step < 0 && scale > MIN_SCALE) || (step > 0 && scale < MAX_SCALE)) {
      scale = scale + step;
      scaleValueElement.value = `${scale}%`;
      previewElement.style.transform = `scale(${scale/100})`;
    }
  };
  scaleSmallerElement.addEventListener('click', () =>  getPercent(-25));
  scaleBiggerElement.addEventListener('click',() => getPercent(25));

  //-----------------------Выбор фильтра-----------------------------------------------
  //обработчик при выборе нового фильтра
  const onFilterChange = function (evt) {
    //ставим класс нового фильтра картинке
    const currentClass = `effects__preview--${evt.target.value}`;
    previewElement.className = currentClass;

    if (evt.target.value !== 'none') {
      sliderElement.classList.remove('hidden');

      //Обновляем слайдер
      sliderElement.noUiSlider.updateOptions(filtrs[evt.target.value]);
      previewElement.style.filter = sliderElement.noUiSlider.get();       //устанавливаем фильтр картинке стилями (в слайдере возвращается готовый стиль)

    } else {
      previewElement.style = '';
      updateSliderValueElement(NaN);
      sliderElement.classList.add('hidden');                              //скрываем слайдер
    }

  };

  effectsListElement.addEventListener('change', onFilterChange);        //подписывемся на список фильтров (делегирование)

  //------------------слайдер-----------------------------------------------------
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });

  //подписка на событие изменения слайдера
  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    updateSliderValueElement(sliderValue);     //заполняем поле для передачи фильтра

    const currentClass = previewElement.className.replace('effects__preview--','');
    if (currentClass !== '') {
      previewElement.style.filter = sliderValue;
    }
  });

  sliderElement.classList.add('hidden');        //при открытии формы слайдер скрыт

};

export {editImage};
