import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../utils/app-const'
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  options: {}

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  register(data: any): Observable<any>{
    return this.http.post(BASE_URL + '/auth/signup', data, this.options)
        .pipe(catchError(errorHandle));
  }
}
