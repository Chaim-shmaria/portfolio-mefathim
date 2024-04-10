var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName text, 
            lastName text, 
            phoneNumber text,
            email text UNIQUE, 
            Role text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (firstName,lastName,phoneNumber, email,Role ) VALUES (?,?,?)'
                db.run(insert, ["gershon ","Clark","054-6932569","jeremy.clark@email.com","Manager"])
                db.run(insert, ["david" ,"Edwards","052-3698592","raymon.edwards@email.com", "Waiter"])
            }
        });  
    }
});


module.exports = db