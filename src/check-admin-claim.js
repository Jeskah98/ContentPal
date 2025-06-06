// check-admin-claim.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Replace with your service account key file path
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Replace with your database URL if you're using Realtime Database
  // databaseURL: 'https://contentpal-aa637-default-rtdb.firebaseio.com/'
});

// Replace with the UID of the user you want to check
const targetUserId = 'zdLnVGsbRtft0WLcLS3rrR6Ff0w2';

async function checkAdminClaim() {
  try {
    const userRecord = await admin.auth().getUser(targetUserId);
    if (userRecord.customClaims && userRecord.customClaims.admin === true) {
      console.log(`User ${targetUserId} has admin claim: true`);
    } else {
      console.log(`User ${targetUserId} does NOT have admin claim: true`);
      console.log('Custom claims:', userRecord.customClaims); // Log all claims if any
    }
    process.exit(0);
  } catch (error) {
    console.error('Error fetching user record:', error);
    process.exit(1);
  }
}

checkAdminClaim();
