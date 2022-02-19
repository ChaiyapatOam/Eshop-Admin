export class Jwt {
  static getJwtToken() {
    return sessionStorage.getItem('jwt')
  }

  static setJwtToken(value) {
    sessionStorage.setItem('jwt', value)
  }

  static clearJwtToken() {
    sessionStorage.removeItem('jwt')
  }
}

export class StoreAuth {
  static getStoreAuth() {
    return JSON.parse(sessionStorage.getItem('store'))
  }

  static setStoreAuth(value) {
    sessionStorage.setItem('store', JSON.stringify(value))
  }

  static clearStoreAuth() {
    sessionStorage.removeItem('store')
  }
}
