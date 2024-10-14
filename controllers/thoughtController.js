const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.status(200).json(thought);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const updateUserThoughts = await User.findOneAndUpdate({_id: req.params.userId},
      {$addToSet:{thoughts: newThought._id}},
      {new: true}
      );

      if(!updateUserThoughts){
        return res.status(400).json({message: "Thought created but could not find a user"});
    }
    res.status(200).json({message: `Thank you ${updateUserThoughts.username}! you now have ${updateUserThoughts.thoughts.length} thoughts!`});
}catch(err){
    res.status(500).json(err);
}
},
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deleteThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      const updateUserThoughts = await User.findOneAndUpdate({ _id: req.params.userId },
      {$pull: {thoughts: req.params.thoughtId}},
      {new: true}
      )
   if(!updateUserThoughts){
    return res.status(400).json({message: "User could not be found"});
}
res.status(200).json({message: `Thought deleted, ${updateUserThoughts.username} now has ${updateUserThoughts.thoughts.length} thoughts`});
} catch(err){
res.status(500).json(err);
}
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updateThought) {
        res.status(400).json({ message: 'No thought with this id!' });
      }

      res.status(200).json({message: 'Thought updated'});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {

      const addReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { new: true }
      );

      if(!addReaction){
          return res.status(400).json({message: "Thought could not be found"});
      }
      res.status(200).json({ message: 'Reaction successfully added' });
    } catch (err) {
      res.status(500).json(err);
    }
},
  async deleteReaction(req, res) {
    try {

      const removeReaction = await Thought.findOneAndUpdate({_id: req.params.thoughtId},
        { $pull: {reactions: {reactionId: req.params.reactionId }}},
        { new: true }
      );

      if(!removeReaction){
        return res.status(400).json({message: "Thought could not be found"});
    }
    res.status(200).json({message: `Reaction removed, this thought now has ${removeReaction.reactions.length} reactions`});
}catch(err){
    res.status(500).json(err);
}
},

}