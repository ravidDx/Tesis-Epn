import { Injectable } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';

declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }


  Success(title: string, meassage?:string){
    //toastr.Success(title,meassage)
    //this.toastr.success("Hello, I'm the toastr message.")
    toastr.success(title)
  }
  Info(title: string, meassage?:string){
    //toastr.Success(title,meassage)
    toastr.info(title)
  }
  Warning(title: string, meassage?:string){
    //toastr.Success(title,meassage)
    toastr.warning(title)
  }
  Error(title: string, meassage?:string){
    //toastr.Success(title,meassage)
    toastr.error(title)
  }
}
