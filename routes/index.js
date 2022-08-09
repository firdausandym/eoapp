// import express
import express from "express";
import passport from "passport";

var router = express.Router();

// import controllers Organization
import { getOrganizations, 
    getOrganizationById, 
    saveOrganization} from "../controllers/organizationController.js";
 
// import controllers User
import { getUsers, 
    getUserById, 
    saveUser,
    getToken} from "../controllers/userController.js";

// import controller project
import { createProject, 
    getProjects } from "../controllers/projectController.js";

// import authenticateaccesstoken middleware
import { AuthenticateAccessToken} from "../middleware/authenticatetoken.js";

// Route get All Organization
router.get('/organization', AuthenticateAccessToken, getOrganizations);

// Route get single Organization
router.get('/user/organization/:id', AuthenticateAccessToken, getOrganizationById);

// Route get All User
router.get('/user', AuthenticateAccessToken, getUsers);

// Route get single User
router.get('/user/:id', AuthenticateAccessToken, getUserById);

// Route CREATE User
router.post('/user', saveUser);

// route for login action without id
router.post('/login', passport.authenticate('local'), getToken);

// Route CREATE Organization
router.post('/organization', AuthenticateAccessToken, saveOrganization);

// Route Get Project
router.get('/project',AuthenticateAccessToken, getProjects)

// Route Create Project
router.post('/project',AuthenticateAccessToken, createProject);

// export router
export default router;
