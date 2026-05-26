import axios from 'axios';

const API_KEY = '55943093-04169c999cae84f64fe89e1ec';
const BASE_URL = 'https://pixabay.com/api/';

export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  };
 
  const response = await axios.get(BASE_URL, { params: searchParams });
  return response.data; 
}