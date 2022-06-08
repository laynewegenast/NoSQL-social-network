const { User } = require('../models');
const userController = {
    // Get all users 
    getAllUsers(req, res) {
        User.find({})
            // populating thoughts
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // populating friends 
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    // Get user by id
    getUserById({ params}, res) {
        User.findOne({_id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            // return if no user is found 
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return; 
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    createUser({ body }, res) {
        User.create(body)
    }

    // updateUser()

    // deleteUser()

    // addFriend()

    // deleteFriend()


};