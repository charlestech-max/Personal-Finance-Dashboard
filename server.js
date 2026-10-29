const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB URI
const dbURI = 'your-mongodb-uri-here';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define a schema
const Schema = mongoose.Schema;

// User Data Schema
const userDataSchema = new Schema({
    userId: String,
    date: Date,
    amountSpent: Number
});

// User Data Model
const UserData = mongoose.model('UserData', userDataSchema);

// Fetch user data
app.get('/api/user-data/:userId', (req, res) => {
    const userId = req.params.userId;
    UserData.find({ userId: userId }).then(data => res.json(data));
});

// Serve frontend
app.use(express.static('public'));

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});