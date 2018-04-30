import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import { RequestsPage } from '../requests/requests';
import firebase from 'firebase';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  baseUrl = "https://api.api.ai/v2/";
  twilioBseUrl = "https://tassha.herokuapp.com/twilio/";
  trainer = ""

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public http:Http) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.http = http;
    let theTrainer: string = this.navParams.get('UID')
    this.trainer = theTrainer;
  }

  /*createEvent(thisevent){

    var eventId = firebase.auth().currentUser.uid;
    firebase.database().ref('events/' + eventId).set({
      startTime: startTime,
      endTime: endTime,
      EID: eventId
    });
  }*/

  sendText(message)
  {

    // send dealer text

    let headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');

   


    let url = this.twilioBseUrl+message;

    this.http.post(url, JSON.stringify({}), { headers: headers })

      .map(res => res.json())

      .subscribe(data => {

        console.log("API.ai: " + JSON.stringify(data));

        console.log("Twilio Text: " + data);

      });

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
    var eventId = firebase.auth().currentUser.uid;
    firebase.database().ref('events/' + eventId).set({
      startTime: this.event.startTime,
      endTime: this.event.endTime,
      allDay: this.event.allDay,
      EID: eventId,
      trainerID: this.trainer
    });

    this.sendText("Training Session requested " + "From: " + this.event.startTime + "To: " + this.event.endTime);

    this.navCtrl.push(RequestsPage);
  }

}
