require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_KEY)
const Contact = require("./backend/models/Contact")
const productRoutes = require("./backend/routes/productRoutes");
const connectDB = require("./backend/config/db");

// Initializing APP
const app = express();

// Midlewares
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API Routes
app.use("/api/products", productRoutes);

// Contacts Route
app.get("/api/contact", (req, res) => {
  res.json({ message: "This is the contact page" });
});

app.post("/api/contact", (req, res) => {
  const { fullName, email, message, city } = req.body;
  let newContact = new Contact({
    fullName, email, message, city
  })
  newContact.save();
  console.log("newContact has been saved");
  res.status(201).json({ message: "Contact saved successfully" });
});

// Stripe Integration Route
app.post("/api/payment", (req, res) => {
  const { product, token, price } = req.body;
  console.log(`Payment of ${price} is successfully Completed !!!`);

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then((customer) => {
    return stripe.charges.create({
      amount: price * 100,
      currency: "INR",
      customer: customer.id,
      receipt_email: token.email,
      description: "Processing Payment",
    });
  }).then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Package .json 
// "start": "node server.js",
//     "start:dev": "nodemon server.js",
//     "data:import": "node backend/seederScript"