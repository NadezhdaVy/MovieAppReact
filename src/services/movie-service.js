import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default class MovieService {
  async getResource(movieTitle) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b148e613703bb124f9200d5cf507d9b3&language=en-US&query=${movieTitle}&page=1`
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

  formatDate(date) {
    return format(parseISO(date), 'MMM dd, YYY').toString()
  }

  transformData = (movie) => ({
    title: movie.original_title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    cover: movie.poster_path,
  })
}
const m = new MovieService()
console.log(m.getResource('po'))
