const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYY [at] hh:mm')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema > Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYY [at] hh:mm')
    }
},
    {
        toJSON: {
            getters: true
        }
    });

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thoughts = model('Thoughts', ThoughtsSchema);

model.exports = Thoughts;