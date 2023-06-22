import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginResponseI } from 'src/app/model/login-response.interface';
import { UserI } from 'src/app/model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, private jwtService: JwtHelperService,
    @Inject('APP_ENVIRONMENT')
    private environment: any
  ) { }

  login(user: UserI): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>(this.environment.apiUrl + '/users/login', user).pipe(
      tap((res: LoginResponseI) => {
        localStorage.setItem(this.environment.tokenLocalStorage, res.access_token)
      }),
      tap(() => {
        console.log("Login sucessfully")
      }),
      catchError(e => {
        console.log("User could not be created, due to: ")
        console.log(e.error.message)
        return throwError(e);
      })
    )
  }

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }

}
