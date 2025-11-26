// utils/reminders.js

const cron = require('node-cron');
const wateringModel = require('../models/wateringModel');

// Start the daily reminder job
function startReminders() {
  cron.schedule(
    '0 8 * * *', 
    async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);

        // Make sure your wateringModel has this function
        const duePlants = await wateringModel.getPlantsDueOn(today);

        if (duePlants && duePlants.length > 0) {
          console.log(
            `[Reminder] ${duePlants.length} plant(s) need watering today: ${duePlants
              .map((p) => p.name)
              .join(', ')}`
          );

          // OPTIONAL: email or notification logic

        } else {
          console.log('[Reminder] No plants need watering today.');
        }
      } catch (err) {
        console.error('Reminder job error:', err);
      }
    },
    {
      scheduled: true,
      timezone: 'UTC',
    }
  );
}

// Export functions
module.exports = {
  startReminders,

  sendWaterReminder: (plant) => {
    console.log(`Water reminder sent for plant ID: ${plant.id}`);
  },

  sendFertilizerReminder: (plant) => {
    console.log(`Fertilizer reminder sent for plant ID: ${plant.id}`);
  }
};