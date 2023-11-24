// Import required modules
const express = require('express');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');
const { v4: uuidv4 } = require('uuid');
const router = require('./router');


// Create an Express application
const app = express();
const port = 2999;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache()); // Add a middleware to prevent caching

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/asset', express.static(path.join(__dirname, 'public/asset')));



// Configure sessions
app.use(session({
  secret: uuidv4(), 
  resave: false,
  saveUninitialized: true
}));

// Use the router for routes starting with '/route'
app.use('/route', router);

// Set the view engine to EJS
app.set('view engine', 'ejs');

//prevent from caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store'); // Prevent caching
  next();
});

// Define the home route
app.get('/', (req, res) => {
  if (!req.session.user) {
    // If the user is not authenticated, render the login page
    res.render('base', { title: 'login' });
  } else {
    // If the user is authenticated, redirect to the dashboard
    res.redirect('/route/dashboard');
  }
  const errorMessage = req.session.errorMessage;
  req.session.errorMessage = ''; // Clear the error message

  res.render('base', { errorMessage });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
