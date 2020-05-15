import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

/*INTERFACES */
import {Noticia} from '../../interfaces/noticia.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
import {ToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  noticiaList: Noticia[]=[];

  noticia:Noticia={
    detalle:""
  }

  constructor(private _onepageService:OnepageService,
              private _http: HttpClient,
              private toasterService:ToasterService) { 

      this.getNoticias();
  }

  ngOnInit() {
  }


  getNoticias(){
    this._onepageService.getNoticias()
    .subscribe(
      data=>{
        console.log(data);
        for(let key$ in data){
          let noticiaNew = data[key$];
          noticiaNew['id']=key$;
          this.noticiaList.push(noticiaNew);            
        }
        
      },
      error=>{
        console.log(error);
      }

    );
      
  }

}
