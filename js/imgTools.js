const scaleSmallerButton = document.querySelector('.scale__control--smaller');    //+
const scaleBiggerButton = document.querySelector('.scale__control--bigger');      //-
const scaleValue = document.querySelector('.scale__control--value');        //

const effectsList = document.querySelector('.effects__list');      //список фильтров
const imgUploadPreview = document.querySelector('.img-upload__preview'); //div Для превью
const preview = imgUploadPreview.querySelector('img');                   // превью

const slider = document.querySelector('.effect-level__slider');
const effectSliderValue = document.querySelector('.effect-level__value');     //поле для значения уровня слайдера

//значения слайдера для разных фильтров
const filters = {
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

const initImageEdit = function () {
  // ф-ия заполнения поля значением слайдера
  const updateEffectSliderValue = function (value) {
    const re = /[^0123456789.]{1,}/;
    const valueNumber = parseFloat(String(value).replace(re,'').replace(re,''));
    effectSliderValue.value = valueNumber;
  };

  //----------------------Масштаб-----------------------------------------------------
  const setPercent = function (step) {
    const MIN_SCALE = 25;
    const MAX_SCALE = 100;
    let scale = Number(scaleValue.value.slice(0,scaleValue.value.length-1));
    if ((step < 0 && scale > MIN_SCALE) || (step > 0 && scale < MAX_SCALE)) {
      scale = scale + step;
      scaleValue.value = `${scale}%`;
      preview.style.transform = `scale(${scale/100})`;
    }
  };
  scaleSmallerButton.addEventListener('click', () =>  setPercent(-25));
  scaleBiggerButton.addEventListener('click',() => setPercent(25));

  //-----------------------Выбор фильтра-----------------------------------------------
  //обработчик при выборе нового фильтра
  const onFilterChange = function (evt) {
    //ставим класс нового фильтра картинке
    const currentClass = `effects__preview--${evt.target.value}`;
    preview.className = currentClass;

    if (evt.target.value !== 'none') {
      slider.classList.remove('hidden');

      //Обновляем слайдер
      slider.noUiSlider.updateOptions(filters[evt.target.value]);
      preview.style.filter = slider.noUiSlider.get();       //устанавливаем фильтр картинке стилями (в слайдере возвращается готовый стиль)

    } else {
      preview.style = '';
      updateEffectSliderValue(0);
      slider.classList.add('hidden');                              //скрываем слайдер
    }
  };

  effectsList.addEventListener('change', onFilterChange);        //подписывемся на список фильтров (делегирование)

  //------------------слайдер-----------------------------------------------------
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });

  //подписка на событие изменения слайдера
  slider.noUiSlider.on('update', () => {
    const sliderValue = slider.noUiSlider.get();
    updateEffectSliderValue(sliderValue);     //заполняем поле для передачи фильтра

    const currentClass = preview.className.replace('effects__preview--','');
    if (currentClass === 'none' || currentClass === '') {
      updateEffectSliderValue(0);
    }
  });

  slider.classList.add('hidden');        //при открытии формы слайдер скрыт
};

export {initImageEdit};
