var express = require('express');
var router = express.Router();

const { dataCategories, dataProducts } = require('../utils/data');

// GET all categories
router.get('/', function(req, res) {
  res.json(dataCategories);
});

// GET category by id
router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const category = dataCategories.find(item => item.id === id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
});

// POST category
router.post('/', function(req, res) {
  const { name, slug, image } = req.body;

  if (!name || !slug || !image) {
    return res.status(400).json({
      message: 'name, slug, image are required'
    });
  }

  const newCategory = {
    id: dataCategories.length
      ? Math.max(...dataCategories.map(item => item.id)) + 1
      : 1,
    name,
    slug,
    image,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dataCategories.push(newCategory);

  res.status(201).json({
    message: 'Create category success',
    data: newCategory
  });
});

// PUT category
router.put('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const { name, slug, image } = req.body;

  const index = dataCategories.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }

  dataCategories[index] = {
    ...dataCategories[index],
    name: name ?? dataCategories[index].name,
    slug: slug ?? dataCategories[index].slug,
    image: image ?? dataCategories[index].image,
    updatedAt: new Date().toISOString()
  };

  res.json({
    message: 'Update category success',
    data: dataCategories[index]
  });
});

// DELETE category
router.delete('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = dataCategories.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const deletedCategory = dataCategories.splice(index, 1);

  res.json({
    message: 'Delete category success',
    data: deletedCategory[0]
  });
});

// GET products by category id
router.get('/:id/products', function(req, res) {
  const id = parseInt(req.params.id);

  const category = dataCategories.find(item => item.id === id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const categoryProducts = dataProducts.filter(
    item => item.category && item.category.id === id
  );

  res.json({
    category,
    products: categoryProducts
  });
});

module.exports = router;