import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { DoctorPage } from './doctor.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[Geolocation,InAppBrowser]
})
export class DoctorPageRoutingModule {}
