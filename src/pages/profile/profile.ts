import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public myPerson = {};


  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(): void { //Creates snapshot and sends data to profile page
    var userId = firebase.auth().currentUser.uid;
    const personRef: firebase.database.Reference = firebase.database().ref('users/' + userId);

    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
  }
}
