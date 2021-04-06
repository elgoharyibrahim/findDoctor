import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-doctor-holder',
  templateUrl: './doctor-holder.component.html',
  styleUrls: ['./doctor-holder.component.scss'],
})
export class DoctorHolderComponent implements OnInit {
  @Input() doctors: any;
  @Output() btnClicked = new EventEmitter();
  constructor(private router: Router) {
    console.log(this.doctors);
  }

  ngOnInit() {
  }


  openDoctor(doctor) {
    this.btnClicked.emit({value: doctor});
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     user: doctor
    //   }
    // };
    // this.router.navigate(['/doctor'], navigationExtras);
  }

}
