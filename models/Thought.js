const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// Schema to create a thought model
function setDate(date) {
  return date.toDateString();
}

const thoughtSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
      get: setDate,
    },
      reactions: [Reaction]
  },

  {
    toJSON: {
      getters: true,
  }
}
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
