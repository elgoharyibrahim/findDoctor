import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UrlProvider } from '../services/urls';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  clinicSlots: unknown;
  doctor:any;
  destination: any =  {};
  urlBrowser;

  constructor( public platform:Platform,private iab: InAppBrowser,private geolocation: Geolocation,public alertController: AlertController,public _apiService: ApiService,private route: ActivatedRoute,private urlProvider: UrlProvider, public loadingController: LoadingController,
    private router: Router, public navCtrl: NavController ) { 
      this.geolocation.getCurrentPosition().then((resp) => {
        // this.destination.lat =   resp.coords.latitude;
        // this.destination.lng = resp.coords.longitude;
        this.destination= resp.coords.latitude+','+resp.coords.longitude ;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.doctor = this.router.getCurrentNavigation().extras.state.doctor;
    console.log(this.doctor);

        }
      });
   

    }

  ngOnInit() {
    this.getClinicSlots();
  }

  async getClinicSlots() {
    const data = {
      doctor_doctor_practice_id: this.doctor.doctorDoctorpracticeID,
      dateFrom: '2021-2-21' };
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 8000
    });
    loading.present();
      this._apiService.postData(this.urlProvider.getUrl().getSlotsByPractices,data).subscribe(
        (data:any)=>{
          debugger;

          this.clinicSlots=data.data;
          loading.dismiss();
          console.log(this.clinicSlots);
        },(error:Response)=>{
          console.log(error);
          loading.dismiss();
        }
      );

  }
 async booking(slots){
    let data={
      "patientId":9511,
      "doctor_schedule_time_blocks_id":slots[0].doctor_schedule_time_blocks_id,
      "start_date_time":slots[0].from,
      "end_date_time":slots[0].to,
      "visitType":0,
      "complaint":"test notification ......"
    
    }
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 8000
    });
    loading.present();
    this._apiService.postData(this.urlProvider.getUrl().saveBookingSlot,data).subscribe(
      async (data:any)=>{
       
        loading.dismiss();
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: 'booking',
          message: ' thank you ,your number of booking is'+  data.data,
          buttons: ['OK']
        });
    
         alert.present();
      },async (error: Response)=>{
        if(error.status ==400){
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'booking',
            message: "error",
            buttons: ['OK']
          });
      
           alert.present();
        }
        console.log(error);
        loading.dismiss();
      }
    );
  }
 map(lat,lng){

  let source=lat+","+lng;

  if(this.platform.is('ios')){

    this.urlBrowser='https://maps.apple.com/?q='+source
    this.iab.create(
      this.urlBrowser,
      "_system",
      { location: "no", toolbar: "no" }
    );
  } else {
      // this.urlBrowser="https://www.google.com/maps/dir/"+dest+"/"+ go +"/@28.1185234,34.1912139,6z/data=!4m2!4m1!3e0?hl=en-US"
      window.open("https://www.google.com/maps/dir/"+this.destination+"/"+ source +"/@28.1185234,34.1912139,6z/data=!4m2!4m1!3e0?hl=en-US", '_system');

    }
 }
  goBack() {
    this.navCtrl.back({animated: true});
  }

}
