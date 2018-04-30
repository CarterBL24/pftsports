import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TrainerRegistryPage } from '../trainer-registry/trainer-registry';
import { TrainerLoginPage } from '../trainer-login/trainer-login';
import { TrainerProfilePage } from '../trainer-profile/trainer-profile';
import { NewUserRegistrationPage } from '../new-user-registration/new-user-registration';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  goToNewUserRegistration() { //Sends the user to the user registration page
    var load = this.loadingCtrl;
    var navigate = this.navCtrl;

    let loader = load.create({
      content: "Please Wait...",
      duration: 1000
    });
    loader.present().then(function (navCtrl) {
      navigate.push(NewUserRegistrationPage);
    });
  }

  goToTrainerRegistry() { //Sends the user to the create profile page
    var load = this.loadingCtrl;
    var navigate = this.navCtrl;

    let loader = load.create({
      content: "Please Wait...",
      duration: 1000
    });
    loader.present().then(function (navCtrl) {
      navigate.push(TrainerRegistryPage);
    });
  }

  goToTrainerLogin(params) {
    var load = this.loadingCtrl;
    var navigate = this.navCtrl;

    let loader = load.create({
      content: "Please Wait...",
      duration: 1000
    });
    loader.present().then(function (navCtrl) {
      navigate.push(TrainerLoginPage);
    });
  }

  goToTrainerProfile(params) {
    var load = this.loadingCtrl;
    var navigate = this.navCtrl;

    let loader = load.create({
      content: "Please Wait...",
      duration: 1000
    });
    loader.present().then(function (navCtrl) {
      navigate.push(TrainerProfilePage);
    });
  }
  
  goToLogin(params) {
    var load = this.loadingCtrl;
    var navigate = this.navCtrl;

    let loader = load.create({
      content: "Please Wait...",
      duration: 1000
    });
    loader.present().then(function (navCtrl) {
      navigate.push(LoginPage);
    });
  }

  goToHome(params) {
    var load = this.loadingCtrl;
    var navigate = this.navCtrl;

    let loader = load.create({
      content: "Please Wait...",
      duration: 1000
    });
    loader.present().then(function (navCtrl) {
      navigate.push(HomePage);
    });
  }
}
