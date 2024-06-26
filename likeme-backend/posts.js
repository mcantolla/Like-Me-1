const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.put('/like/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.likes = req.body.likes;
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: 'Post eliminado' });
    } else {
      res.status(404).json({ message: 'Post no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
