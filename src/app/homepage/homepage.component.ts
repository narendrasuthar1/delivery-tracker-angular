import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  userRole:any;
  userId:any;
  pageName:string;
  pageHeading:string;

  orderToBeEditted:any;

  constructor(private localStorage:LocalStorageService){
    this.userRole = localStorage.getData("userRole");
    this.userId = localStorage.getData("userId");
    this.pageName = "viewPendingOrder";
    this.pageHeading = 'Pending Invoice';
  }

  ngOnInit(): void {
    console.warn("On Init");
  }

  changePage(nav: any) {
    this.pageName = nav.menuName;
    this.pageHeading = nav.pageName;
  }

  editOrder(order: any) {
    this.pageName = 'editExistingOrder';
    this.pageHeading = 'Edit Order';
    this.orderToBeEditted = order;
  }
  
}
