// import mongoose 
import mongoose from "mongoose";

// const schema
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

// export model
export default mongoose.model('Project', Project);