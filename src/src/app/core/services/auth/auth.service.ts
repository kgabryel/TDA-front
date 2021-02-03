import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {RefreshTokenData, Tokens} from "../../data/tokens.data";
import {authRoutes} from "../../../config/routes.config";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable()
export class AuthService {

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public static clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  public storeToken(tokens: Tokens): void {
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  }

  public isLogged(): Observable<boolean> {
    return AuthService.checkAccessToken().pipe(mergeMap(data => {
      if (data) {
        return of(data);
      }
      return this.refreshToken().pipe(mergeMap(tokens => {
        if (!tokens.isCorrect) {
          return of(false);
        }
        this.storeToken({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token
        })
        return of(true);
      }));
    }));
  }

  public refreshToken(): Observable<RefreshTokenData> {
    const data = {
      refresh_token: localStorage.getItem(REFRESH_TOKEN)
    };
    return this.httpClient.post<Tokens>(authRoutes.refreshToken, data).pipe(
      map<Tokens, RefreshTokenData>(data2 => {
        return {
          access_token: data2.access_token,
          refresh_token: data2.refresh_token,
          isCorrect: true
        };
      }),
      catchError(() => {
          return of({
            access_token: null,
            refresh_token: null,
            isCorrect: false
          });
        }
      )
    );
  }

  public getToken(): string {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  private static checkAccessToken(): Observable<boolean> {
    const jwtHelper = new JwtHelperService();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken === null) {
      AuthService.clearTokens();
      return of(false);
    }
    let tokenDate: Date;
    try {
      tokenDate = jwtHelper.getTokenExpirationDate(accessToken);
    } catch (error) {
      return of(false);
    }
    return of(tokenDate > new Date());
  }

  public addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.getToken();
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
