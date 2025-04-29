const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

const AllocateTask = async (req, res) => {
    //admin allocate tasks to user
    try {
        const { name, allotedTo, RefProject, deadLine } = req.body;
        const project = await Project.findById({ _id :RefProject });

        if (!project) {
            return res.status(401).json({ success: false, msg: "Project Not found" });
        }

        //Check if user is part of the Project
        const isUserInProject = project.UserInProject.some(
            (user) => user.toString() === allotedTo
        );
        
        if (!isUserInProject) {
            return res.status(403).json({ success: false, msg: "User not in project" });
        }

        const task = await Task.create({
            name: name,
            allotedTo:allotedTo,
            RefProject:RefProject,
            deadLine:deadLine,
            Assigned:Date.now()
        })
        res.status(201).json({
            success: true,
            task: task,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const {taskId} =req.body;
        const task = await Task.findById({_id :taskId});
        if(!task) {
            return res.status(404).json({success:false , msg: "Task Not found"});
        }
        await Task.deleteOne(task);
        return res.status(201).json({success:true ,msg: "Task Deleted"});        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.find({allotedTo:req.user._id});
        return res.status(201).json({success:true ,task:task});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}

module.exports = {
    AllocateTask,
    deleteTask,
    getTask
}