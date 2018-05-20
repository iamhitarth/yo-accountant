const functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.accountantIntent = functions.https.onRequest((request, response) => {
  const intent = request.query.intent || 'defaultIntent';
  const intentName = request.body.queryResult.intent.displayName;
  console.log('Request received for intent', request.body.queryResult.intent.displayName)
  return admin.database().ref('/intent').set(intentName || intent).then((snapshot) => {
    console.log(snapshot)
    return response.send(200, 'Firebase db changed!');
  });
});
