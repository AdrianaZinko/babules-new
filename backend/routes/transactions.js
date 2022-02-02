const router = require('express').Router();
let Transaction = require('../models/transaction');


// Getting all
router.get('/', async (req, res) => {
    try {
      const transactions = await Transaction.find()
      res.json(transactions)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  // Getting One
  router.get('/:id', getTransaction, (req, res) => {
    res.json(res.transaction)
  })
  
  // Creating one
  router.post('/add', async (req, res) => {
    const transaction = new Transaction({ 
      category: req.body.category,
      type: req.body.type,
      price: req.body.price,
      date: req.body.date,
      description: req.body.description
    })
    try {
      const newTransaction = await transaction.save()
      res.status(201).json(newTransaction)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Updating One
  router.patch('/update/:id', getTransaction, async (req, res) => { 
    if (req.body.category != null) {
      res.transaction.category = req.body.category
    }
    if (req.body.type != null) {
        res.transaction.type = req.body.type
      }
      if (req.body.price != null) {
        res.transaction.price = req.body.price
      }
      if (req.body.date != null) {
        res.transaction.date = req.body.date
      }
    if (req.body.description != null) {
      res.transaction.description = req.body.description
    }
    try {
      const updatedTransaction = await res.transaction.save()
      res.json(updatedTransaction)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }     
  })
  
  // Deleting One
  router.delete('/:id', getTransaction, async (req, res) => {
    try {
      await res.transaction.remove()
      res.json({ message: 'Deleted Category' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getTransaction(req, res, next) {
    let transaction
    try {
        transaction = await Transaction.findById(req.params.id)
      if (transaction == null) {
        return res.status(404).json({ message: 'Cannot find category' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.transaction = transaction
    next()
  }
/*
router.route('/').get((req, res) => {
    Transaction.find()
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const category = req.body.category;
  const description = req.body.description;
  const type = req.body.type;
  const price = Number(req.body.price);
  const date = Date.parse(req.body.date);

  const newTransaction = new Transaction({
    category,
    description,
    type,
    price,
    date,
  });

  newTransaction.save()
  .then(() => res.json('Transaction added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Transaction.findById(req.params.id)
    .then(transaction => res.json(transaction))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json('Transaction deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Transaction.findById(req.params.id)
    .then(transaction => {
        transaction.category = req.body.category;
        transaction.description = req.body.description;
        transaction.type = req.body.type;
        transaction.price = Number(req.body.price);
        transaction.date = Date.parse(req.body.date);

        transaction.save()
        .then(() => res.json('Transaction updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;