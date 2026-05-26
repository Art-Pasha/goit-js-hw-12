import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton 
} from './js/render-functions.js';

// Глобальні змінні стану додатку
let query = '';
let page = 1;

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');

// ОБРОБКА САБМІТУ ФОРМИ (НОВИЙ ПОШУК)
searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const inputQuery = event.currentTarget.elements['search-text'].value.trim();

  if (inputQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  query = inputQuery;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    // Використовуємо PER_PAGE замість жорстко прописаного 15
    if (page * PER_PAGE >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    // Видалено searchForm.reset() — текст запиту тепер залишається в інпуті для кращого UX
  }
});

// ОБРОБКА КЛІКУ НА КНОПКУ "LOAD MORE"
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Використовуємо PER_PAGE замість жорстко прописаного 15
    if (page * PER_PAGE >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});