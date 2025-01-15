const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true // Refers to Project model
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', // Refers to Team model
        required: true
    },
    owners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Refers to User model (owners)
            required: true
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag', // Refers to User model (owners)
        }
    ], // Array of tags ex: 'Support', 'Urgent'

    dueDate: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed', 'Blocked'], // Task status
        // Enum for task status
        default: 'To Do'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


// Automatically update the `updatedAt` field whenever the document is updated
taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model("Task", taskSchema)