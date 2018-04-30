import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { MessagesPage } from '../messages/messages';
import firebase from 'firebase';
import { ChangeDetectorRef } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-trainer-profile',
  templateUrl: 'trainer-profile.html'
})
export class TrainerProfilePage {
  
  public classes = [];
  public locations = [];
  public selectedClasses = [];
  private isButtonDisabled: boolean = true;
  private selectEnabled: boolean = false;
  private checker = false;
  public myPerson = {

    firstName: "",
    lastName: "",

  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public cdr: ChangeDetectorRef, public loadingCtrl: LoadingController, public toast: ToastController) {
    }

    ionViewDidEnter(): void { //Creates snapshot and sends data to profile page, created by Aaren, Tyrique, and Olivier
      var userId = firebase.auth().currentUser.uid;
      const personRef: firebase.database.Reference = firebase.database().ref('users/' + userId);

      personRef.on('value', personSnapshot => {
        this.myPerson = personSnapshot.val();
      });
    }

    ionViewDidLoad() { //Allows users to select from sports, locations, and details
      // this.isButtonDisabled = true;
      // this.selectEnabled = false;
      // this.checker = false;
      let data, counter = 0, count = 0;
      let context = this;
      context.classes = [];

      let query = firebase.database().ref("sports").orderByKey();
      query.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          let childData = childSnapshot.val();

          for (data in childData) {
            context.classes[count] = {
              checked: false,
              selectSports: data
            };
            count++;
          }
          // childData will be the actual contents of the child
        });
      });

      let queryLocations = firebase.database().ref("location").orderByKey();
      queryLocations.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          let childData = childSnapshot.val();

          context.locations[counter] = childData;
          counter++;

          // childData will be the actual contents of the child
        });


      });
    }

    checkSports(select: string, details: string): void {
      //let context = this;
      // let trainingClasses = "";
      let trainingClasses = [];
      let classesCount = 0;
      for (let i = 0; i < this.classes.length; i++) {
        if (this.classes[i].checked) {
          // trainingClasses += this.classes[i].selectClass + " ";
          trainingClasses[classesCount] = this.classes[i].selectSports;
          classesCount++;
        }
      }
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId).update({
        available: true
      });

      const personRef: firebase.database.Reference = firebase.database().ref('users/' + userId);
      personRef.on('value', personSnapshot => {
        this.myPerson = personSnapshot.val();
      });

      firebase.database().ref('trainingSession/' + userId).set({
        name: this.myPerson.firstName  + " " + this.myPerson.lastName,
        UID: userId,
        location: select,
        details: details,
        classes: trainingClasses.join(',')
      });

    }
    onChange() {

      this.selectEnabled = true;
      if (this.selectEnabled === true && this.checker === true) {
        this.isButtonDisabled = false;
        this.cdr.detectChanges();

      }

    }

    notify(): void {
      this.checker = false;
      for (let i = 0; i < this.classes.length; i++) {
        if (this.classes[i].checked) {
          this.checker = true;
        }
      }
      if (this.selectEnabled === true && this.checker === true) {
        this.isButtonDisabled = false;
        this.cdr.detectChanges();

      } else {
        this.isButtonDisabled = true;
        this.cdr.detectChanges();

      }
    }

    signOut(): void {
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
    goToMessages(params) {
      if (!params) params = {};
      this.navCtrl.push(MessagesPage);
    }
    goToWelcome(params) {
      if (!params) params = {};
      this.navCtrl.push(WelcomePage);
    }
}
