// import jwt module from jsonwebtoken
import jwt from "jsonwebtoken";

// function Authenticate Access Token
export const AuthenticateAccessToken = async (req,res,next) => {
    console.log('funct AuthenticateAccessToken run')
    // create const authHeader to req authorization header in insomnia
    const authHeader = req.headers['authorization'];
    // create const token to split array number 1
    const token = authHeader.split(' ')[0];
    // show value token
    if(!token){
        res.json({ message: 'Unauthorized'});
    }
	else{
        console.log(token, 'ini token')
        jwt.verify(token, process.env.JWT_KEY, (err,decoded) => {
            // decoded is token userid from login
            console.log(decoded);
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