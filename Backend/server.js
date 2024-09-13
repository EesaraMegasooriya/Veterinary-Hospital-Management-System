require('dotenv').config(); // Import dotenv
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors'); // Import cors
const app = express(); // Express app
const UserModel = require('./models/Users'); // Import user model

app.use(cors()); // Use CORS
app.use(express.json()); // Use express JSON

// Basic route to test the server
app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the server!' });
});

// MongoDB connection using environment variables for better security
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'web'  // Explicitly set the database name
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// GET request to retrieve all users
app.get('/users', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// POST request to create a user
app.post('/createUser', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // Return the updated document and run validators
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// DELETE request to delete a user by MongoDB _id
app.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id); // Use _id for deletion
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Server listens on PORT from .env or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
