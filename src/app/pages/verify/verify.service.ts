import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class VerifyService {

     options: {}

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  verifyUser(userId: string): Observable<any>{
    return this.http.get(BASE_URL + `/auth/verify/${userId}`, this.options)
        .pipe(catchError(errorHandle));
  }
    
}