const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a task name'],
        trim: true,
        maxlength: [75, 'Name cannot be more than 75 words']
    },
    allotedTo: {
        type :mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    RefProject: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    deadLine: {
        type: Date,
        required: true
    },
    Assigned: {
        type: Date,
        required: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Task" , TaskSchema)