import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://213.212.243.35:80/api/patient/';
  constructor( public http: HttpClient) { }

  getData(val, search) {
    return new Promise ((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: 'application/json',
        })
      };
      this.http.post(this.url + val, search, httpOptions).subscribe(
        (data: any) => {
          resolve(data.data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
