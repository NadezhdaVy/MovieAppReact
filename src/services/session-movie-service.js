import BaseMovieService from './base-movie-service'

export default class SessionMovieService extends BaseMovieService {
  token = localStorage.getItem('tokenData')

  saveToken = (tok) => {
    localStorage.setItem('tokenData', JSON.stringify(tok))
    this.token = tok
  }

  getTokenData = async () => {
    const getTokenUrl = this.createUrl('authentication/guest_session/new')
    const result = await fetch(getTokenUrl)
    if (!result.ok) {
      throw new Error('Something went wrong')
    }
    const tokenData = await result.json()

    return tokenData
  }

  setToken = async () => {
    if (!this.token) {
      const getToken = await this.getTokenData()
      this.saveToken(getToken)
      return getToken
    }
    const tokenDate = JSON.parse(this.token).expires_at
    if (new Date() > new Date(tokenDate)) {
      localStorage.removeItem('tokenData')
      const refreshToken = await this.getTokenData()
      this.saveToken(refreshToken)
      return refreshToken
    }
    return this.token
  }
}
