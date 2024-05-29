// [Your Own Vector Search in 5 Minutes with SQLite, OpenAI Embeddings, and Node.js - Markus Oberlehner](https://markus.oberlehner.net/blog/your-own-vector-search-in-5-minutes-with-sqlite-openai-embeddings-and-nodejs/)

import Database from 'better-sqlite3';
import * as sqlite_vss from 'sqlite-vss';

export const init = () => {
  const db = new Database('./vector-database.db');
  db.pragma('journal_mode = WAL');
  sqlite_vss.load(db);

  return db;
};