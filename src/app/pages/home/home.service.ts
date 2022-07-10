import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import { LoginService } from '../login/login.service';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  options: {};

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.getAccessToken()
      })
    }
  }

  getProfile(): Observable<any> {
    return this.http.get(BASE_URL + '/users/profile', this.options)
      .pipe(catchError(errorHandle));
  }
}
