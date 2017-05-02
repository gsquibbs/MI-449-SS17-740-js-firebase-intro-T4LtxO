// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBpmcgtZRwvAvR_v0gEz0gvFC_Y1e4UbDk',
  authDomain: 'woofer-83fad.firebaseapp.com',
  databaseURL: 'https://woofer-83fad.firebaseio.com',
  projectId: 'woofer-83fad',
  storageBucket: 'woofer-83fad.appspot.com',
  messagingSenderId: '817739948087'
}

firebase.initializeApp(config)

firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  firebase.database().ref('woofs').push(woof)
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).

function readWoofsInDatabase () {
  firebase.database().ref('woofs')
    .on('child_added', function (addWoofSnap) {
      addWoofRow(addWoofSnap.key, addWoofSnap.val())
    })

  firebase.database().ref('woofs')
    .on('child_changed', function (updateWoofSnap) {
      updateWoofRow(updateWoofSnap.key, updateWoofSnap.val())
    })

  firebase.database().ref('woofs')
    .on('child_removed', function (removeWoofSnap) {
      deleteWoofRow(removeWoofSnap.key)
    })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs').child(woofKey).child('text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
