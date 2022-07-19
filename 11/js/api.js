import {showMessage} from  './util.js';          //окно-сообщение
const API_LINK = 'https://26.javascript.pages.academy/kekstagram';

const getData = async function (onSuccess, onFail)  {
  try {
    const response = await fetch(`${API_LINK}/data`);
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
      API_LINK,
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
