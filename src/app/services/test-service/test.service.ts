import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface Test {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, @Inject('APP_ENVIRONMENT') private environment: any) {
    console.log(this.environment.apiUrl);
  }

  getTest(): Observable<Test> {
    return this.http.get<Test>(environment.apiUrl);
  }
  
}
