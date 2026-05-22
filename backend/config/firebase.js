const admin = require('firebase-admin');
require('dotenv').config();

let db;
try {
  if (process.env.FIREBASE_CREDENTIALS) {
    // Parse service account JSON from environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('[FIREBASE] ✓ Initialized Firestore using env credentials.');
  } else {
    // Fallback to local service account file for development
    const serviceAccount = require('../firebase-service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('[FIREBASE] ✓ Initialized Firestore using local service account file.');
  }
  db = admin.firestore();
} catch (error) {
  console.error('\n╔══════════════════════════════════════════════════════════╗');
  console.error('║  FATAL: Firebase Admin SDK initialization failed       ║');
  console.error(`║  Error: ${error.message.padEnd(48)} ║`);
  console.error('╚══════════════════════════════════════════════════════════╝\n');
  process.exit(1);
}

module.exports = db;
