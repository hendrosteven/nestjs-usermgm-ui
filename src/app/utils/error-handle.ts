import { throwError } from "rxjs";

export default function errorHandle(err: any){
    let errorMessage = {};
    if(err.error instanceof ErrorEvent){
        errorMessage = err.error.message;
    }else{
        errorMessage = {
            "code" : err.status,
            "messages" : err.error.message
        }
    }
    console.log(errorMessage)
    return throwError(errorMessage);
}