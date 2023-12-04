/**
 * @module utils/redis.js
 */
import { promisify } from 'node:util';
import { createClient } from 'redis';

/**
 * @class RedisClient
 * 
 * @abstract Contains the code that handles the creation of a new redis
 * client along with a set of helper methods needed to make use of it.
 * 
 * @method constructor
 * @method isAlive
 * @method get
 * @method set
 * @method del
 */
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Error: ${err}`));
    this.client.on('connect', () => console.log('Connected Successfully'));
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
