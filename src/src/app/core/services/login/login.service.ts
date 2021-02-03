import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Tokens, TokensData} from "../../data/tokens.data";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {authRoutes} from "../../../config/routes.config";
import {AuthRequest} from "../../requests/auth.request";

@Injectable()
export class LoginService {

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public login(registerRequest: AuthRequest): Observable<TokensData> {
    return this.httpClient.post<Tokens>(authRoutes.login, registerRequest).pipe(
      map<Tokens, TokensData>(data => {
        return {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          errorMessage: null,
          isCorrect: true
        };
      }),
      catchError(error => {
          const data: TokensData = {
            access_token: null,
            refresh_token: null,
            errorMessage: null,
            isCorrect: false
          };
          if (error.status === 401 || error.status === 422) {
            data.errorMessage = 'auth.invalidLoginData';
          } else {
            data.errorMessage = 'auth.serverError'
          }
          return of(data);
        }
      )
    );
  }
}
