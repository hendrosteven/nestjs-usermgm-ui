import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import { LoginService } from '../login/login.service';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class EditNameService {

    options: {};

    constructor(private http: HttpClient, private loginService: LoginService) {
        this.options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.loginService.getAccessToken()
        })
        }
    }

    updateName(_fullName: string): Observable<any> {
        let data = {
            fullName: _fullName
        }
        return this.http.patch(BASE_URL+'/users/name', data, this.options)
            .pipe(catchError(errorHandle));
    }

    
}