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

//---------------плашка-сообщение с таймером----------------------------
const ALERT_SHOW_TIME = 5000;
const alertMessage = document.querySelector('.alert-message');

function showAlert (message)  {
  alertMessage.textContent = message;
  alertMessage.classList.remove('hidden');

  setTimeout(() => {
    alertMessage.classList.add('hidden');
  }, ALERT_SHOW_TIME);
}

//----------------------элемент-сообщение с кнопкой закрытия-----------------------
function showMessage (element) {

  //шаблон сообщения
  const successTemplate = document.querySelector(`#${element}`)
    .content
    .querySelector(`.${element}`);

  const successElement = successTemplate.cloneNode(true);

  //обработчик события по клику
  const onClick = function () {
    successElement.remove();
  };

  //обработчик закрытия ESC
  const onShowSuccessKeydown = function (evt) {
    if (evt.key === 'Escape') {
      successElement.remove();
    }
  };
  successElement.querySelector(`.${element}__button`).addEventListener('click',onClick);   //добавляем событие при закрытии крестиком
  document.addEventListener('keydown',onShowSuccessKeydown);                               //добавляем событие при закрытии ESC
  document.addEventListener('click',onClick);                                              //добавляем событие при закрытии мышкой по экрану

  document.body.append(successElement);
}

// ----------Устранение дребезга - Функция взята из интернета и доработана------------
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomInt, showAlert, showMessage};
export {checkLength, debounce};
