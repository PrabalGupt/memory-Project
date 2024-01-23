import jwt from 'jsonwebtoken'

// middleware is used to check if a user is authorized to perform a task 
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;