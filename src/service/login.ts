import bcrypt from 'bcrypt';
import User from '../models/user';
import  jwt  from '../utils/jwtutils';
import  auth from '../middlewares/auth';

const login = async (email: string, password: string): Promise<string> => {
    try {
        const existingUser:any = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("user not founded");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }
        const token = jwt.generateToken(existingUser);
        return token;
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

const refreshToken = async (oldToken: string, password: string): Promise<string> => {
    try {
        const decodedToken :any= auth.verifyToken(oldToken);
        const user:any = await User.findById(decodedToken._id);
        if (!user) {
            throw new Error("User not found");
        }
        const newToken = jwt.generateToken(user);
        return newToken;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

export default{ login, refreshToken };