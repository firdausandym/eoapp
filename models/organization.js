// import mongoose 
import mongoose from "mongoose";

// create organization schema
const Organization = new mongoose.Schema({
    name: String,
    users: [{
        user: String,
        role: String, 
        Invited: {type: Date, default: Date.now}
       }],
    projects: [{
        project: String
       }],    
}, { timestamps: { createdAt: 'created', updatedAt : 'updated' }});

// export organization model
export default mongoose.model('Organization', Organization);