class TokenService {
  static ACCESS_KEY = "accessToken";
  static REFRESH_KEY = "refreshToken";

  static saveToken(token: string) {
    localStorage.setItem(TokenService.ACCESS_KEY, token);
  }
  static getToken() {
    return localStorage.getItem(TokenService.ACCESS_KEY);
  }

  static getRefreshToken() {
    return localStorage.getItem(TokenService.REFRESH_KEY);
  }
}

export default TokenService;
