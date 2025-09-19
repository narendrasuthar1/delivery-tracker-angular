import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userRole: any;
  constructor(private localStorage: LocalStorageService, private routing: Router) {
  }

  ngOnInit(): void {
    const userId = this.localStorage.getData("userId");
    if (userId) {
      this.routing.navigateByUrl('/home');
      return;
    }
    this.routing.navigateByUrl('/login');
  }

}
