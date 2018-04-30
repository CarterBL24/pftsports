import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { NewUserRegistrationPage } from '../new-user-registration/new-user-registration';
import { ProfilePage } from '../profile/profile';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public toast: ToastController, public loadingCtrl: LoadingController) {
  }

  loginUser(email: string, password: string): void { //Logins in user with email and password
    var navigate = this.navCtrl;
    var toastMessage = this.toast;
    var load = this.loadingCtrl;
    var ending = "@umes.edu";

    if (email.endsWith(ending)) {

      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {

        let loader = load.create({
          content: "Loading. Please wait...",
          duration: 3000
        });

        loader.present().then(function (navCtrl) {
          navigate.push(HomePage, user);
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

    } else {
      let toast = toastMessage.create({
        message: "Incorrect Email Format",
        duration: 3000,
      });
      toast.present(toast);
    }
  }

  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
  goToNewUserRegistration(params) {
    if (!params) params = {};
    this.navCtrl.push(NewUserRegistrationPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
