import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(public http: HttpClient, public firebaseNative: Firebase, public afs: AngularFirestore, private platform: Platform) {
    console.log('Hello FcmProvider Provider');
  }

  async getToken() {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      const perm = this.firebaseNative.grantPermission();
    }

    if (!this.platform.is('cordova')) {
      // TODO add PWA support with angularfire2
    }
    return this.saveTokenToFirestore(token);
  }

  private saveTokenToFirestore(token) {
    if (!token) {
      return;
    }

    const devicesRef = this.afs.collection('devices');
    const docData = {
      token,
      userId: 'test user',
    };
    return devicesRef.doc(token).set(docData);
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
