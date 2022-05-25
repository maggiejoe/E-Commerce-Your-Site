const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  ProductTag.findAll({
    include: [ Product, Tag ]
  })
  .then(tagRes => res.json(tagRes))
  .catch(err => 
    res.status(500).json(err)
  )
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id }, include: [ Product, ProductTag ]
  })
  .then(tagRes => res.json(tagRes))
  .catch(err =>
    res.status(500).json(err)
  )
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(tagRes => res.json(tagRes))
  .catch(err =>
    res.status(500).json(err)
  )
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    { 
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagRes => {
    if(!tagRes) {
      res.status(404).json({ message: 'No tag was found with this id '});
      return;
    }
    res.json(tagRes);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagRes => {
    if(!tagRes) {
      res.status(400).json({ message: 'No tag was found with this id' });
      return;
    }
    res.json(tagRes);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
