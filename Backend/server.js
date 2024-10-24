require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const adminCredentials = require('./basit-b2712-firebase-adminsdk-jrij1-16a873b97c'); // Load Firebase credentials

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(adminCredentials),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

// Your routes and MySQL connection logic here



// MySQL Database Connection //
const db = mysql.createConnection({
  host: process.env.DB_HOST,   
  user: process.env.DB_USER,   
  password: process.env.DB_PASS, 
  database: process.env.DB_Name    
});

// Connect to the MySQL database //
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected!');
});
// simple API jsut for checking database is connected or not
app.get('/',(req,res)=>{
  return res.json("i am Basit fron backend")
})

// signup API
app.post('/signup', (req, res) => {
  const { name, email, password, phone, city } = req.body;
  const query = `INSERT INTO users (name, email, password, phone, city) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [name, email, password, phone, city], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).send(err);
    }
    res.send({ message: 'User created successfully' });
  });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err || result.length === 0) {
      console.error('User not found:', err);
      return res.status(404).send({ message: 'User not found' });
    }
    const user = result[0];
    if (user.password !== password) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    res.send({ userId: user.user_id, message: 'Login successful' });
  });
});

// for contact Form //
app.post('/submit', (req, res) => {
  const { name, email, phone, description } = req.body;
  const sql = 'INSERT INTO contact_form (name, email, phone, description) VALUES (?, ?, ?, ?)';  
  db.query(sql, [name, email, phone, description], (err, result) => {  
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Form data submitted successfully');
  });
});

// checkout form API //
app.post('/checkout_form', (req, res) => {
  const { Fname, Lname, email, phone, city, address, description } = req.body;
  const sql = `INSERT INTO checkout_form (Fname, Lname, email, phone, city, address, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [Fname, Lname, email, phone, city, address, description], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Form data submitted successfully');
  });
});

