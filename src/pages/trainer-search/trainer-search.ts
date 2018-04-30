import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { ConfirmTrainerPage } from '../confirm-trainer/confirm-trainer';
import { ViewTrainerPage } from '../view-trainer/view-trainer';
import { ChangeDetectorRef } from '@angular/core';
//import { Push } from '@ionic-native/push';


@Component({
  selector: 'page-trainer-search',
  templateUrl: 'trainer-search.html',
})

export class TrainerSearchPage {
  public sport = [];
  select:string = "";
  public classes = [];
  private isInputDisabled: boolean = true;
  items = [];
  trainer;
  testingTrainers;
  public detail = [];

  //public query: firebase.database.Reference = firebase.database().ref('trainingSession/');
  constructor(public navCtrl: NavController, public cdr: ChangeDetectorRef/*, public push: Push*/) {
    this.initializeItems();
    this.testingTrainers = this.trainer;
  }

  ionViewDidEnter(): void {
    let context = this;
    this.sport = [];
    let counter = 0;
    let query = firebase.database().ref("hobbies").orderByKey();
    query.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        // key will be "ada" the first time and "alan" the second time
        let childData = childSnapshot.val();
        context.sport[counter] = {
          key: childSnapshot.key,
          classes: childData
        };
        counter++;
        // childData will be the actual contents of the child
      });
    });
  }

   onChange(CValue: string) {
    let classesKey, count = 0;
    this.isInputDisabled = false;
    let context = this;
    context.classes = [];

    for (let i = 0; i < context.sport.length; i++) {
      if (context.sport[i].key === CValue) {

        for (classesKey in context.sport[i].classes) {
          context.classes[count] = classesKey + ": " + context.sport[i].classes[classesKey];
          count++;
        }
      }
    }
  }

    /*classChange(Value: string) {
    let test2 = /^[^\:]+/.exec(Value.toLowerCase());
    let test = this.trainer;
    test = test.filter((classData) => {
      return classData.data.toLowerCase().includes(test2[0])
    });


    this.testingTrainers = test;
  }*/

 //ionViewDidLoad() {
  initializeItems(): void {
    let context = this;
    // let counter = 0;
    this.trainer = [];
    let query2 = firebase.database().ref("trainingSession").orderByKey();
    query2.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        let childData = childSnapshot.val();
        // context.items[counter] = childData;
        const personRef: firebase.database.Reference = firebase.database().ref('users/' + childData.UID);
        personRef.on('value', personSnapshot => {
          context.trainer.push({
            name: childData.name,
            location: childData.location,
            data: childData.classes.toString(),
            person: personSnapshot.val()
          });
        })
        // childData will be the actual contents of the child
        // counter++; 
      })
    })
    //}
  }


  //Returns items that were searched in the searchbar
  getItems(ev) {
    let context = this;
    let val = ev.target.value;
    let test = this.trainer;
    if (val && val.trim() != '') {

      test = test.filter((trainer) => {
        return trainer.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }

    this.testingTrainers = test;
    console.log(test);
  }

  //User clicks request trainer button...(event) happens
  requestTrainer(payload): void {
    this.navCtrl.push(ConfirmTrainerPage, payload);
  }

  trainingDetails(UID: string): void {

  }

  //User clicks view trainer button...(event) happens
  goToViewTrainer(payload) {
    this.navCtrl.push(ViewTrainerPage, payload)
  }
}
