import {showMessage} from  './util.js';          //окно-сообщение

const getData = async function (onSuccess, onFail)  {
  try {
    const response = await fetch('https://26.javascript.pages.academy/kekstagram/data');
    if (!response.ok) {
      throw new Error ('Не удалось загрузить фотографии');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};


const sendData = async function (onSuccess, onFail, body) {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error ('Не удалось отправить форму. Попробуйте еще');
    }
    onSuccess();
    showMessage('success');
  } catch (error) {
    onFail();
    showMessage('error');
  }
};

export {getData, sendData};
