const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRoute = require('./routes/users');
const plantsRoute = require('./routes/plants');
const wateringRoute = require('./routes/watering');
const fertilizerRoute = require('./routes/fertilizer');
const growthRoute = require('./routes/growth');

const { startReminders } = require('./utils/reminders');

const app = express();
app.use(cors());
app.use(express.json());

// Basic health
app.get('/', (req, res) => res.json({ ok: true, msg: 'Green Tracker API' }));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/plants', plantsRoute);
app.use('/api', wateringRoute);
app.use('/api', fertilizerRoute);
app.use('/api', growthRoute);

// Start reminders (cron)
startReminders();

// 🔥 Change the port here — DO NOT use 5000 because it's in use
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Green Tracker backend listening on port ${PORT}`);
});