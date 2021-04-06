import { Component , OnInit} from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UrlProvider } from '../services/urls';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  doctors: any;
  name: any;
  constructor(
    public _apiService: ApiService,private urlProvider: UrlProvider, public loadingController: LoadingController,
    private router: Router, public navCtrl: NavController ) {
      this.getDoctors();
    }
  ionViewDidLoad(){
}
ngOnInit() {
}
async getDoctors(){
let data= {
  "patientID":9511,
  "doctorName": "MobiMed Doctor"       
  };
  const loading = await this.loadingController.create({
    message: 'Please wait',
    duration: 8000
  });
  loading.present(); 
this._apiService.postData(this.urlProvider.getUrl().findDoctors,data).subscribe(
  (data:any)=>{
    this.doctors=data.data;
    console.log(this.doctors);
    loading.dismiss();

  },(error:Response)=>{
    console.log(error);
     loading.dismiss();

  }
);

}
async searchByName() {
const loading = await this.loadingController.create({
  message: 'Please wait',
  duration: 8000
});
loading.present();
const data = {
  patientID: 9511, doctorName: this.name
  };
  this._apiService.postData(this.urlProvider.getUrl().findDoctors,data).subscribe(
    (data:any)=>{
      this.doctors=data.data;
      loading.dismiss();
      console.log(this.doctors);
    },(error:Response)=>{
      console.log(error);
      loading.dismiss();
    }
  );

}



}
