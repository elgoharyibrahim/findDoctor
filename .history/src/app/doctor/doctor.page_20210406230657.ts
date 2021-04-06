import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UrlProvider } from '../services/urls';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  clinicSlots: unknown;
  doctor:any;
  constructor(public alertController: AlertController,public _apiService: ApiService,private route: ActivatedRoute,private urlProvider: UrlProvider, public loadingController: LoadingController,
    private router: Router, public navCtrl: NavController ) { 
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
          message: ' thank you ,your number of booking is'+data,
          buttons: ['OK']
        });
    
         alert.present();
      },(error:Response)=>{
        console.log(error);
        loading.dismiss();
      }
    );
  }
  goBack() {
    this.navCtrl.back({animated: true});
  }

}
