import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  doctor: unknown;

  constructor(public api: ApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getTime();
  }

  async getTime() {
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 8000
    });
    loading.present();
    const data = {
      doctor_doctor_practice_id: 15871,
      dateFrom: '2021-2-21' };

    const search = await this.api.getData('getSlotsByPractices', data);
    this.doctor = search;
    await loading.dismiss();

  }

}
