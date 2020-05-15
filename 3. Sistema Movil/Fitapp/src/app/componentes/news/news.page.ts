import { Component, OnInit } from '@angular/core';
/*NOTIFICACIONES*/
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(private fcm: FCM) { }

  ngOnInit() {
    
    this.fcm.onNotification().subscribe(
      data => {
        console.log('aqui');
        alert(data);
      }
    );
    this.fcm.getToken().then(token => {
      console.log(token);
      alert(token);
    });
  }

}
