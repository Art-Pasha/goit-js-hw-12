import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
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

  // Скидання стану для нової колекції
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

    // Перевірка, чи не дійшли ми до кінця колекції вже на першій сторінці
    if (page * 15 >= data.totalHits) {
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
    searchForm.reset();
  }
});

// ОБРОБКА КЛІКУ НА КНОПКУ "LOAD MORE"
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton(); // Ховаємо кнопку на час завантаження
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    // 1. Спочатку рендеримо нові зображення в галерею
    createGallery(data.hits);

    // 2. Реалізація плавного прокручування сторінки
    const galleryItem = document.querySelector('.gallery-item');
    
    if (galleryItem) {
      // Отримуємо висоту однієї картки за допомогою getBoundingClientRect
      const cardHeight = galleryItem.getBoundingClientRect().height;
      
      // Прокручуємо сторінку на дві висоти картки з параметром behavior: 'smooth'
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // 3. Перевірка на досягнення кінця колекції результатів
    if (page * 15 >= data.totalHits) {
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