const express = require("express");
const stampRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//This section will help you get a list of all the records
stampRoutes.route("/stamp").get((req, res) => {
  let db_connect = dbo.getDb("aaronCollections");
  db_connect
    .collection("stamps")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
stampRoutes.route("/stamp/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("stamps").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
stampRoutes.route("/stamp/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    date: req.body.date,
    country: req.body.country,
    subject: req.body.subject,
    stampImage: null,
  };
  db_connect.collection("stamps").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
stampRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      date: req.body.date,
      country: req.body.country,
      subject: req.body.subject,
    },
  };
  db_connect
    .collection("stamps")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
stampRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("stamps").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help upload an image
const upload = require("../utilities/upload");
const singleUpload = upload.single("image");

stampRoutes.route("/stamp/:id/add-image").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
  });

  const updateValue = { stampImage: req.file.location };

  db_connect
    .collection("stamps")
    .updateOne(myquery, updateValue, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = stampRoutes;
