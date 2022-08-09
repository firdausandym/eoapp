// import organization models
import Organization from "../models/organization.js";
// import user models
import User from "../models/user.js";

// function get All Organization
export const getOrganizations = async (req, res, next) => {
    console.log('func getorganization run')
    try {
        const organizations = await Organization.find();
        res.json(organizations);
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
// function get single Organization
export const getOrganizationById = async (req, res, next) => {
    try {
        const organization = await Organization.findById(req.params.id);
        res.json(organization);
        next()
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
// function Create Organization
export const saveOrganization = async (req, res, next) => {

    //console.log('func saveorganization run');
    try {
        const organization = new Organization({
            name : req.body.name,
            users : [{
                user: res.locals.userid,
                role: 'owner'
            }],
  
        })

        const savedOrganization = await organization.save();

        // create organization id to usermodel
        const update = { organization: savedOrganization.id };
        const Usermodel = await User.findById(res.locals.userid);
        console.log(Usermodel,'ini usermodel');
        console.log(update,'ini id organization baru');
        Usermodel.organizations.push({organization: savedOrganization.id});
        Usermodel.save();
        // end
        res.status(200).json(savedOrganization)
        next()
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}