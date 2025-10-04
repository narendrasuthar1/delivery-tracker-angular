import { Component, Input, OnInit } from '@angular/core';
import { ApiServicService } from '../service/api-servic.service';
import { LocalStorageService } from '../service/local-storage.service';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  @Input()
  orderType: any;

  showDetailsFlag: boolean = false;

  orderList: any[] = [];
  userId: number;
  userRole:string;


  constructor(private apiService: ApiServicService
    , private localStorage: LocalStorageService
    , private spinnerService: SpinnerService) {
    this.userId = Number(this.localStorage.getData("userId"));
    this.userRole = String(this.localStorage.getData("userRole"));
  }

  ngOnInit(): void {
    // Pending Invoice
    this.spinnerService.resetSpinner();
    this.spinnerService.requestStarted();
    this.orderList = [];
    const orderStatus = this.getOrderByStatus();
    const apiUrl = this.getApiUrlByUserType(this.userRole);
    const userId = this.userRole === 'ADMIN' ? 0 : this.userId;

    // if ('ALL' === orderStatus) {
    //   this.apiService.getAllOrderByUserId(userId).subscribe({
    //     next: res => {
    //       this.spinnerService.requestEnded();
    //       this.orderList = res;
    //     }, error: err => {
    //       this.spinnerService.requestEnded();
    //       alert("Internal Server error " + err);
    //     }
    //   })
    // } else {


      this.apiService.getOrderByStatusAndUserId(apiUrl,orderStatus, userId).subscribe({
        next: res => {
          this.spinnerService.requestEnded();
          this.orderList = res;
        }, error: err => {
          this.spinnerService.requestEnded();
          alert("Internal Server error " + err);
        }
      })
    // }

  }




  deliverOrder(order: any) {
    if(order.isCash && Number(order.receivedAmount) <= 0){
      alert("Please fill the amount or choose signed option");
      return;
    }

    const deliverOrder = {
      orderId: order.orderId,
      cash: order.isCash,
      receivedAmount: order.receivedAmount,
      userId: this.userId
    }
    this.spinnerService.resetSpinner();
    this.spinnerService.requestStarted();
    this.apiService.deliverOrder(deliverOrder).subscribe({
      next: res => {
        this.spinnerService.requestEnded();
        this.orderList = res;
      }, error: err => {
        this.spinnerService.requestEnded();
        alert("Internal Server error " + err);
      }
    })
  }

  showDetails(order: any) {
    order.showDetails = !order.showDetails;
  }

  paymentByCash(order: any, isCash: boolean) {
    order.isCash = isCash;
  }

  private getOrderByStatus(): string {
    switch (this.orderType) {
      case "Pending Invoice": return "PENDING"
      case "Completed Invoice": return "COMPLETE"
      case "All Invoice": return "ALL"
      default: return "PENDING";
    }
  }

  private getApiUrlByUserType(role:string):string{
    switch (role) {
      case "ADMIN": return "getAllOrderByStatus"
      case "USER": return "getUserOrderByStatus"
      default: return "getUserOrderByStatus"
    } 
  }

}
