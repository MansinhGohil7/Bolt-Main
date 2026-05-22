const admin = require('firebase-admin');
require('dotenv').config();

let db;
try {
  if (process.env.FIREBASE_CREDENTIALS) {
    let serviceAccount;
    try {
      // Replace literal backslash-n instances with actual newline characters
      const fixedCredentials = process.env.FIREBASE_CREDENTIALS.replace(/\\n/g, '\n');
      serviceAccount = JSON.parse(fixedCredentials);
    } catch (parseError) {
      // Fallback: parse original credentials and sanitize private_key property to avoid JSON parsing errors
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
        if (serviceAccount.private_key) {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }
      } catch (innerError) {
        throw new Error(`Failed to parse FIREBASE_CREDENTIALS. parseError: ${parseError.message}. innerError: ${innerError.message}`);
      }
    }

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