// Api for fetching Logo image //
app.get('/logo_image',(req,res)=>{
   const query='SELECT * FROM logo_image'
   db.query(query,(err,result)=>{
      if(err) throw err;
      res.json(result)
   })
})
// sliderimages //
app.get('/sliderimages', (req, res) => {
  const query = 'SELECT * FROM sliderimages';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// APi for fecthing categories //
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching categories:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});
// API to fetch subcategories by categoryId //
app.get('/categories/:categoryId/subcategories', (req, res) => {
  const { categoryId } = req.params;
  const query = 'SELECT * FROM subcategories WHERE category_Id = ?';
  db.query(query, [categoryId], (err, results) => {
      if (err) {
          console.error('Error fetching subcategories:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});
// API for products//
app.get('/subcategories/:subcategoryId/products', (req, res) => {
  const { subcategoryId } = req.params;
  const query = 'SELECT * FROM products WHERE subcategory_Id = ?';
  db.query(query, [subcategoryId], (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});

// 1. POST /cart: Add product to the cart
app.post('/cart', (req, res) => {
  const { user_id, id, quantity,name,price,image_url,selectedColor} = req.body;
  // Query to check if the product is already in the cart (the id is Product-id) //
  const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND id = ?`;
  db.query(checkQuery, [user_id,id], (err, result) => {
    if (err) {
      console.error('Error checking cart:', err);
      return res.status(500).send({ message: 'Error checking cart' });
    }
    // If the product is already in the cart, update the quantity
    if (result.length > 0) {
      const updateQuery = `UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND id = ?`;
      db.query(updateQuery, [quantity, user_id, id,name,price,image_url,selectedColor ], (err, updateResult) => {
        if (err) {
          console.error('Error updating cart:', err);
          return res.status(500).send({ message: 'Error updating cart' });
        }
        return res.send({ message: 'Cart updated successfully' });
      });
    } else {
      // If the product is not in the cart, insert a new entry
      const insertQuery = `INSERT INTO cart (user_id, id, quantity,name,price ,image_url,selectedColor) VALUES (?,?,?, ?, ?,?,?)`;
      db.query(insertQuery, [user_id, id, quantity,name ,price,image_url,selectedColor], (err, insertResult) => {
        if (err) {
          console.error('Error adding to cart:', err);
          return res.status(500).send({ message: 'Error adding to cart' });
        }
        return res.send({ message: 'Product added to cart successfully' });
      });
    }
  });
});

// GET /cart: Retrieve cart items for a specific user
app.get('/cart/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT * FROM cart WHERE user_id = ?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).send('Failed to fetch cart items');
    }
    res.status(200).json(results);
  });
});

// PUT /cart/:id: Update the quantity of a product in the cart for a specific user
app.put('/cart/:id', (req, res) => {
  const { quantity, user_id } = req.body; 
  const cart_Id = req.params.id; 
  // Check that the necessary data is provided
  if (!quantity || !user_id || !cart_Id) {
    return res.status(400).send({ message: 'Invalid data provided.' });
  }
  const sql = 'UPDATE cart SET quantity = ? WHERE cart_id = ? AND user_id = ?';
  db.query(sql, [quantity, cart_Id, user_id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Cart item not found.' });
    }
    res.status(200).send({ message: 'Quantity updated successfully.' });
  });
});

// DELETE /cart/:id: Remove a product from the cart for a specific user
app.delete('/cart/:user_id/:cart_id', (req, res) => {
  const { user_id, cart_id } = req.params;
  const sql = 'DELETE FROM cart WHERE user_id = ? AND cart_id = ?';
  db.query(sql, [user_id, cart_id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to remove item from cart', error: err });
    }
    res.status(200).send({ message: 'Item removed successfully' });
  });
});
// app.get('/cart/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const [rows] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch cart items' });
//   }
// });

// Home Welcome paragraph API // 
app.get("/home_paragraphs",(req,res)=>{
  const query='SELECT * FROM home_paragraphs'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
//  this API is for fetching all products//
app.get("/products",(req,res)=>{
   const query='SELECT * FROM products'
   db.query(query,(err,result)=>{
    if(err) throw err;
    res.json(result)
   })
})
// This APi is for trnding products //
app.get("/trending_products",(req,res)=>{
  const query='SELECT * FROM trending_products'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
//  About page realted APIS //
app.get("/about",(req,res)=>{
  const query='SELECT * FROM about'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
app.get("/about_image",(req,res)=>{
  const query='SELECT * FROM about_image'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
app.get('/aboutus',(req,res)=>{
  const query= 'SELECT * FROM aboutus'
  db.query(query,(err,result)=>{
    if (err) throw err;
    res.json(result)
  })
})
app.get('/about_mission',(req,res)=>{
  const query= 'SELECT * FROM about_mission'
  db.query(query,(err,result)=>{
    if (err) throw err;
    res.json(result)
  })
})
// Services page related APIs //
app.get("/services",(req,res)=>{
  const query='SELECT * FROM services'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
app.get("/plumbers",(req,res)=>{
  const query='SELECT * FROM plumbers'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})

app.get("/map_image",(req,res)=>{
  const query='SELECT * FROM map_image'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
// Brands APis //
app.get("/brands",(req,res)=>{
  const query='SELECT * FROM brands'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})

app.get("/customer_supportoptions",(req,res)=>{
  const query='SELECT * FROM customer_supportoptions'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
  // footer APIS start //
  app.get('/contact_list',(req,res)=>{
    const query= 'SELECT * FROM contact_list'
    db.query(query,(err,result)=>{
      if (err) throw err;
      res.json(result)
    })
  })
  app.get('/footer_links', (req, res) => {
    const query = 'SELECT footer_links_list, routes FROM footer_links';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);  
    });
});

app.get('/footer_info', (req, res) => {
  const query = 'SELECT footer_info_list, routes FROM footer_info';
  db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});
app.get('/social_icons', (req, res) => {
  const query = 'SELECT icons, routes FROM social_icons';
  db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result); 
  });
});
// footer Apis end //

// this API is for videos on homepage //
app.get("/home_videos",(req,res)=>{
  const query='SELECT * FROM home_videos'
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
