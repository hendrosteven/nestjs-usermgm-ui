import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import { LoginService } from '../login/login.service';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StatisticService {

    options: {};

    constructor(private http: HttpClient, private loginService: LoginService) {
        this.options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.loginService.getAccessToken()
            })
        }
    }

    findAllUser(): Observable<any> {
        return this.http.get(BASE_URL + '/users/all', this.options)
            .pipe(catchError(errorHandle));
    }

    findStatistic(): Observable<any> {
        return this.http.get(BASE_URL + '/users/statistic', this.options)
            .pipe(catchError(errorHandle));
    }

}