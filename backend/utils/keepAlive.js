const cron = require('node-cron');
const storage = require('../config/supabase');

const pingSupabase = async () => {
  try {
    await storage.listBuckets();
    console.log('[keep-alive] Supabase pinged successfully');
  } catch (err) {
    console.error('[keep-alive] Supabase ping failed:', err.message);
  }
};

// Run every 3 days at midnight
const startKeepAlive = () => {
  cron.schedule('0 0 */3 * *', pingSupabase);
  console.log('[keep-alive] Supabase keep-alive cron started (every 3 days)');
};

module.exports = startKeepAlive;
