require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// ── ENV CHECK ──────────────────────────────────────────────
// Hard-fail if MONGO_URI is missing — don't waste time booting
if (!process.env.MONGO_URI) {
  console.error('\n╔══════════════════════════════════════════════════════════╗');
  console.error('║  FATAL: MONGO_URI is not defined in .env                ║');
  console.error('║  The server cannot start without a database connection. ║');
  console.error('║  Create a .env file with: MONGO_URI=mongodb://...       ║');
  console.error('╚══════════════════════════════════════════════════════════╝\n');
  process.exit(1);
}

const app = express();

// CORS — allow Vite dev server (5173 primary, 5174 fallback)
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Start Express FIRST so frontend never gets CONNECTION_REFUSED
app.listen(PORT, () => {
  console.log(`[EXPRESS] Server running on port ${PORT}`);
});

// ── MONGOOSE CONNECTION ────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;

console.log(`[MONGO] Attempting connection to: ${MONGO_URI.replace(/\/\/.*@/, '//<credentials>@')}`);

// Disable Mongoose buffering — operations will throw immediately
// instead of silently queuing for 10s when DB is down
mongoose.set('bufferCommands', false);

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,  // Fail fast instead of 30s default
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('[MONGO] ✓ Connected to MongoDB successfully');
    console.log(`[MONGO]   Database: ${mongoose.connection.db.databaseName}`);
    console.log(`[MONGO]   Host:     ${mongoose.connection.host}`);
    console.log(`[MONGO]   State:    ${mongoose.connection.readyState} (1 = connected)`);
  })
  .catch((err) => {
    console.error('\n[MONGO] ✗ CONNECTION FAILED');
    console.error(`[MONGO]   Error name:    ${err.name}`);
    console.error(`[MONGO]   Error message: ${err.message}`);
    if (err.code) console.error(`[MONGO]   Error code:    ${err.code}`);
    if (err.codeName) console.error(`[MONGO]   Code name:     ${err.codeName}`);
    
    // Provide human-readable diagnostics
    if (err.message.includes('ECONNREFUSED')) {
      console.error('[MONGO]   → MongoDB is not running locally. Start it with: mongod');
    } else if (err.message.includes('authentication failed') || err.message.includes('AuthenticationFailed')) {
      console.error('[MONGO]   → Wrong username/password in your MONGO_URI');
    } else if (err.message.includes('getaddrinfo ENOTFOUND') || err.message.includes('querySrv ENOTFOUND')) {
      console.error('[MONGO]   → Cannot resolve the hostname. Check your Atlas cluster URL');
    } else if (err.message.includes('timed out')) {
      console.error('[MONGO]   → Network timeout. Check your IP whitelist on Atlas (0.0.0.0/0 for dev)');
    }
    console.error('[MONGO]   The server is still running — DB routes will return 503.\n');
  });

// Log connection state changes for debugging
mongoose.connection.on('disconnected', () => {
  console.warn('[MONGO] Connection lost — reconnecting...');
});
mongoose.connection.on('reconnected', () => {
  console.log('[MONGO] ✓ Reconnected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('[MONGO] Connection error:', err.message);
});
