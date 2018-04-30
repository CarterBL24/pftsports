import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { TrainerLoginPage } from '../trainer-login/trainer-login';
import { TrainerProfilePage } from '../trainer-profile/trainer-profile';
//import { TrainerSearchPage } from '../trainer-search/trainer-search';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
declare let cordova: any;

@Component({
  selector: 'page-trainer-registry',
  templateUrl: 'trainer-registry.html'
})
export class TrainerRegistryPage {

  imageURI: any;
  imageFileName: any;

  constructor(private camera: Camera, private fileTransfer: FileTransfer, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public toast: ToastController, public loadingCtrl: LoadingController, public platform: Platform) {
    this.imageFileName = 'assets/img/Gnome-stock_person-avatar-profile.png';
  }


  getImage() { //Gets images from library and uploads it as profile picture
    let toastMessage = this.toast;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.imageFileName = 'data:image/jpeg;base64,' + imageData;

    }, (error) => {
      let toast = toastMessage.create({
        message: error.message,
        duration: 3000,
      });
      toast.present(toast);
    });
  }

  createTrainer(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, confirmPass: string, tID: string): void { //Adds new user to database


    var num = /\d{3}\d{3}\d{4}/; //Regex for phonenumber
    var fname = /([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+/; //Regex for first name
    var lname = /([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+/; //Regex for last name
    var ending = "@umes.edu"; //Regex for umes email (trainers and members)
    var idNum = "1158";

    let nextPage = this.navCtrl;
    let toastMessage = this.toast;
    let load = this.loadingCtrl;
    let photo = this.imageFileName;

    //Conditions for credentials to be accepted into Firebase
    if (!fname.test(firstName) || firstName == null || !lname.test(lastName) || lastName == null || !email.endsWith(ending) || email == null || phoneNumber == null || !num.test(phoneNumber) || password == null || !confirmPass.match(password) || tID == null) {
      let toast = toastMessage.create({
        message: "Be sure fields are filled in correctly",
        duration: 3000,
      });
      toast.present(toast);
    } else {

      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) { //Accepting email and password

        let loader = load.create({
          content: "Please wait....",
          duration: 3000
        });

        user.sendEmailVerification().then(function () { //Sends email verification to user
          // Email sent.
        }).catch(function (error) {
          // Handle Errors here.
          let toast = toastMessage.create({
            message: error.message,
            duration: 3000,
          });

          toast.present(toast);

        });


        let userId = firebase.auth().currentUser.uid; //User information is placed in database
        firebase.database().ref('users/' + userId).set({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          UID: userId,
          photo: photo,
          available: 'no'
        });

        loader.present().then(function (navCtrl) {
          nextPage.push(TrainerLoginPage, user);
        });

      }).catch(function (error) {
        // Handle Errors here.
        let toast = toastMessage.create({
          message: error.message,
          duration: 3000,
        });

        toast.present(toast);

      });
    }
  }

    goToTrainerLogin(params) {
    if (!params) params = {};
    this.navCtrl.push(TrainerLoginPage);
  }
}
