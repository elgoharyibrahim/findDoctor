import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  constructor() {  }
 baseUrl = "http://213.212.243.35:80/api/patient/";
   
 urls = {
  findDoctors: this.baseUrl + "findDoctors",
  getSlotsByPractices: this.baseUrl + "getSlotsByPractices",
  saveBookingSlot: this.baseUrl + "saveBookingSlot"
 };

 getUrl() {

   return this.urls;
 }


}
