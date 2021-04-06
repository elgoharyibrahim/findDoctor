import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
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
  constructor(public _apiService: ApiService,private route: ActivatedRoute,private urlProvider: UrlProvider, public loadingController: LoadingController,
    private router: Router, public navCtrl: NavController ) { 
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          debugger;
          this.doctor = this.router.getCurrentNavigation().extras.state.doctor;
        }
      });
   
    console.log(this.doctor);

    }

  ngOnInit() {
    this.getTime();
  }

  async getTime() {
    const data = {
      doctor_doctor_practice_id: 15871,
      dateFrom: '2021-2-21' };
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 8000
    });
    loading.present();
      this._apiService.postData(this.urlProvider.getUrl().getSlotsByPractices,data).subscribe(
        (data:any)=>{
          this.clinicSlots=data.data;
          loading.dismiss();
          console.log(this.clinicSlots);
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
