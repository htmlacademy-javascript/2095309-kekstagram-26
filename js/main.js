
//https://translated.turbopages.org/proxy_u/en-ru.ru.4dd51bc6-629f6785-117fb3e2-74722d776562/https/stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
  min=Math.abs(min);
  max=Math.abs(max);

  if(min<max) {
    min = Math.ceil(min);       //округление вверх
    max = Math.floor(max);      //округление вниз
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return min;
}

function checkLength(checkline, maxLength) {
  return checkline.length <= maxLength;
}

getRandomInt(1, 9);

checkLength(1, 9);

