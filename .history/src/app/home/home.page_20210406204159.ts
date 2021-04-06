import { Component , OnInit} from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  doctors: any;
  name: any;
  constructor(
    public api: ApiService, public loadingController: LoadingController,
    private router: Router, public navCtrl: NavController ) {
    this.fetchData();
  }
  ionViewDidLoad(){
}



 async fetchData() {
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 8000
    });
    loading.present();
    const res = await this.api.getData('findDoctors', {});
    this.doctors = res;
    await loading.dismiss();
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
    const search = await this.api.getData('findDoctors', data);
    this.doctors = search;
    await loading.dismiss();
  }

  openDoctor(doctor) {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     user: doctor
    //   }
    // };
    // this.router.navigate(['doctor'], navigationExtras);
    // this.router.navigateByUrl('/doctor');
    this.router.navigate(['/doctor']);
    // this.navCtrl.navigateRoot('doctor', doctor);
  }

}
