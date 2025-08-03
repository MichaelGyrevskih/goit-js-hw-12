import axios from 'axios';

const API_KEY = '51602245-fcbe599c3dab331c74561bb82';
export const PER_PAGE = 15;
export async function getImagesByQuery(query,page=1) {
  const response = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
     per_page: PER_PAGE,
    },
  });
  return response.data;
}