const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getOneuser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req,res){
    try{
        const updateUser = await User.findOneAndUpdate({_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new:true}
        );
        if(!updateUser){
            return res.status(400).json({message: "not user found"});
        }
        res.status(200).json({message: "user updated!"});
    }catch(err){
        res.status(500).json(err);
    }
},

async deleteUser(req,res){
  try{
      const deleteUser = await User.findOneAndDelete({_id: req.params.userId});
      if(!deleteUser){
          return res.status(400).json({message: "No user found"});
      }
      await Thought.deleteMany({_id: {$in: deleteUser.thoughts}});
      res.status(200).json({message: "User and all toughts deleted"});
  }catch(err){
      res.status(500).json(err);
  }
},

  // Add friend to a user
  async addFriend(req, res) {
    try {
      const addFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId }},
        { new: true }
      );

      if (!addFriend) {
        return res.status(400).json({ message: 'No user found with that ID'});
      }
      res.status(200).json({ message: `you now have ${addFreind.freindCount} freind(s)!`});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend 
  async deleteFriend(req, res) {
    try {
      const deleteFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        {new: true}
      );
      console.log(deleteFriend)
      console.log(req.params.friendId)
      if(!deleteFriend){
          return res.status(400).json({message: "No user found"});
      }
      res.status(200).json(deleteFriend);
  }catch(err){
      res.status(500).json(err);
  }
}
}