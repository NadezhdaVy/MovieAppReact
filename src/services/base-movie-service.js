export default class BaseMovieService {
  apiKey = 'b148e613703bb124f9200d5cf507d9b3'

  baseUrl = 'https://api.themoviedb.org/3/'

  tokenData = JSON.parse(localStorage.getItem('tokenData')).guest_session_id

  createUrl = (url, params) => {
    const newUrl = new URL(url, this.baseUrl)
    newUrl.searchParams.append('api_key', this.apiKey)
    if (params) {
      params.forEach((element) => {
        newUrl.searchParams.append(Object.keys(element), Object.values(element))
      })
    }
    return newUrl
  }
}
