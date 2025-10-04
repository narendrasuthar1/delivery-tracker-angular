import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBarList: any[] = [];
  @Input()
  selectedPage: any;

  @Output()
  navigatePage = new EventEmitter<string>();

  constructor(private localStorage: LocalStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.navBarList = [];
    const userRole = this.localStorage.getData("userRole");

    this.navBarList.push({
      pageName: 'Pending Invoice',
      menuName: 'viewPendingOrder',
    });
    this.navBarList.push({
      pageName: 'Completed Invoice',
      menuName: 'viewCompletedOrder',
    });
    // this.navBarList.push({
    //   pageName: 'All Invoice',
    //   menuName: 'viewAllOrders',
    // });
    if (userRole === "ADMIN") {
      this.navBarList.push({
        pageName: 'Add Invoice',
        menuName:'addOrder',
        routerLink: '/addInvoice'
      });
      this.navBarList.push({
        pageName: 'Edit Invoice',
        menuName:'editinvoice',
      });
    }


    this.selectedPage = this.navBarList[0].pageName;


  }

  navigate(nav: any) {
    this.selectedPage = nav.pageName;
    this.navigatePage.emit(nav);
  }

  logout() {
    this.localStorage.clearData();
    this.router.navigateByUrl("/");
  }

}
