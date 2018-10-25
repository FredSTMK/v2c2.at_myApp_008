// https://itnext.io/how-to-backup-and-restore-cloud-firestore-d16537374640

var admin = require("firebase-admin");
var fs = require('fs');
var serviceAccount = require("./_key/myapp-07-serviceKey-83a8b-ce991d0308a6.json");

var collectionName = process.argv[2];

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myapp-07-83a8b.firebaseio.com"
});

var db = admin.firestore();

var data = {};
data[collectionName] = {};

var results = db.collection(collectionName)
.get()
.then(snapshot => {
  snapshot.forEach(doc => {
    data[collectionName][doc.id] = doc.data();
  })
  return data;
})
.catch(error => {
  console.log(error);
})

results.then(dt => {
  // Write collection to JSON file
  fs.writeFile("firestore-export.json", JSON.stringify(dt), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
})