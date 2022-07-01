import {createPhotos} from './data.js';
import {createHtmlImages} from './images.js';
import {createFormEdit} from  './formEdit.js';

const photos = createPhotos();
createHtmlImages(photos);
createFormEdit();
