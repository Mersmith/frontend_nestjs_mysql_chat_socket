import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserI } from 'src/app/model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,

    @Inject('APP_ENVIRONMENT')
    private environment: any
  ) { }

  create(user: UserI): Observable<UserI> {
    return this.http.post<UserI>(this.environment.apiUrl+'/users', user).pipe(
      tap((createdUser: UserI) => {
        console.log(createdUser.username)
        console.log("Created sucessfully")
      }),
      catchError(e => {
        console.log("User could not be created, due to: ")
        console.log(e.error.message)
        return throwError(e);
      })
    )
  }

  findByUsername(username: string): Observable<UserI[]>{
    return this.http.get<UserI[]>(`${this.environment.apiUrl}/users/find-by-username?username=${username}`);
  }

}