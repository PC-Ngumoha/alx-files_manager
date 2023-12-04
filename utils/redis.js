import { promisify } from 'node:util';
import { createClient } from 'redis';

/**
 * @module utils/redis.js
 * @abstract Contains the code to setup a redis client and make same
 * available to other parts of the application.
 */

/**
 * Class for performing operations with Redis service
 */

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      throw new Error('Redis Client Error', err);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
 * Checks if connection to Redis is a success
 * @return {boolean} true if connection alive or false if not
 */

  isAlive() {
    return this.client.connected;
  }

  /**
 * returns the Redis value stored for a key
 * @key {string} key to search for in redis
 * @return {string}  value of key
 */

  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
  * store a key in Redis (with an expiration set by the duration argument)
  * @key {string} key to be saved in redis
  * @value {string} value to be asigned to key
  * @duration {number} an expiration
  * @return {undefined}  No return
  */

  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  /**
  * remove the value in Redis for a key
  * @key {string} key to be deleted
  * @return {undefined}  No return
  */
  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
