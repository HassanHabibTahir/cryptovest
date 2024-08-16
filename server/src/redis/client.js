import { Client } from 'redis-om';
import { createClient } from 'redis';

const url = process.env.REDIS_URL;

export const redisConnection = createClient({ url });
export let redisClient;
(async () => {
  await redisConnection.connect();
  redisClient = await new Client().use(redisConnection);
  redisConnection.on('error ', (error) =>
    console.log('redis error :(' + error),
  );
})();
