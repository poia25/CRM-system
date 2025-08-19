class TokenService {
  static ACCESS_KEY = "accessToken";
  static REFRESH_KEY = "refreshToken";
  static isRetry: boolean = false;

  static accessToken: string | null = null;

  static saveToken(token: string) {
    this.accessToken = token;
  }
  static getToken() {
    return this.accessToken;
  }
  static deleteToken() {
    this.accessToken = null;
    return this.accessToken;
  }

  static saveRefreshToken(token: string) {
    localStorage.setItem(TokenService.REFRESH_KEY, token);
  }

  static getRefreshToken() {
    return localStorage.getItem(TokenService.REFRESH_KEY);
  }

  static clearTokens() {
    this.accessToken = null;
    localStorage.removeItem(TokenService.REFRESH_KEY);
  }

   static setIsRetry(): void {
    this.isRetry = true;
  }

  static unsetIsRetry(): void {
    this.isRetry = false;
  }

  static getIsRetry(): boolean {
    return this.isRetry;
  }
  
}

export default TokenService;
