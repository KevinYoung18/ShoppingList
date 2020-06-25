const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find() // Note: this returns a promise
        .sort({date: -1}) //Note: sort by descending
        .then(items => res.json(items))
});

// @route GET api/items/:name
// @desc Get all items with matching name field
// @access Public
// router.get('/:name', (req, res) => {
//     Item.find(req.params) // Note: this returns a promise
//         .then(items => res.json(items))
//         .catch( err => res.status(404).json({success: false}))
// });

// @route POST api/items
// @desc Create a post
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });
    newItem.save() //Note: promise based
        .then(item => res.json(item)); //returns the item in json
});

// @route DELETE api/items/:id
// @desc delete an item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true})))
        .catch( err => res.status(404).json({success: false}))
});

module.exports = router;