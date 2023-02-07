import BaseMovieService from './base-movie-service'

export default class MovieService extends BaseMovieService {
  getRatedIds = async () => {
    const allRes = []
    const rated = await this.getRatedMovies(1)
    let i = 1
    while (i <= rated[1]) {
      this.getRatedMovies(i).then((result) => {
        const getRateAndIds = result[0]
        allRes.push(...getRateAndIds)
      })
      i++
    }

    return allRes
  }

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

      return [body.results.map(this.transformData), body.total_pages]
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

    return [body.results.map(this.transformData), body.total_pages]
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
    rate: movie.rating,
    averageVote: movie.vote_average,
    genres: movie.genre_ids,
  })
}

// const m = new MovieService()
// m.getRatedMovies(1).then((res) => console.log(res))
// m.getResource(1, 'harr').then((res) => console.log(res))
// console.log(localStorage.getItem('tokenData'))
// m.poo()

// console.log(m.po)
