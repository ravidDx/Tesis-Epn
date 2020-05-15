import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
/*SERVICIOS*/
import {AuthService} from '../../services/auth.service';
import {ToasterService} from '../../services/toaster.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public remember:boolean = false;
  public errorMessage: string;
  public requesting: boolean = false;
  public isInvalid:boolean = false;
 
  public isAccessInvalid:boolean = true;


  constructor(private _authService:AuthService,
              private toasterService:ToasterService,
              private _router:Router) 
  { 
    /*
        this._authService.isAuth().subscribe(
          data=>{
            //console.log(data.email);
            this.onLoginRedirect();
       
          },
          error=>{
            console.log(error);
          }

        );
        */
  }
  ngOnInit() {
  }

  onLogin():void{
    this.isInvalid=true;
    this._authService.loginEmailUser(this.email,this.password)
        .then((res)=>{
          console.log(res);
          this.getTipoUser();
        
        }).catch(err=>{
          console.log('error:',err.message);
          let msg='Email o Password que ingresaste no son validos'
          this.toasterService.Error(msg);
          this.isInvalid=false;
        });
    
  }

   onLogout(){
    return this._authService.logoutUser();
  }

  onLoginRedirect(){
    console.log('onLoginRedirect');
    const rol = localStorage.getItem('rol');
    if(rol==='super'){
      this._router.navigate(['/sadmin/inicio']);
    }else if(rol==='admin'){
      this._router.navigate(['/admin/dashboard']);
    }

    //this.isInvalid=false;
  }
  

  getTipoUser(){
    let long=0;
    this._authService.getTipoUser()
      .snapshotChanges()
      .subscribe(item =>{
        item.forEach(element =>
        {
          long++;
          let data = element.payload.toJSON();
          if(data['email'] == this.email){
            console.log(data['rol']);
            this.isAccessInvalid=false;
            localStorage.setItem('rol',data['rol']);
            this.onLoginRedirect();
          }

          
        });

        if(item.length==long && this.isAccessInvalid==true){
            let msg='No tiene Acceso al sistema';
            this.toasterService.Error(msg);
             this.isInvalid=false;
                 
        }
          
      })

      

  }


  

}
