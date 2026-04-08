var express = require('express');
var router = express.Router();

const { dataProducts, dataCategories } = require('../utils/data');

// GET all products
router.get('/', function(req, res) {
  res.json(dataProducts);
});

// GET product by id
router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const product = dataProducts.find(item => item.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// POST product
router.post('/', function(req, res) {
  const { title, price, description, categoryId, images } = req.body;

  if (!title || price === undefined || !categoryId) {
    return res.status(400).json({
      message: 'title, price, categoryId are required'
    });
  }

  const category = dataCategories.find(item => item.id === categoryId);
  if (!category) {
    return res.status(400).json({
      message: 'categoryId does not exist'
    });
  }

  const newProduct = {
    id: dataProducts.length
      ? Math.max(...dataProducts.map(item => item.id)) + 1
      : 1,
    title,
    slug: title.toLowerCase().trim().replace(/\s+/g, '-'),
    price,
    description: description || '',
    category: category,
    images: Array.isArray(images) ? images : [],
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dataProducts.push(newProduct);

  res.status(201).json({
    message: 'Create product success',
    data: newProduct
  });
});

// PUT product
router.put('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const { title, price, description, categoryId, images } = req.body;

  const index = dataProducts.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let category = dataProducts[index].category;

  if (categoryId !== undefined) {
    const foundCategory = dataCategories.find(item => item.id === categoryId);
    if (!foundCategory) {
      return res.status(400).json({ message: 'categoryId does not exist' });
    }
    category = foundCategory;
  }

  dataProducts[index] = {
    ...dataProducts[index],
    title: title ?? dataProducts[index].title,
    slug: title
      ? title.toLowerCase().trim().replace(/\s+/g, '-')
      : dataProducts[index].slug,
    price: price ?? dataProducts[index].price,
    description: description ?? dataProducts[index].description,
    category: category,
    images: images ?? dataProducts[index].images,
    updatedAt: new Date().toISOString()
  };

  res.json({
    message: 'Update product success',
    data: dataProducts[index]
  });
});

// DELETE product
router.delete('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = dataProducts.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deletedProduct = dataProducts.splice(index, 1);

  res.json({
    message: 'Delete product success',
    data: deletedProduct[0]
  });
});

module.exports = router;