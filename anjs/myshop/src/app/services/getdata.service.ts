import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  public config:any={};
  constructor(private http:HttpClient) {
    this.config = {
      dn:'http://127.20.4.30/'
    }
  }
  getApiData(api)
  {
    let url = this.config.dn+api;
    //promise rxjs
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe((response)=>{
        resolve(response);
      },(err)=>{
        reject(err);
      });
    });
  }
}
