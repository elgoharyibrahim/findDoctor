import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(public platform: Platform, private http: HttpClient) {
	
	}
	prepareHeaders() {
		const reqHeader = new HttpHeaders({
			"Accept": "application/json",
			"Content-Type": "application/json"
		  });
		return reqHeader;
		}


	postData(url, data) {
		const reqHeader = this.prepareHeaders();
		return this.http.post(url, data, { headers: reqHeader });
	  }


}
