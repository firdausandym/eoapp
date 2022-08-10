// import jwt module from jsonwebtoken
import jwt from "jsonwebtoken";

// export method Authenticate Access Token
export const AuthenticateAccessToken = async (req,res,next) => {
    // create const authHeader to req authorization header in insomnia
    const authHeader = req.headers['authorization'];
    // create const token to split array number 1
    const token = authHeader.split(' ')[0];
    // show value token
    if(!token){
        res.json({ message: 'Unauthorized'});
    }
	else{
        jwt.verify(token, process.env.JWT_KEY, (err,decoded) => {
            // decoded is token userid from login
            if(err){
                res.json({ message: 'Unauthorized' });
            }
            else{ 
                res.locals.userid = decoded.user_id
                next();
            }
        });
    }
}