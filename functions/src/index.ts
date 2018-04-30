import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.RequestNotification = functions.firestore
  .document('requests/{requestId}')
  .onCreate(async event => {

    const data = event.data.data();

    const userId = data.userId
    const requester = data.requestId

    const payload = {
      notification: {
        title: 'New Requester',
        body: '${requester} is requesting to be trained!'
      }
    }
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)



    const devices = await devicesRef.get()

    const tokens = []

    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens,payload)

  });

