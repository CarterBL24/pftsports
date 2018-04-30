import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { TrainerRegistryPage } from '../pages/trainer-registry/trainer-registry';
import { TrainerProfilePage } from '../pages/trainer-profile/trainer-profile';
import { NewUserRegistrationPage } from '../pages/new-user-registration/new-user-registration';
import { HomePage } from '../pages/home/home';
import { TrainerSearchPage } from '../pages/trainer-search/trainer-search';
import { AvailableTrainersPage } from '../pages/available-trainers/available-trainers';
import { LoginPage } from '../pages/login/login';
import { BootcampSchedulePage } from '../pages/bootcamp-schedule/bootcamp-schedule';
import { RequestsPage } from '../pages/requests/requests';
import { TrainerLoginPage } from '../pages/trainer-login/trainer-login';
import { ProfilePage } from '../pages/profile/profile';
import { MessagesPage } from '../pages/messages/messages';
import { NgCalendarModule } from 'ionic2-calendar';
import { ContactPage } from '../pages/contact/contact';
import { ConfirmTrainerPage } from '../pages/confirm-trainer/confirm-trainer';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { ViewTrainerPage } from '../pages/view-trainer/view-trainer';
import { HttpModule } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Transfer } from '@ionic-native/transfer';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

const firebase = {
  apiKey: "AIzaSyDj4rPu23gHpJhuGJsDnl8qSx0diJZrT68",
  authDomain: "pftsports-6b82b.firebaseapp.com",
  databaseURL: "https://pftsports-6b82b.firebaseio.com",
  projectId: "pftsports-6b82b",
  storageBucket: "pftsports-6b82b.appspot.com",
  messagingSenderId: "493042941066"
}

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    TrainerRegistryPage,
    TrainerProfilePage,
    AvailableTrainersPage,
    NewUserRegistrationPage,
    HomePage,
    TrainerSearchPage,
    LoginPage,
    BootcampSchedulePage,
    RequestsPage,
    TrainerLoginPage,
    ProfilePage,
    MessagesPage,
    ContactPage,
    ViewTrainerPage,
    ConfirmTrainerPage,
    EventModalPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    TrainerRegistryPage,
    TrainerProfilePage,
    AvailableTrainersPage,
    NewUserRegistrationPage,
    HomePage,
    TrainerSearchPage,
    LoginPage,
    BootcampSchedulePage,
    RequestsPage,
    TrainerLoginPage,
    ProfilePage,
    MessagesPage,
    ContactPage,
    ViewTrainerPage,
    ConfirmTrainerPage,
    EventModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileTransferObject,
    File,
    Transfer,
    Camera,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Push,
    FcmProvider,
    Firebase
  ]
})
export class AppModule {}
