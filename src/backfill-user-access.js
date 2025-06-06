// backfill-user-access.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Replace with your service account key file path
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://contentpal-aa637-default-rtdb.firebaseio.com/'
});

const db = admin.firestore();

async function backfillUserAccess() {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      console.log('No users found.');
      return;
    }

    const batch = db.batch();
    let updateCount = 0;

    snapshot.forEach(doc => {
      const userData = doc.data();
      const userId = doc.id;

      // Check if access fields are missing
      if (userData.dashboardAccess === undefined || userData.creatorToolsAccess === undefined) {
        const userRef = usersRef.doc(userId);
        const updateData = {};

        if (userData.dashboardAccess === undefined) {
          updateData.dashboardAccess = true; // Set your desired default value
        }
        if (userData.creatorToolsAccess === undefined) {
          updateData.creatorToolsAccess = true; // Set your desired default value
        }

        if (Object.keys(updateData).length > 0) {
          batch.update(userRef, updateData);
          updateCount++;
          console.log(`Preparing to update user ${userId} with data:`, updateData);
        }
      }
    });

    if (updateCount > 0) {
      console.log(`Committing batch update for ${updateCount} users.`);
      await batch.commit();
      console.log('Backfill complete.');
    } else {
      console.log('No users needed backfilling.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error during backfill:', error);
    process.exit(1);
  }
}

backfillUserAccess();
