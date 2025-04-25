const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a project name'],
        trim: true,
        maxlength: [75, 'Name cannot be more than 75 words']
    },
    admin: [{
        type :mongoose.Schema.Types.ObjectId,
        ref :'User'
    }],
    UserInProject: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startLine: {
        type: Date,
        required:true
    },
    deadLine: {
        type: Date,
        required: true   
    }
});


module.exports = mongoose.model('Project', ProjectSchema);