var express = require('express');
var router = express.Router();

const { dataComments, dataProducts } = require('../utils/data');

function getNextId(list) {
  if (!list.length) return '1';
  const maxId = Math.max(...list.map(item => Number(item.id)));
  return String(maxId + 1);
}

// GET all comments
router.get('/', function(req, res) {
  const activeComments = dataComments.filter(item => item.isDeleted !== true);
  const deletedComments = dataComments.filter(item => item.isDeleted === true);

  res.json({
    activeComments,
    deletedComments
  });
});

// GET comment by id
router.get('/:id', function(req, res) {
  const id = req.params.id;
  const comment = dataComments.find(item => String(item.id) === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  res.json(comment);
});

// POST comment
router.post('/', function(req, res) {
  const { productId, content, author } = req.body;

  if (!productId || !content || !author) {
    return res.status(400).json({
      message: 'productId, content, author are required'
    });
  }

  const product = dataProducts.find(item => String(item.id) === String(productId));
  if (!product) {
    return res.status(400).json({
      message: 'productId does not exist'
    });
  }

  const newComment = {
    id: getNextId(dataComments),
    productId: String(productId),
    content,
    author,
    isDeleted: false,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dataComments.push(newComment);

  res.status(201).json({
    message: 'Create comment success',
    data: newComment
  });
});

// PUT comment
router.put('/:id', function(req, res) {
  const id = req.params.id;
  const { content, author, productId } = req.body;

  const index = dataComments.findIndex(item => String(item.id) === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (productId !== undefined) {
    const product = dataProducts.find(item => String(item.id) === String(productId));
    if (!product) {
      return res.status(400).json({ message: 'productId does not exist' });
    }
    dataComments[index].productId = String(productId);
  }

  dataComments[index] = {
    ...dataComments[index],
    content: content ?? dataComments[index].content,
    author: author ?? dataComments[index].author,
    updatedAt: new Date().toISOString()
  };

  res.json({
    message: 'Update comment success',
    data: dataComments[index]
  });
});

// DELETE comment -> soft delete
router.delete('/:id', function(req, res) {
  const id = req.params.id;
  const comment = dataComments.find(item => String(item.id) === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  comment.isDeleted = true;
  comment.updatedAt = new Date().toISOString();

  res.json({
    message: 'Soft delete comment success',
    data: comment
  });
});

// RESTORE comment
router.patch('/restore/:id', function(req, res) {
  const id = req.params.id;
  const comment = dataComments.find(item => String(item.id) === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  comment.isDeleted = false;
  comment.updatedAt = new Date().toISOString();

  res.json({
    message: 'Restore comment success',
    data: comment
  });
});

module.exports = router;