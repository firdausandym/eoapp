// import mongoose 
import mongoose from "mongoose";

// const schema
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

// export model
export default mongoose.model('Organization', Organization);