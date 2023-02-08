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

  getResource = async (page, movieTitle) => {
    if (movieTitle.trim()) {
      const resourceUrl = this.createUrl('search/movie', [{ language: 'en-US' }, { query: movieTitle }, { page }])
      const res = await fetch(resourceUrl)

      if (!res.ok) {
        throw new Error('Something went wrong')
      }
      const body = await res.json()

      return [body.results.map(this.transformData), body.total_pages]
    }
    return []
  }

  getGenres = async () => {
    const resourceUrl = this.createUrl('genre/movie/list', [{ language: 'en-US' }])
    const res = await fetch(resourceUrl)

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    const body = await res.json()

    return body.genres
  }

  getRatedMovies = async (page) => {
    const resourceUrl = this.createUrl(`guest_session/${this.tokenData}/rated/movies`, [
      { language: 'en-US' },
      { sort_by: 'created_at.asc' },
      { page },
    ])
    const res = await fetch(resourceUrl)

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    const body = await res.json()

    return [body.results.map(this.transformData), body.total_pages]
  }

  rateMovie = async (rate, movieID) => {
    const resourceUrl = this.createUrl(`movie/${movieID}/rating`, [
      { language: 'en-US' },
      { guest_session_id: this.tokenData },
    ])
    const response = await fetch(resourceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },

      body: JSON.stringify({ value: rate }),
    })
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
