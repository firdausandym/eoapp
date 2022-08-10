// import project model
import Project from "../models/project.js";
// import organization model
import Organization from "../models/organization.js";
// import user model
import User  from "../models/user.js";

// function get All projects
export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.json(projects);
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// function create project
export const createProject = async (req, res, next) => {
    try {
        const project = new Project({
            organization : req.body.organization,
            name: req.body.name,
            description: req.body.description,
            users : [{
                user: res.locals.userid,
                role: 'owner'
            }],
            createdby: req.body.createdby,
        })
        
        const createdproject = await project.save();

        // create project to organization model
        const Organizationmodel = await Organization.findById(req.body.organization);
        Organizationmodel.projects.push({project: createdproject.id});
        Organizationmodel.save();
        // end
        // create project to user model
        const Usermodel = await User.findById(res.locals.userid);
        Usermodel.projects.push({project: createdproject.id});
        Usermodel.save();
        // end
        res.status(201).json(createdproject);

    } catch (error) {

        res.status(400).json({message: error.message});
    }
}