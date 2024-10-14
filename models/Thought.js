const { Schema, model } = require('mongoose');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    thought: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    reactions: [reactionSchema],
},

  {
    toJSON: {
      getters: true,
  },
}
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
