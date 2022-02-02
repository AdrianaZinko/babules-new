const router = require('express').Router();
let Category = require('../models/category');

// Getting all
router.get('/', async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  // Getting One
  router.get('/:id', getCategory, (req, res) => {
    res.json(res.category)
  })
  
  // Creating one
  router.post('/add', async (req, res) => {
    const category = new Category({
      name: req.body.name,
      description: req.body.description  
    })
    try {
      const newCategory = await category.save()
      res.status(201).json(newCategory)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Updating One
  router.patch('/update/:id', getCategory, async (req, res) => {
    if (req.body.name != null) {
      res.category.name = req.body.name
    }
    if (req.body.description != null) {
      res.category.description = req.body.description
    }
    try {
      const updatedCategory = await res.category.save()
      res.json(updatedCategory)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }     
  })
  
  // Deleting One
  router.delete('/:id', getCategory, async (req, res) => {
    try {
      await res.category.remove()
      res.json({ message: 'Deleted Category' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getCategory(req, res, next) {
    let category
    try {
        category = await Category.findById(req.params.id)
      if (category == null) {
        return res.status(404).json({ message: 'Cannot find category' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.category = category
    next()
  }
/* 

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newCategory = new Category({name,description});

  newCategory.save()
    .then(() => res.json('Category added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
    .then(() => res.json('Category deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Category.findById(req.params.id)
    .then(category => {
        category.name = req.body.name;
        category.description = req.body.description; 

        category.save()
        .then(() => res.json('Category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});*/
module.exports = router;