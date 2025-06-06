// set-initial-admin.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Replace with your service account key file path
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://contentpal-aa637-default-rtdb.firebaseio.com/'
});

// Replace with the UID of the user you want to make an admin
const targetUserId = 'zdLnVGsbRtft0WLcLS3rrR6Ff0w2';

async function setInitialAdmin() {
  try {
    await admin.auth().setCustomUserClaims(targetUserId, { admin: true });
    console.log(`Successfully set admin claim for user: ${targetUserId}`);
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin claim:', error);
    process.exit(1);
  }
}

setInitialAdmin();
