import {createPhotos} from './data.js';
import {createHtmlImages} from './images.js';
import {showFormEdit} from  './formEdit.js';

const photos = createPhotos();
createHtmlImages(photos);
showFormEdit();
