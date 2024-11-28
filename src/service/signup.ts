import User from "../models/user";
import bcrypt from "bcrypt";

interface UserData {
    name: string;
    email: string;
    password: string;
}

const createUser = async (userData: UserData): Promise<any> => {
    const { name, email, password } = userData;
    const hashPassword: string = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashPassword,
        role: "customer"
    });

    const savedUser: any = await newUser.save();
    return savedUser;
}

export default { createUser };