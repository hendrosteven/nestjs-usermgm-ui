
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/app-const';
import { LoginService } from '../login/login.service';
import errorHandle from "../../utils/error-handle";
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MainService {

    options: {};

    constructor(private http: HttpClient, private loginService: LoginService) {
        this.options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.loginService.getAccessToken()
            })
        }
    }

    createSession(uuid: string): Observable<any> {
        let data = {
            sessionId: uuid
        }
        return this.http.post(BASE_URL + '/users/session', data, this.options)
            .pipe(catchError(errorHandle));
    }

    uuid() {
        var uuidValue = "", k, randomValue;
        for (k = 0; k < 32; k++) {
            randomValue = Math.random() * 16 | 0;

            if (k == 8 || k == 12 || k == 16 || k == 20) {
                uuidValue += "-"
            }
            uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
        }
        return uuidValue;
    }

}