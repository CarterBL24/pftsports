import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfirmTrainerPage } from '../confirm-trainer/confirm-trainer';
import { ConfirmationPage } from '../confirmation/confirmation';
import firebase from 'firebase';
@Component({
  selector: 'page-view-trainer',
  templateUrl: 'view-trainer.html'
})
export class ViewTrainerPage {
public myPerson = {};
public trainerDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   let UID: string = this.navParams.get('UID');

    const personRef: firebase.database.Reference = firebase.database().ref('users/' + UID);
    personRef.on('value', personSnapshot => {
      this.myPerson =  personSnapshot.val();


    });
    const trainerRef: firebase.database.Reference = firebase.database().ref('trainingSession/' + UID);
    trainerRef.on('value', personSnapshot => {
      this.trainerDetails =  personSnapshot.val()
    });
  }
  goToConfirmTrainer(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmTrainerPage);
  }goToConfirmation(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmationPage);
  }
}
