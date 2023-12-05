/**
 * @module utils/db.js
 */
import { MongoClient } from 'mongodb';

/**
 * @class DBClient
 *
 * @abstract Contains the code that sets up the DB connection
 *
 *
 */
class DBClient {
  constructor() {
    const HOST = process.env.DB_HOST || '127.0.0.1';
    const PORT = process.env.DB_PORT || '27017';
    const DB_NAME = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${HOST}:${PORT}`;
  }
}