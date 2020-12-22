import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
export class CommonService {

    constructor(private _http: HttpClient) { }

    get(url : string) : Observable<any> {
        return this._http.get(url)
    }

    post(url : string, body: any) :Observable<any> {
        const header = new HttpHeaders()
        .set('Content-type', 'application/json');

        return this._http.post(url, body,{ headers: header});
    }

}