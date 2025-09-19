import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicService } from '../service/api-servic.service';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private apiService:ApiServicService,
              private spinnerService:SpinnerService,
              private routing:Router,
              private localStorage:LocalStorageService) {
    this.loginForm = fb.group({
      mobileNumber: ['', Validators.compose([Validators.required])]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.spinnerService.resetSpinner();
    this.spinnerService.requestStarted();
    const mobileNumber = this.loginForm.value.mobileNumber;
    this.apiService.getUserByMobileNumber(mobileNumber).subscribe({next:res=>{
      this.spinnerService.requestEnded();
      if(res){
        const userRole = res.role;
        this.localStorage.saveData("userId",res.userId);
        this.localStorage.saveData("userRole",userRole);
        this.routing.navigateByUrl('/home');
        return;
      }
      alert("No Valid User Found Please try with registered mobile number")
    },error:err=>{
      this.spinnerService.requestEnded();
      alert("Error Occurred while fetching data "+err);
    }})
  }

}
