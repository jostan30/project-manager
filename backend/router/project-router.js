const express = require('express');
const router =express.Router();
const {protect} = require("../middleware/auth-middleware");
const {createProject ,addUsers,getProjects ,removeUsers ,isAdmin ,getProjectById} =require("../controller/project-controller");

router.use(protect);

router.post('/' , createProject);
router.get('/',getProjects);

router.put('/add' ,addUsers); //admin access
router.put('/remove' ,removeUsers); //admin access

router.get('/:id',getProjectById);
router.post('/isAdmin' ,isAdmin);


module.exports = router;