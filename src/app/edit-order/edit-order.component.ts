import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServicService } from '../service/api-servic.service';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit{
  
  orderList:any[]=[];

  @Input()
  orderType:any;

  @Output()
  orderDetails = new EventEmitter();

  constructor(private apiService:ApiServicService,private loader:SpinnerService){

  }

  ngOnInit(): void {
    this.loader.resetSpinner();
    this.loader.requestStarted();
    this.orderList = [];
    this.apiService.getOrderByStatus('PENDING').subscribe({next:res=>{
      this.orderList = res;
      this.loader.requestEnded();
    },error:err=>{
      alert("Internal Server Error "+err);
      this.loader.requestEnded();
    }})
  }

  editOrder(order: any) {
    this.orderDetails.emit(order);
  }

}
