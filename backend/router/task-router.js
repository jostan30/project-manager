const express = require('express')
const router = express.Router()
const {protect} = require("../middleware/auth-middleware");
const {AllocateTask ,deleteTask ,addUser ,removeUser,getTask}  = require('../controller/task-controller');
router.use(protect);

//getTask
router.get('/' ,getTask);

//create task 
router.post('/', AllocateTask);

//delete task 
router.delete('/' ,deleteTask);

// //add user to Task
// router.put('/add' ,addUser);

// //remove user from Task 
// router.put('/remove' ,removeUser)


module.exports = router;