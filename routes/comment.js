const express = require("express");
const router = express.Router();
const { getNextId } = require("../utils/idHandler");

let comments = [];

// GET ALL
router.get("/", (req, res) => {
    res.json(comments);
});

// CREATE
router.post("/", (req, res) => {
    const { postId, content, author } = req.body;

    const newComment = {
        _id: getNextId(comments),
        postId,
        content,
        author,
        isDeleted: false
    };

    comments.push(newComment);
    res.json(newComment);
});

// UPDATE
router.put("/:id", (req, res) => {
    const index = comments.findIndex(c => c._id === req.params.id);

    if (index === -1) return res.status(404).json({ message: "Not found" });

    comments[index] = { ...comments[index], ...req.body };
    res.json(comments[index]);
});

// DELETE (soft)
router.delete("/:id", (req, res) => {
    const comment = comments.find(c => c._id === req.params.id);

    if (!comment) return res.status(404).json({ message: "Not found" });

    comment.isDeleted = true;
    res.json(comment);
});

module.exports = router;