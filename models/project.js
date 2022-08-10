// import mongoose 
import mongoose from "mongoose";

// create project schema
const Project = new mongoose.Schema({
    organization : String,
    name: String,
    description: String,
    users: [{
        user: String,
        role: String, 
        Invited: {type: Date, default: Date.now}
       }],
    createdby: String,
}, { timestamps: { createdAt: 'created', updatedAt : 'updated' }});

// export project model
export default mongoose.model('Project', Project);