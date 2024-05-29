const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");
let vss0;
import("sqlite-vss").then((sqliteVss) => {
  vss0 = sqliteVss.loadVss(db);
}).catch((error) => {
  console.error("Error importing 'sqlite-vss':", error);
});


db.serialize(() => {
  db.run("CREATE TABLE lorem (info TEXT, rowid INTEGER PRIMARY KEY, vss_demo VSS0)");

  /*

    create virtual table vss_demo using vss0(
  a(2)
);


    insert into vss_demo(rowid, a)
  select
    value ->> 0 as rowid,
    value ->> 1 as a
  from json_each('
    [
      [ 1, [1.0, 3.0]   ],
      [ 2, [3.0, 1.0]   ],
      [ 3, [-2.0, -2.0] ],
      [ 4, [-4.0, 1.0]  ]
    ]
  ');
  */

//   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (let i = 0; i < 10; i++) {
//     stmt.run("Ipsum " + i);
//   }
  stmt.finalize();

  // insert vector data into lorem
  db.run(`
    insert into lorem(rowid, info, vss_demo)
    select
      value ->> 0 as rowid,
      value ->> 1 as info,
      value ->> 2 as vss_demo
    from json_each('
      [
        [ 1, "Ipsum 1", [1.0, 3.0]   ],
        [ 2, "Ipsum 2", [3.0, 1.0]   ],
        [ 3, "Ipsum 3", [-2.0, -2.0] ],
        [ 4, "Ipsum 4", [-4.0, 1.0]  ]
      ]
    `);


  console.log("SELECT rowid AS id, info FROM lorem");
  console.log(db);

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    console.log(row.id + ": " + row.info + " " + row.vss_demo);
  });
});

db.close();

// [TryGhost/node-sqlite3: SQLite3 bindings for Node.js](https://github.com/TryGhost/node-sqlite3)
