import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServicService {

  // baseURL:string = "https://deliverytracker-az2r.onrender.com";

    baseURL:string = "http://localhost:8080";


  constructor(private http: HttpClient) { 
  }

  getUserByMobileNumber(mobileNumber:string): Observable<any> {
    return this.http.get(this.baseURL + `/user/getUserByMobileNumber/${mobileNumber}`);
  }

  getOrderByStatusAndUserId(orderStatus:string,userId:number): Observable<any> {
    return this.http.get(this.baseURL + `/order/getAllOrderByStatus/${orderStatus}/${userId}`);
  }

  getAllOrderByUserId(userId:number): Observable<any> {
    return this.http.get(this.baseURL + `/order/getAllOrderByUserId/${userId}`);
  }

  getOrderByStatus(orderStatus:string): Observable<any> {
    return this.http.get(this.baseURL + `/order/getAllOrderByStatus/${orderStatus}`);
  }

  listUser(): Observable<any> {
    return this.http.get(this.baseURL + `/user/listUser`);
  }

  addOrder(order:any): Observable<any> {
    return this.http.post(this.baseURL + `/order/addOrder`,order);
  }

  deliverOrder(order:any): Observable<any> {
    return this.http.post(this.baseURL + `/order/deliverOrder`,order);
  }

}
