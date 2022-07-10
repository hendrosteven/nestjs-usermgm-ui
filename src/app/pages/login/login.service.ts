import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  login(userEmail: string, userPwd: string): Observable<any> {
    
      let data = {
          email: userEmail,
          password: userPwd
      }

      return this.http.post(BASE_URL+'/auth/signin', data, this.httpOptions)
          .pipe(catchError(errorHandle));
  }

  saveAccessToken(session: any) {
    console.log(session);
    localStorage.setItem("ACCESS_TOKEN", JSON.stringify(session));
  }

  getAccessToken() {
      let session = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
      return session['access_token'];
  }

  getFullName(){
    let session = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
    return session['fullName'];
  }

}
