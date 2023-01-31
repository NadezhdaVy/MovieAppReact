export default class MovieService {
  apiKey = 'b148e613703bb124f9200d5cf507d9b3'

  baseUrl = 'https://api.themoviedb.org/3/'

  async getTokenData() {
    const result = await fetch(`${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`)
    if (!result.ok) {
      throw new Error('Something went wrong')
    }
    const tokenData = await result.json()
    return tokenData
  }

  saveToken = (token) => {
    localStorage.setItem('tokenData', JSON.stringify(token))
  }

  setToken = async () => {
    const tokenData = localStorage.getItem('tokenData')
    if (!tokenData) {
      await this.getTokenData().then((res) => this.saveToken(res))
    } else {
      const tokenDate = JSON.parse(tokenData).expires_at
      if (new Date() > new Date(tokenDate)) {
        localStorage.removeItem('tokenData')
        await this.getTokenData().then((res) => this.saveToken(res))
      }
    }
  }

  getResource = async (page, movieTitle) => {
    await this.setToken()
    if (movieTitle.trim()) {
      const res = await fetch(
        `${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${movieTitle}&page=${page}`
      )

      if (!res.ok) {
        throw new Error('Something went wrong')
      }
      const body = await res.json()

      return body.results.map(this.transformData)
    }
    return []
  }

  getGenres = async () => {
    const res = await fetch(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`)

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
      `${this.baseUrl}guest_session/${tokenID}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
    )

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    const body = await res.json()

    return body.results.map(this.transformData)
  }

  rateMovie = async (rate, movieID) => {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'))
    const tokenID = tokenData.guest_session_id

    const response = await fetch(
      `${this.baseUrl}movie/${movieID}/rating?api_key=${this.apiKey}&guest_session_id=${tokenID}`,
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
