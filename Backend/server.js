require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ipmorting all sequelize models
const { sequelize } = require('./models');
const { LogoImage, HomeParagraph, User, SliderImage, Categories, Subcategories, Products,
  TrendingProduct,OnSaleProduct, Homevideos,CustomerSupportOption,Brand,About,AboutImage,AboutUs,AboutMission,
  PaymentMethod,Service,MapImage,Plumber,ContactForm,Cart } = require('./models');


// firebase attachemnt//
// const admin = require('firebase-admin');
// const adminCredentials = require('./basit-b2712-firebase-adminsdk-jrij1-16a873b97c');
// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(adminCredentials),
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
// });
// const bucket = admin.storage().bucket();

// sequlize model based APIS start//
// just to chek seaqulzie is connected or not//
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
// Ensures table structure is updated without losing data
sequelize.sync({ alter: true })  
  .then(() => console.log("✅ Database synchronized successfully."))
  .catch(err => console.error("❌ Error synchronizing the database:", err));

  
// logo image API//
app.get('/logo_image', async (req, res) => {
  try {
    const logos = await LogoImage.findAll({ where: { id: 1 }});
    res.json(logos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// slider iamges API
app.get('/sliderimages', async (req, res) => {
  try {
    const sliderImages = await SliderImage.findAll();
    res.status(200).json(sliderImages);
  } catch (error) {
    console.error('Error fetching slider images:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Home Welcome paragraph API // 
app.get('/home_paragraphs', async (req, res) => {
  try {
    const data = await HomeParagraph.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching home paragraphs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Signup API
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;
    console.log("signup data coming from frontend",name, email, password, phone, city)
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      city
    });
    res.status(201).json({ message: 'User created successfully', userId: newUser.user_id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Login API
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ userId: user.user_id, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// APi for fecthing categories //
app.get('/categories', async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// API to fetch subcategories by categoryId //
app.get('/categories/:categoryId/subcategories', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategories.findAll({
      where: { category_id: categoryId }
    });
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});
// API for products//
app.get('/subcategories/:subcategoryId/products', async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const products = await Products.findAll({
      where: { subcategory_id: subcategoryId }
    });
    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Database error' });
  }
});
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
app.get('/', (req, res) => {
  return res.json("i am Basit fron backend")
})



// for contact Form //
app.post('/submit', async (req, res) => {
  try {
      const { name, email, phone, description } = req.body;
      if (!name || !email || !phone || !description) {
          return res.status(400).json({ error: "All fields are required" });
      }
      const newEntry = await ContactForm.create({
          name,
          email,
          phone,
          description,
      });
      res.status(201).json({ message: "Form data submitted successfully", data: newEntry });
  } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Server error" });
  }
});
// checkout form API //
app.post('/checkout_form', (req, res) => {
  const { Fname, email, phone, city, address,receipt_url } = req.body;
  const sql = `INSERT INTO checkout_form (Fname, email, phone, city, address, receipt_url) VALUES ( ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [Fname, email, phone, city, address, receipt_url], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Your Order is submitted Successfuly and in Progress');
  });
});
// 1. POST /cart: Add product to the cart
app.post('/cart', async (req, res) => {
  try {
      const { user_id, id, quantity, name, price, image_url, selectedColor } = req.body;
      // Check if the product is already in the cart
      const existingCartItem = await Cart.findOne({ where: { user_id, id } });
      if (existingCartItem) {
          // If product exists, update quantity
          await existingCartItem.update({ quantity: existingCartItem.quantity + quantity });
          return res.json({ message: "Cart updated successfully", cart: existingCartItem });
      } else {
          // If product doesn't exist, insert a new entry
          const newCartItem = await Cart.create({ user_id, id, quantity, name, price, image_url, selectedColor });
          return res.json({ message: "Product added to cart successfully", cart: newCartItem });
      }
  } catch (error) {
      console.error("Error managing cart:", error);
      return res.status(500).json({ message: "Server error", error });
  }
});

// GET /cart: Retrieve cart items for a specific user
app.get('/cart/:user_id', async (req, res) => {
  try {
      const { user_id } = req.params;
      // Fetch all cart items for the given user_id
      const cartItems = await Cart.findAll({ where: { user_id } });
      if (!cartItems.length) {
          return res.status(404).json({ message: "No items found in the cart" });
      }
      res.status(200).json(cartItems);
  } catch (error) {
      console.error("Error fetching cart items:", error);
      return res.status(500).json({ message: "Failed to fetch cart items", error });
  }
});
// PUT /cart/:id: Update the quantity of a product in the cart for a specific user
app.put('/cart/:id', async (req, res) => {
  try {
      const { quantity, user_id } = req.body;
      const cart_id = req.params.id;
      // Validate input data
      if (!quantity || !user_id || !cart_id) {
          return res.status(400).json({ message: 'Invalid data provided.' });
      }
      // Find the cart item
      const cartItem = await Cart.findOne({ where: { cart_id, user_id } });
      if (!cartItem) {
          return res.status(404).json({ message: 'Cart item not found.' });
      }
      // Update the quantity
      await cartItem.update({ quantity });
      res.status(200).json({ message: 'Quantity updated successfully.' });
  } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: 'Error updating cart item', error });
  }
});
// DELETE /cart/:id: Remove a product from the cart for a specific user
app.delete('/cart/:user_id/:cart_id', async (req, res) => {
  try {
      const { user_id, cart_id } = req.params;
      // Find the cart item
      const cartItem = await Cart.findOne({ where: { user_id, cart_id } });
      if (!cartItem) {
          return res.status(404).json({ message: 'Cart item not found.' });
      }
      // Delete the cart item
      await cartItem.destroy();
      res.status(200).json({ message: 'Item removed successfully.' });
  } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).json({ message: 'Failed to remove item from cart', error });
  }
});
//  this API is for fetching all products//
app.get('/products', async (req, res) => {
  try {
    const products = await Products.findAll();
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Database error' });
  }
});
// This APi is for trnding products //
app.get("/trending_products", async (req, res) => {
  try {
    const trendingProducts = await TrendingProduct.findAll(); // Fetch all trending products
    res.json(trendingProducts);
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ error: "Database error" });
  }
});
// APi for Onsale //
app.get("/onsale_products", async (req, res) => {
  try {
      const products = await OnSaleProduct.findAll(); 
      res.json(products);
  } catch (error) {
      console.error("Error fetching on-sale products:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
//  About page realted APIS //
app.get("/about", async (req, res) => {
  try {
      const aboutData = await About.findAll();
      res.json(aboutData);
  } catch (error) {
      console.error("Error fetching about data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/about_image", async (req, res) => {
  try {
      const images = await AboutImage.findAll(); 
      res.json(images);
  } catch (error) {
      console.error("Error fetching about_image records:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/aboutus", async (req, res) => {
  try {
      const aboutData = await AboutUs.findAll(); 
      res.json(aboutData);
  } catch (error) {
      console.error("Error fetching aboutus data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/about_mission", async (req, res) => {
  try {
      const missions = await AboutMission.findAll();
      res.json(missions);
  } catch (error) {
      console.error("Error fetching missions:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
// Services page related APIs //
app.get("/services", async (req, res) => {
  try {
      const services = await Service.findAll(); 
      res.json(services);
  } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/plumbers", async (req, res) => {
  try {
      const plumbers = await Plumber.findAll();
      res.json(plumbers);
  } catch (error) {
      console.error("Error fetching plumbers:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/map_image", async (req, res) => {
  try {
      const mapImages = await MapImage.findAll(); 
      res.json(mapImages);
  } catch (error) {
      console.error("Error fetching map images:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// Brands APis //
app.get("/brands", async (req, res) => {
  try {
      const brands = await Brand.findAll(); 
      res.json(brands);
  } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// API for customersupport options
app.get("/customer_supportoptions", async (req, res) => {
  try {
      const options = await CustomerSupportOption.findAll();
      res.json(options);
  } catch (error) {
      console.error("Error fetching customer support options:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// paymentMethods options API //
app.get("/payment_methods", async (req, res) => {
  try {
      const paymentMethods = await PaymentMethod.findAll(); 
      res.json(paymentMethods);
  } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get('/api/users/:userId', (req, res) => {
//   const { userId } = req.params;

//   const sql = 'SELECT name FROM users WHERE user_id = ?';
//   db.query(sql, [userId], (error, results) => {
//     if (error) {
//       console.error('Error fetching user name:', error);
//       return res.status(500).json({ message: 'Failed to fetch user name' });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ userName: results[0].name });
//   });
// });

app.post('/orders', (req, res) => {
  const { orderId, userId, userName, totalAmount, shippingCost, finalTotal, totalItems, orderDate } = req.body;

  const sql = `
    INSERT INTO orders (order_id, user_id, user_name, total_amount, shipping_cost, final_total, total_items, order_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [orderId, userId, userName, totalAmount, shippingCost, finalTotal, totalItems, orderDate];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error storing order:', error);
      return res.status(500).json({ message: 'Failed to store order data.' });
    }
    res.status(200).json({ message: 'Order successfully stored!' });
  });
});

// footer APIS start //
app.get('/contact_list', (req, res) => {
  const query = 'SELECT * FROM contact_list'
  db.query(query, (err, result) => {
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
app.get("/home_videos", async (req, res) => {
  try {
    const videos = await Homevideos.findAll();
    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Start the server

// Api for port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});