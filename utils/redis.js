/**
 * @module utils/redis.js
 * @abstract Contains the code to setup a redis client and make same
 * available to other parts of the application.
 */
import { promisify } from 'node:util';
import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Error: ${err}`));
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return await this.getAsync(key);
  }

  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
