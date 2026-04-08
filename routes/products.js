var express = require('express');
var router = express.Router();

const { dataProducts, dataCategories } = require('../utils/data');

// Hàm lấy ID lớn nhất + 1, lưu kiểu string
function getNextId(list) {
  if (!list.length) return '1';
  const maxId = Math.max(...list.map(item => Number(item.id)));
  return String(maxId + 1);
}

// GET all products
router.get('/', function(req, res) {
  const activeProducts = dataProducts.filter(item => item.isDeleted !== true);
  const deletedProducts = dataProducts.filter(item => item.isDeleted === true);

  res.json({
    activeProducts,
    deletedProducts
  });
});

// GET product by id
router.get('/:id', function(req, res) {
  const id = req.params.id;
  const product = dataProducts.find(item => String(item.id) === id);

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

  const category = dataCategories.find(
    item => String(item.id) === String(categoryId)
  );

  if (!category) {
    return res.status(400).json({
      message: 'categoryId does not exist'
    });
  }

  const newProduct = {
    id: getNextId(dataProducts),
    title,
    slug: title.toLowerCase().trim().replace(/\s+/g, '-'),
    price,
    description: description || '',
    category: category,
    images: Array.isArray(images) ? images : [],
    isDeleted: false,
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
  const id = req.params.id;
  const { title, price, description, categoryId, images } = req.body;

  const index = dataProducts.findIndex(item => String(item.id) === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let category = dataProducts[index].category;

  if (categoryId !== undefined) {
    const foundCategory = dataCategories.find(
      item => String(item.id) === String(categoryId)
    );

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

// DELETE product -> soft delete
router.delete('/:id', function(req, res) {
  const id = req.params.id;
  const product = dataProducts.find(item => String(item.id) === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.isDeleted = true;
  product.updatedAt = new Date().toISOString();

  res.json({
    message: 'Soft delete product success',
    data: product
  });
});

// RESTORE product
router.patch('/restore/:id', function(req, res) {
  const id = req.params.id;
  const product = dataProducts.find(item => String(item.id) === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.isDeleted = false;
  product.updatedAt = new Date().toISOString();

  res.json({
    message: 'Restore product success',
    data: product
  });
});

module.exports = router;