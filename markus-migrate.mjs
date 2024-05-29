import { init } from './markus.mjs';

const db = init();

const migrate = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT
    );
  `);
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS products_vss USING vss0(
      vector(1536)
    );
  `);
};

migrate();