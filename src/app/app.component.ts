import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { BootcampSchedulePage } from '../pages/bootcamp-schedule/bootcamp-schedule';
import { TrainerSearchPage } from '../pages/trainer-search/trainer-search';
import { AvailableTrainersPage } from '../pages/available-trainers/available-trainers';
import { ConfirmTrainerPage } from '../pages/confirm-trainer/confirm-trainer';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { ViewTrainerPage } from '../pages/view-trainer/view-trainer';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { TrainerProfilePage } from '../pages/trainer-profile/trainer-profile';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { WelcomePage } from '../pages/welcome/welcome';
import firebase from 'firebase';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public myPerson = {};
  public availableTrainers = ' ';

  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = WelcomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public loadingCtrl: LoadingController, public toast: ToastController, private push: Push) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.pushSetup();

        firebase.initializeApp({
          apiKey: "AIzaSyDj4rPu23gHpJhuGJsDnl8qSx0diJZrT68",
          authDomain: "pftsports-6b82b.firebaseapp.com",
          databaseURL: "https://pftsports-6b82b.firebaseio.com",
          projectId: "pftsports-6b82b",
          storageBucket: "pftsports-6b82b.appspot.com",
          messagingSenderId: "493042941066"
        });
      });
   } signOut(): void {
      let load = this.loadingCtrl;
      let navigate = this.navCtrl;
      let toastMessage = this.toast;

      firebase.auth().signOut().then(function () {


        let loader = load.create({
          content: "Signing Out...",
          duration: 1000
        });
        loader.present().then(function (navCtrl) {
          navigate.push(WelcomePage);
        });

      }, function (error) {
        let toast = toastMessage.create({
          message: error.message,
          duration: 3000,
        });
        toast.present(toast);

      });
   }
   pushSetup() {
     const options: PushOptions = {
       android: {
         senderID: '493042941066'
       },
       ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
       },
       windows: {},
       browser: {
         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
       }
     };

     const pushObject: PushObject = this.push.init(options);


     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

     pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
   }

  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  } goToAvailableTrainers(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AvailableTrainersPage);
  }goToBootcampSchedule(params){
    if (!params) params = {};
    this.navCtrl.setRoot(BootcampSchedulePage);
  }goToTrainerSearch(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TrainerSearchPage);
  }goToViewTrainer(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ViewTrainerPage);
  }goToRequests(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RequestsPage);
  }goToProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);
  }goToContact(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ContactPage);
  } goToWelcome(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(WelcomePage);
  } goToMyEventModal(params) {
    if (!params) params = {};
    this.navCtrl.push(EventModalPage);
  } goToTrainerProfile(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(TrainerProfilePage);
  }
}
