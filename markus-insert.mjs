import { init } from "./markus.mjs";
import { getEmbedding } from "./openai_emb.mjs";

const db = init();

export const create = async (product) => {
  // three random numbers in an array
  const vector = await getEmbedding(product.description);
  const insertProductAndVector = db.transaction(() => {
    const productQuery = db.prepare(`
      INSERT INTO products(name, description) VALUES (?, ?);
    `);
    const productResult = productQuery.run(product.name, product.description);
    const vssQuery = db.prepare(`
      INSERT INTO products_vss(rowid, vector) VALUES (?, ?);
    `);
    vssQuery.run(productResult.lastInsertRowid, JSON.stringify(vector));
  });
  insertProductAndVector();
};

// create({
//   name: "Test",
//   description: "This is a red test product.",
// });

// create({
//   name: "Another Test",
//   description: "This is a blue test product.",
// });

// create({
//   name: "Yet Another Test",
//   description: "This is a green test product.",
// });

export const search = async (text) => {
  const vector = await getEmbedding(text);
  const searchQuery = db.prepare(`
      WITH matching_products AS (
        SELECT rowid
        FROM products_vss
        WHERE vss_search(vector, ?)
        AND distance < 1.5
        ORDER BY distance ASC
        LIMIT 20
      )
      SELECT p.*
      FROM products p
      INNER JOIN matching_products mp ON p.id = mp.rowid;
    `);

  return searchQuery.all(JSON.stringify(vector));
};

search("This is a green product.").then((result) => {
  console.log(result);
})
