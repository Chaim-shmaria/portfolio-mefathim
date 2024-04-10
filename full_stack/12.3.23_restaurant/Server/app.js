const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express(); 
const PORT = 8080; 

app.use(express.json());
app.use(cors());


data = [
    {
      "id": 1,
      "firstName": "Jenny",
      "lastName": "Chan",
      "phoneNumber": "333-962-7516",
      "email": "jenny.chan@email.com",
      "role": "Manager"
    },
    {
      "id": 2,
      "firstName": "Jessica",
      "lastName": "warren",
      "phoneNumber": "011-211-7516",
      "email": "jessica.warren@email.com",
      "role": "Manager"
    },
    {
      "id": 3,
      "firstName": "Tony",
      "lastName": "Frank",
      "phoneNumber": "788-962-7516",
      "email": "tony.frank@email.com",
      "role": "Manager"
    },
    {
      "id": 4,
      "firstName": "Jeremy",
      "lastName": "Clark",
      "phoneNumber": "011-962-111",
      "email": "jeremy.clark@email.com",
      "role": "Manager"
    },
    {
      "id": 5,
      "firstName": "Raymond",
      "lastName": "Edwards",
      "phoneNumber": "3231-962-7516",
      "email": "raymon.edwards@email.com",
      "role": "Manager"
    }
  ]


// SQLite database initialization
const DBSOURCE = "my-database.db";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT,
                lastName TEXT,
                phoneNumber TEXT,
                email TEXT UNIQUE,
                role TEXT,
                CONSTRAINT email_unique UNIQUE (email)
            )
        `, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table "user" created successfully.');
            }
        });
    }
});

// get data from SQLite database
app.get('/data', (req, res) => {
  db.all("SELECT * FROM user", (err, rows) => {
      if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(rows);
      }
  });
});


app.post('/new-contact', (req, res) => {
  const newContact = req.body;
  db.run(`
  INSERT INTO user (firstName, lastName, phoneNumber, email, role)
  VALUES (?, ?, ?, ?, ?)
`, [newContact.firstName, newContact.lastName, newContact.phoneNumber, newContact.email, newContact.role], (err) => {
  if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
  } else {
      res.status(201).json({ message: 'New contact added successfully' });
  }
});

})




// Delete contact by ID from SQLite database
app.delete('/delete-contact/:id', (req, res) => {
  const contactId = parseInt(req.params.id);

  db.run("DELETE FROM user WHERE id = ?", [contactId], (err) => {
      if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json({ message: 'Contact deleted successfully' });
      }
  });
});



app.listen(8080, () => {console.log("server starder on port 8080")})
