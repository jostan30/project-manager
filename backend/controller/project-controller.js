const mongoose = require('mongoose');
const User = require("../models/User");
const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        //create Project and become Admin by default
        const user = await User.findById(req.user.id);

        const { name, startLine, deadLine } = req.body;
        const project = await Project.create({
            name: name,
            startLine: startLine,
            deadLine: deadLine,
            admin: user._id
        })
        res.status(201).json({
            success:true,
            project:project,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false , msg :"Server Side Error"
        })
    }

}

const getProjects = async (req,res) => {
    try {
        //get shared and personal Projects
        const user = await User.findById(req.user.id);

        const personalProjects = await Project.find({admin : user._id});
        const sharedProjects = await Project.find({UserInProject : user._id});

       if(!personalProjects && !sharedProjects) {
            res.status(401).json({success:false,personalProjects:personalProjects , sharedProjects:sharedProjects , msg : "User has no projects" });
       }

       res.status(201).json({success:true ,personalProjects:personalProjects , sharedProjects:sharedProjects });

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false , msg :"Server Side Error"});
    }
    
}

const addUsers =async (req,res) => {
    try {
        //add User to the room
        const user = await User.findById(req.user.id);
        const {email ,projectId }  =req.body;
        console.log(user)
        const userExists = await User.findOne({email :email});
        console.log(userExists);

        if(userExists._id.equals(user._id)) {
            return res.status(401).json({success:false , msg:"You are admin"});
        }
        if(!userExists) {
            return res.status(401).json({success:false , msg:"User not found"});
        }

        const project = await Project.findOne({
            _id: projectId,
            UserInProject: { $ne: userExists._id }   //doesnt allow same user to be added to the project
          });
          
          if (!project) {
            return res.status(400).json({ success: false, msg: "User already in project or project not found" });
          }
        project.UserInProject.push(userExists._id);
        await project.save();

        res.status(201).json({success:true , project:project});
    } catch (error) {
        console.error(error);
        res.status
    }
    
    
}

const removeUsers = async (req, res) => {
    try {
        const { projectId, targetUserId } = req.body;

        const project = await Project.findOne({ _id: projectId });

        if (!project) {
            return res.status(404).json({ success: false, msg: "Project not found" });
        }

        // Check if the requester is an admin
        const isAdmin = project.admin.some(adminId => adminId.toString() === req.user.id);
        if (!isAdmin) {
            return res.status(403).json({ success: false, msg: "Only admin can remove users" });
        }
        if ( isAdmin &&  req.user.id === targetUserId) {
            return res.status(402).json({ success: false, msg: "You can cannot delete yourself" });
        }


        // Remove targetUserId from UserInProject array
        project.UserInProject = project.UserInProject.filter(
            (user) => user.toString() !== targetUserId
        );

        await project.save();

        return res.status(200).json({ success: true, msg: "User removed from project" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

const isAdmin = async (req,res) =>{
    try {
        const {projectId} =req.body ;
        const project = await Project.findOne({ _id: projectId });

        if (!project) {
            return res.status(404).json({ success: false, msg: "Project not found" });
        }
        const isAdmin = project.admin.some(adminId => adminId.toString() === req.user.id);
        if (!isAdmin) {
            return res.status(403).json({ success: true, isAdmin:isAdmin });
        }
        return res.status(201).json({ success: true, isAdmin:isAdmin});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}

module.exports = {
    createProject,
    addUsers,
    getProjects,
    removeUsers,
    isAdmin
}