import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API = '37001375-196a5219cdc9346e7b5165ddc';

export const fetchImages = async (q, page = 1) => {
  const { data } = await axios({
    params: {
      key: API,
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: 12,
    },
  });

  const array = [...data.hits];
  array[0].total = data.totalHits;
  return array;
};
