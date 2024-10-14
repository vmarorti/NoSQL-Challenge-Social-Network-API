const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getAllThoughts);

router.route('/:thoughtId').get(getOneThought).put(updateThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/:userId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
