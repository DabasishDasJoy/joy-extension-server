const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

/* 
    MiddleWare
    * Cors
    * Body parser
*/

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

/* Middleware  end*/

app.get("/", async (req, res) => {
  res.send("Joy-Extension");
});

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mj0nqa8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // Database
    const db = client.db("Joy-Extension");

    /* ******* Collections **************** */
    const usersCollections = db.collection("users");

    /* ************** APIs ********************* */

    /*====================Utils========================= */

    /* ================Crete User================== */
    // Create user
    app.post("/users", async (req, res) => {
      const user = req.body;

      const result = await usersCollections.insertOne(user);

      res.json(result);
    });

    app.get("/users", async (req, res) => {
      const query = { email: req.query.email };
      const result = await usersCollections.findOne(query);

      res.json(result);
    });
    // Create user end

    /* ************** APIs ********************* */
  } finally {
  }
}
run().catch(console.dir);

// Database End

//server
app.listen(port, () => {
  client.connect((err) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Joy-Extension DB connected");
    }
  });
  console.log("Joy-Extension Server is running on port: ", port);
});
