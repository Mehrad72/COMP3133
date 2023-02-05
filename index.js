const express = require('express');
const mongoose = require('mongoose');
const app = express();
const database = require('./schemas/resturant.js');
const restaurants = database;

const DB_URL = 'mongodb+srv://mehrad72:yZCk4KpLViZgXQP5@data-base.6fusqhj.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


app.get('/restaurants', (req, res) => {
    restaurants.find({}, (err, restaurants) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(restaurants);
    });
  });

  app.get("/restaurants/cuisine/:cuisine", (req, res) => {
    restaurants.find({ cuisine: req.params.cuisine }, (error, restaurants) => {
      if (error) {
        res.status(500).send(error);
      } else if (!restaurants || restaurants.length === 0) {
        res.status(404).send("No restaurants found with this cuisine");
      } else {
        res.send(restaurants);
      }
    });
  });

  app.get("/restaurants", (req, res) => {
    const sortBy = req.query.sortBy;
    let sortOrder = 1;
  
    if (sortBy === "DESC") {
      sortOrder = -1;
    }
  
    restaurants.find({})
      .select("id cuisines name city restaurant_id")
      .sort({ restaurant_id: sortOrder })
      .exec((err, result) => {
        if (err) return res.status(400).send(err);
  
        const selectedColumns = result.map((restaurant) => ({
          id: restaurant.id,
          cuisines: restaurant.cuisine,
          name: restaurant.name,
          city: restaurant.city,
          restaurant_id: restaurant.restaurant_id,
        }));
  
        res.json(selectedColumns);
      });
  });

app.listen(3000, function() {
  console.log('App listening on port 3000');
});
