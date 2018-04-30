import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { FcmProvider } from '../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
   }
  showEvents() {

   }

  ionViewDidLoad() {
    /*this.fcm.getToken();

    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          //message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
      .subscribe();*/
      console.log('ionViewDidLoad RequestsPage');
    }

}
