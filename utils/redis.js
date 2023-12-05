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
    this.client.on('error', (err) => {
      console.log(`Error: ${err.message}`);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * @name isAlive
   *
   * @abstract Determines whether redisClient is connected to server.
   *
   * @returns {boolean}
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * @name get
   *
   * @abstract gets the value stored with given key on redis
   *
   * @param {string} key
   *
   * @returns {*}
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * @name set
   *
   * @abstract sets the value stored with given key on redis
   *
   * @param {string} key
   * @param {number} duration
   * @param {string} value
   *
   * @returns {undefined}
   */
  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  /**
   * @name del
   *
   * @abstract deletes the value stored with given key on redis
   *
   * @param {string} key
   *
   * @returns {undefined}
   */
  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
