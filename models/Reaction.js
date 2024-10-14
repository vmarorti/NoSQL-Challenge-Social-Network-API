const { Schema, Types } = require('mongoose');

function setDate(date){
  return date.toDateString();
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength:280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
      get: setDate
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
