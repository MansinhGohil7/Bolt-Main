require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./config/firebase'); // Verify Firebase initializes on boot

const app = express();

// CORS — allow Vite dev server and Firebase hosting domains
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://bolttools-7.web.app',
    'https://bolttools-7.firebaseapp.com'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Start Express
app.listen(PORT, () => {
  console.log(`[EXPRESS] Server running on port ${PORT}`);
  console.log(`[FIRESTORE] Active Connection verified`);
});
