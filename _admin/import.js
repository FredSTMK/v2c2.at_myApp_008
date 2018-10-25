// https://itnext.io/how-to-backup-and-restore-cloud-firestore-d16537374640

var admin = require("firebase-admin");

var fs = require('fs');
var serviceAccount = require("./_key/myapp-07-serviceKey-83a8b-ce991d0308a6.json");

var fileName = process.argv[2];

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myapp-07-83a8b.firebaseio.com"
});

var db = admin.firestore();

var collectionName = '';


fs.readFile(fileName, 'utf8', function(err, data){
  if(err){
    return console.log(err);
  }

  // Turn string from file to an Array
  dataArray = JSON.parse(data);

  for(var index in dataArray){
    collectionName = index;
    for(var doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
        db.collection(collectionName).doc(doc)
        .set(dataArray[index][doc])
        .then(() => {
          console.log('Document is successed adding to firestore!');
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }

})