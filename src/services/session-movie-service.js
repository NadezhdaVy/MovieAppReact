import BaseMovieService from './base-movie-service'

export default class SessionMovieService extends BaseMovieService {
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
}
