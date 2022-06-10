const router= require('express').Router();

const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId').post(createUser);

router.route('/:usertId/friends').post(addFriend);
router.route('/:usertId/friends/:friendId').delete(deleteFriend);

module.exports = router;