import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrainerProfilePage } from '../trainer-profile/trainer-profile';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-trainer-login',
  templateUrl: 'trainer-login.html'
})
export class TrainerLoginPage {

  constructor(public navCtrl: NavController, public toast: ToastController, public loadingCtrl: LoadingController) {
  }

  loginUser(email: string, password: string, tID: string): void { //Logins in user with email and password
    var navigate = this.navCtrl;
    var toastMessage = this.toast;
    var load = this.loadingCtrl;
    var ending = "@umes.edu";

    if (email.endsWith(ending)) {

      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {

        let loader = load.create({
          content: "Loading. Please wait...",
          duration: 1500
        });

        loader.present().then(function (navCtrl) {
          navigate.push(TrainerProfilePage, user);
        });

      }).catch(function (error) {
        // Handle Errors here

        let toast = toastMessage.create({
          message: error.message,
          duration: 3000,
        });
        toast.present(toast);
        // ...

      });
    }else {
      let toast = toastMessage.create({
        message: "Incorrect Email Format",
        duration: 3000,
      });
      toast.present(toast);
    }
  }
}
