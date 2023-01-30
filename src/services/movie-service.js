import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default class MovieService {
  state = {
    genres: [],
  }

  async getTokenData() {
    const result = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=b148e613703bb124f9200d5cf507d9b3'
    )
    if (!result.ok) {
      throw new Error('Something went wrong')
    }
    const tokenData = await result.json()
    return tokenData
  }

  saveToken = (token) => {
    localStorage.setItem('tokenData', JSON.stringify(token))
  }

  getResource = async (movieTitle, page) => {
    if (!localStorage.getItem('tokenData')) {
      await this.getTokenData().then((res) => this.saveToken(res))
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b148e613703bb124f9200d5cf507d9b3&language=en-US&query=${movieTitle}&page=${page}`
    )

    if (!res.ok) {
      if (res.status === 422) {
        return []
      }
      throw new Error('Something went wrong')
    }
    const body = await res.json()

    return body.results.map(this.transformData)
  }

  getGenres = async () => {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=b148e613703bb124f9200d5cf507d9b3&language=en-US'
    )

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    const body = await res.json()

    return body.genres
  }

  getRatedMovies = async (page) => {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'))
    const tokenID = tokenData.guest_session_id
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${tokenID}/rated/movies?api_key=b148e613703bb124f9200d5cf507d9b3&language=en-US&sort_by=created_at.asc&page=${page}`
    )

    if (!res.ok) {
      if (res.status === 422) {
        return []
      }
      throw new Error('Something went wrong')
    }
    const body = await res.json()

    return body.results.map(this.transformData)
  }

  rateMovie = async (rate, movieID) => {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'))
    const tokenID = tokenData.guest_session_id

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/rating?api_key=b148e613703bb124f9200d5cf507d9b3&guest_session_id=${tokenID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },

        body: JSON.stringify({ value: rate }),
      }
    )
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const result = await response.json()
    return result
  }

  formatDate = (date) => format(parseISO(date), 'MMM dd, YYY').toString()

  transformData = (movie) => ({
    title: movie.original_title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    cover: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    movieId: movie.id,
    rate: movie.rating ? movie.rating : movie.vote_average,
    averageVote: movie.vote_average,
    genres: movie.genre_ids,
  })
}

console.log(localStorage.getItem('tokenData'))
