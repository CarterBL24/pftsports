import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewTrainerPage } from '../view-trainer/view-trainer';
import { ConfirmTrainerPage } from '../confirm-trainer/confirm-trainer';
import { ConfirmationPage } from '../confirmation/confirmation';
import { ProfilePage } from '../profile/profile';
import { DomSanitizer } from '@angular/platform-browser';
import firebase from 'firebase';
import { Directive } from '@angular/core';
import { TrainerSearchPage }  from '../trainer-search/trainer-search';
@Component({
  selector: 'page-available-trainers',
  templateUrl: 'available-trainers.html',

})

@Directive({
  selector: '[TrainerListComponent]'
})
export class AvailableTrainersPage {
  public availableTrainers = '';
  public users = [];

  public first = [];
  public last = [];
  public key = [];
  public photo = [];
  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer) {
  }
  goToViewTrainer(params){
    if (!params) params = {};
    this.navCtrl.push(ViewTrainerPage);
  }goToConfirmTrainer(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmTrainerPage);
  }goToConfirmation(params){
    if (!params) params = {};
    this.navCtrl.push(ConfirmationPage);
  }goToProfile(params){
    if (!params) params = {};
    this.navCtrl.push(ProfilePage);
  }goToTrainerSearch(params){
    if (!params) params = {};
    this.navCtrl.push(TrainerSearchPage);
  }

  ionViewDidEnter() {
    var context = this;
    this.users = [];

    var counter = 0;
    var query = firebase.database().ref("users").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var childData = childSnapshot.val();

          context.users[counter] = {
            firstName: childData.firstName,
            lastName: childData.lastName,
            key: childSnapshot.key,
            photo: childData.photo
          };
          counter++;
          // childData will be the actual contents of the child

        });
      });


  }
  //
  // assembleHTMLItem() {
  //   var strHTML = '<ion-item><ion-thumbnail item-start><img src="assets/img/i6kQDFwLSBy9hdV9KMaC_Gnome-stock_person-avatar-profile.png" /></ion-thumbnail><h2>PJ Herman</h2><p>Hayao Miyazaki • 1988</p><button ion-button clear item-end>View</button></ion-item>';
  //   return this._sanitizer.bypassSecurityTrustHtml(strHTML);
  // }

}
