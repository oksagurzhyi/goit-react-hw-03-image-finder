import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const API_KEY = '36922214-8401a7f70e38261c1802e2ba4';

export async function fetchImagies(query, page = 1) {
  try {
    if (!query) {
      return;
    }

    const { data } = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',

        page,
        per_page: 12,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
