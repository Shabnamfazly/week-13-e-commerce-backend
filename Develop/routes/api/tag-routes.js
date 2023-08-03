const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag
  .findAll({
    include: [Product]
  })
  .then(TagDataDB => res.json(TagDataDB))
  .catch(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag
    .findOne({
      where: { id: req.params.id },
      include: [Product]
    })
    .then(TagDataDB => {
      if (!TagDataDB) {
        res.status(404).json({ message: "Tag with this id does not exist." });
        return;
      }
      res.json(TagDataDB)
    })
    .catch(err => {
      console.log(error);
      res.status(500).json(err);
    });
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag
  .create(req.body)
  .then(TagDataDB => res.json(TagDataDB))
  .catch(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag
  .update(req.body, {
    where: { id: req.params.id }
  })
  .then(TagDataDB => {
    if (!TagDataDB) {
      res.status(404).json({ message: 'Tag with this id does not exist.' });
      return;
    }
    res.json({ message: 'Tag updated .' });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then(TagDataDB => {
      if (!TagDataDB) {
        res.status(404).json({ message: 'Tag with this id does not exist.' });
        return;
      }
      res.json({ message: 'Tag deleted .' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;
