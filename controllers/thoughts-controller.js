const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts(req,res) {
        Thoughts.find({}).sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => { console.log(err);
        res.status(5002).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id:params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Could not find a thought with this ID'});
                return;
            }
            res.json(dbThoughtData)
        }).catch (err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

}

module.exports = thoughtController;