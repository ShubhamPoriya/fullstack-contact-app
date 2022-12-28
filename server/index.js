const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URI = process.env.DB_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });

app.listen(8080, () => {
  console.log("server running on port 8080");
});

const contactSchema = {
  name: String,
  email: String,
  phone: Number,
};

const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/post", (req, res) => {
  const { name, email, phone } = req.body;
  Contact.insertMany({
    name: name,
    email: email,
    phone: phone,
  })
    .then(() => {
      console.log("Contact saved successfully!");
      res.send("Data saved");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/api/get", (req, res) => {
  Contact.find({}).then((data) => {
    res.send(data);
  });
});

app.get("/api/get/:_id", (req, res) => {
  const { _id } = req.params;
  Contact.findById({ _id }).then((data) => {
    res.send(data);
  });
});

app.put("/api/update/:_id", (req, res) => {
  const { _id } = req.params;
  const { name, email, phone } = req.body;
  Contact.findByIdAndUpdate(
    { _id },
    {
      name: name,
      email: email,
      phone: phone,
    }
  )
    .then((data) => {
      console.log("Contact Updat Succesfully!");
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/api/remove/:_id", (req, res) => {
  const { _id } = req.params;
  Contact.findByIdAndDelete({ _id })
    .then(() => {
      console.log("Contact Deleted Succesfully!");
      res.send("Data Deleted");
    })
    .catch((error) => {
      console.log(error);
    });
});
