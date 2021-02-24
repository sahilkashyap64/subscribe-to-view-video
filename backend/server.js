const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

var bcrypt = require("bcryptjs");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Tutorial = db.tutorials;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to task application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

require("./app/routes/turorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  //role insert
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  //admin user insert
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const user = new User({
        username: 'admin',
        email: 'admin@gmail.com',
        subscribed: true,
        password: bcrypt.hashSync('123456789', 8)
      });
    
    
      user.save((err, user) => {
        if (err) {
          console.log("error", err);
        }
        Role.findOne({ name: "admin" }, (err, role) => {
          if (err) {
            console.log("error", err);
          }
    
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("Admin was registered successfully!");
          });
        });
      });
    }
    
  });
  //tutorial added
  Tutorial.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Tutorial({
        title:"Course 1",
        description:"description of Course 1",
        url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
        published:true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added course 1");
      });

      new Tutorial({
        title:"Course 2",
        description:"description of Course 2",
        url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
        published:true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added course 2");
      });

    }
  });
}
