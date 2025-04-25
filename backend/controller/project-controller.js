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
            res.status(401).json({success:false , msg:"You are admin"});
        }
        if(!userExists) {
            res.status(401).json({success:false , msg:"User not found"});
        }

        const project = await Project.findOne({
            _id: projectId,
            UserInProject: { $ne: userExists._id }
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

const removeUsers = () => {
    //find and remove User
}

const MakeadminUsers = () => {
    //remove user from user in room and add to Admin 
}

module.exports = {
    createProject,
    addUsers,
    getProjects,
    removeUsers,
    MakeadminUsers
}