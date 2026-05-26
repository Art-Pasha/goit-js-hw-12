import axios from 'axios';

const API_KEY = '55943093-04169c999cae84f64fe89e1ec'; // Отримай на pixabay.com
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return axios.get(`${BASE_URL}?${searchParams}`).then(response => {
    return response.data;
  });
}