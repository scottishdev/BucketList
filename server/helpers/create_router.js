const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  //INDEX
  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  //FIND BY ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({_id: ObjectID(id)})
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  //POST
  router.post('/', (req, res) => {
    const newCountry = req.body;
    collection.insertOne(newCountry)
    .then(result => res.json(result.ops[0]))
  });

  //PUT
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedCountry = req.body;
    collection.findOneAndUpdate(
      {_id: ObjectID(id)},
      {$set: updatedCountry},
      {returnOriginal: false}
    )
    .then(result => res.json(result.value))
  });

  return router;

};

module.exports = createRouter;
