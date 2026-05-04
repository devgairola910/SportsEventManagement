const mongoose = require('mongoose');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Event = require('./models/Event');

const events = [
  {
    name: 'Annual Football Championship',
    description: 'The biggest football event of the year! Join us for a thrilling tournament featuring the best teams from all departments. Expect high intensity, great skills, and an electric atmosphere.',
    date: new Date('2026-06-15T10:00:00'),
    venue: 'Main University Stadium',
    maxParticipants: 200,
    category: 'Football',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000'
  },
  {
    name: 'Varsity Basketball League',
    description: 'Come witness the height of campus basketball. Fast-paced action, incredible dunks, and strategic plays. Registration is open for both men\'s and women\'s divisions.',
    date: new Date('2026-07-10T14:30:00'),
    venue: 'Indoor Sports Complex - Court A',
    maxParticipants: 100,
    category: 'Basketball',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000'
  },
  {
    name: 'Intra-College Cricket Cup',
    description: 'A weekend of classic cricket. 20-over matches, professional umpiring, and a chance to represent your year in the finals. Refreshments provided for all participants.',
    date: new Date('2026-05-25T09:00:00'),
    venue: 'West Campus Grounds',
    maxParticipants: 150,
    category: 'Cricket',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000'
  },
  {
    name: 'Spring Track & Field Meet',
    description: 'Speed, strength, and stamina. Compete in various events including 100m sprint, long jump, and relay races. Medals and certificates for all top 3 finishers.',
    date: new Date('2026-05-30T08:00:00'),
    venue: 'Athletics Track',
    maxParticipants: 300,
    category: 'Athletics',
    imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=1000'
  },
  {
    name: 'Badminton Singles Open',
    description: 'A competitive singles tournament for all skill levels. Show your agility and precision on the court. Guaranteed minimum of 3 matches per participant.',
    date: new Date('2026-06-05T16:00:00'),
    venue: 'Indoor Sports Complex - Hall B',
    maxParticipants: 64,
    category: 'Indoor',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1000'
  }
];

const seedDB = async () => {
  let mongod;
  try {
    console.log('🌱 Starting local DB for seeding...');
    mongod = await MongoMemoryServer.create({
      instance: {
        dbPath: path.join(__dirname, 'data'),
        storageEngine: 'wiredTiger',
      }
    });
    
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('Connected to local persistent DB');
    
    await Event.deleteMany({});
    await Event.insertMany(events);
    
    console.log('✅ Database Seeded Successfully with 5 events!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    if (mongoose.connection) await mongoose.connection.close();
    if (mongod) await mongod.stop();
    process.exit();
  }
};

seedDB();
