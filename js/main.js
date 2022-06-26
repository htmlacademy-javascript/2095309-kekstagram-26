import {createPhotos} from './data.js';
import {createHtmlImages} from './images.js';

const photos = createPhotos();
createHtmlImages(photos);

