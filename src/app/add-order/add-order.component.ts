import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServicService } from '../service/api-servic.service';
import { LocalStorageService } from '../service/local-storage.service';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  @Input()
  pageName: any;

  @Input()
  order: any;

  isEdit: boolean = false;

  profileForm: FormGroup;

  userList: any[] = [];

  constructor(private fb: FormBuilder
    , private spinner: SpinnerService
    , private apiService: ApiServicService
    , private localStorage: LocalStorageService) {
    this.profileForm = new FormGroup({
      invoiceNumber: new FormControl(null),
      shopName: new FormControl(null),
      amount: new FormControl(null),
      salesmanName: new FormControl(null),
      salesMobileNumber: new FormControl(null),
      deliveryPerson: new FormControl(null),
      orderId: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.createProfileForm();
    if (this.pageName === 'Edit Order') {
      this.order.invoiceNumber = this.order.invoiceNumber.substring(2);
      this.isEdit = true;
      this.order.deliveryPerson = this.order.user.userId;
      this.profileForm.patchValue(this.order);
    }

    this.spinner.resetSpinner();
    this.spinner.requestStarted();
    this.apiService.listUser().subscribe({
      next: res => {
        this.userList = res;
        this.spinner.requestEnded();
      }, error: err => {
        this.spinner.requestEnded();
        alert("Internal Server Error " + err);
      }
    })

  }

  get f() { return this.profileForm.controls; }

  createProfileForm() {
    this.profileForm = this.fb.group({
      invoiceNumber: ['', [Validators.required]],
      shopName: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      salesmanName: ['', [Validators.required]],
      salesMobileNumber: ['', [Validators.required, Validators.minLength(10)
        , Validators.maxLength(10), Validators.pattern('^[0-9]+$')
      ]],
      deliveryPerson: ['', [Validators.required]],
      orderId: [0]
    });
  }

  addOrder() {
    const order = this.profileForm.value;
    order.userId = this.localStorage.getData("userId");
    this.spinner.resetSpinner();
    this.spinner.requestStarted();
    order.invoiceNumber = 'ME' + order.invoiceNumber;

    if (this.isEdit) {
      order.orderId = this.order.orderId;
    }

    this.apiService.addOrder(order).subscribe({
      next: res => {
        alert("Order added Sucessfully");
        this.createProfileForm();
        this.spinner.requestEnded();
      }, error: err => {
        alert("Internal Server Error " + err);
        this.spinner.requestEnded();
      }
    })
  }

}
