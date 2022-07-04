import {createPhotos} from './data.js';
import {createHtmlImages} from './images.js';
import {initFormEdit} from  './formEdit.js';

const photos = createPhotos();
createHtmlImages(photos);
initFormEdit();
