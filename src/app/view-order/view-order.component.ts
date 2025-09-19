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


  constructor(private apiService: ApiServicService
    , private localStorage: LocalStorageService
    , private spinnerService: SpinnerService) {
    this.userId = Number(this.localStorage.getData("userId"));

  }

  ngOnInit(): void {
    // Pending Invoice
    const userRole = this.localStorage.getData("userRole");
    this.spinnerService.resetSpinner();
    this.spinnerService.requestStarted();
    this.orderList = [];
    const orderStatus = this.getOrderByStatus();
    const userId = userRole === 'ADMIN' ? 0 : this.userId;

    if ('ALL' === orderStatus) {
      this.apiService.getAllOrderByUserId(userId).subscribe({
        next: res => {
          this.spinnerService.requestEnded();
          this.orderList = res;
        }, error: err => {
          this.spinnerService.requestEnded();
          alert("Internal Server error " + err);
        }
      })
    } else {
      this.apiService.getOrderByStatusAndUserId(orderStatus, userId).subscribe({
        next: res => {
          this.spinnerService.requestEnded();
          this.orderList = res;
        }, error: err => {
          this.spinnerService.requestEnded();
          alert("Internal Server error " + err);
        }
      })
    }

  }




  deliverOrder(order: any) {
    const deliverOrder = {
      orderId: order.orderId,
      cash: order.isCash,
      recievedAmount: order.recievedAmount,
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

}
