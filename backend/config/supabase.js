const { StorageClient } = require('@supabase/storage-js');

const storage = new StorageClient(
  `${process.env.SUPABASE_URL}/storage/v1`,
  {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  }
);

module.exports = storage;
