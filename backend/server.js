const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection & Server Start
const startServer = async () => {
  let mongodbUri = process.env.MONGODB_URI;

  // Automatically use local persistent MongoDB if no remote URI is detected
  if (!mongodbUri || mongodbUri.includes('localhost') || mongodbUri.includes('127.0.0.1')) {
    try {
      const mongod = await MongoMemoryServer.create({
        instance: {
          dbPath: path.join(__dirname, 'data'),
          storageEngine: 'wiredTiger',
        }
      });
      mongodbUri = mongod.getUri();
      console.log('🚀 Using Local Persistent MongoDB (./data)');
    } catch (err) {
      console.error('Failed to start local MongoDB:', err);
    }
  }

  mongoose.connect(mongodbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

  // Routes
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/events', require('./routes/eventRoutes'));
  app.use('/api/registrations', require('./routes/registrationRoutes'));

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
