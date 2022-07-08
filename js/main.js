import {createPhotos} from './data.js';
import {createHtmlImages} from './images.js';
import {initFormEdit} from  './formEdit.js';
import {initImageEdit} from  './imgTools.js';

const photos = createPhotos();
createHtmlImages(photos);
initFormEdit();
initImageEdit();
