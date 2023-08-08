const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', (req, res) => {
  Category.findAll({
    include:[Product],
  }).then((categories)=>res.json(categories)).catch((error)=>res.status(500).json(error))
  
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where:{id:req.params.id},
    include:[Product]
  })
    .then((Category)=>res.json(Category)).catch((error)=>res.status(500).json(error))
 
 
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((Category)=>res.json(Category)).catch((error)=>res.status(500).json(error))
  

});

router.put('/:id', (req, res) => {
  Category.update(req.body,{
    where:{id:req.params.id}
  })
  .then((Category)=>res.json(Category)).catch((error)=>res.status(500).json(error))
  
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{id:req.params.id}
  })
  .then((Category)=>res.json(Category)).catch((error)=>res.status(500).json(error))
  
});

module.exports = router;
