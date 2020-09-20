import API from './api.js'

const movieService = {
  getDetails: (id) => API.doGet(`/movie/${id}`),
  getNowPlaying: () => API.doGet('/movie/now_playing'),
  getPopular: () => API.doGet('/movie/popular'),
  getTopRated: () => API.doGet('/movie/top_rated'),
}

export default movieService
