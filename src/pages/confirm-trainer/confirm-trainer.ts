import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { EventModalPage } from '../event-modal/event-modal';
import 'rxjs/Rx';

@Component({
  selector: 'page-confirm-trainer',
  templateUrl: 'confirm-trainer.html'
})
export class ConfirmTrainerPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  daySelectedAndUID = {};

  /********
  //accesToken = "4ae71b3ed5dbdb947fd1c2d8a9dfabf0";
  //baseUrl = "https://api.api.ai/v1/";
  //twilioBseUrl = "https://tassha.herokuapp.com/twilio/";
  ********/
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  public myPerson = {};

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public navParams: NavParams) { }

  addEvent() {
    let UID: string = this.navParams.get('UID');

    this.daySelectedAndUID = { UID: UID, selectedDay: this.selectedDay }

    this.navCtrl.push(EventModalPage, this.daySelectedAndUID);

  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
