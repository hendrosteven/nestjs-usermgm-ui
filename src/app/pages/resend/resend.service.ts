import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ResendService {

     options: {}

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  resendEmail(data: any): Observable<any>{
    return this.http.post(BASE_URL + '/auth/resend', data,  this.options)
        .pipe(catchError(errorHandle));
  }
    
}