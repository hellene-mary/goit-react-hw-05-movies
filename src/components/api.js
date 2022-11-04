import axios from 'axios';

const KEY = '25b04cbcbe0fdb69c9de2ffa5b80bb64';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// приклад список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
export async function trendingmoviesRequest() {
  try {
    const response = await axios.get(`trending/movie/day?`, {
      params: {
        api_key: KEY,
      },
    });
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

// запит повної інформації про фільм для сторінки кінофільму.
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
export async function movieInfoRequest(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}`, {
      params: {
        api_key: KEY,
        language: 'en-US',
      },
    });
    // console.log('response in Api', response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

// пошук фільму за ключовим словом на сторінці фільмів.
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
export async function moviesQueryRequest(search) {
  try {
    const response = await axios.get(`search/movie`, {
      params: {
        api_key: KEY,
        language: 'en-US',
        query: search,
        include_adult: false,
        page: 1,
      },
    });
    // console.log('response in Api', response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

//запит інформації про акторський склад для сторінки кінофільму.
//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
export async function castRequest(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/credits`, {
      params: {
        api_key: KEY,
        language: 'en-US',
      },
    });
    // console.log('response in Api', response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

//запит оглядів для сторінки кінофільму.
//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
export async function reviewsRequest(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`, {
      params: {
        api_key: KEY,
        language: 'en-US',
        page: 1,
      },
    });
    // console.log('response in Api', response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
}
