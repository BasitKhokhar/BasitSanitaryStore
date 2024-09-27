const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'MYSQLHOST',       // Replace with your MySQL host
  user: 'MYSQLUSER',   // Replace with your MySQL username
  password: 'MYSQL_ROOT_PASSWORD', // Replace with your MySQL password
  database: 'MYSQLDATABASE'     // Replace with your MySQL database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected!');
});

// Create an API route to check the database connection
app.get('/api/check-database', (req, res) => {
  db.ping((err) => {
    if (err) {
      return res.status(500).json({ message: 'Database not connected', error: err });
    }
    res.json({ message: 'Database is connected' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
