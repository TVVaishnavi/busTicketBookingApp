import User from "../models/user";

const getUser = async (): Promise<any[]> => {
    const users: any[] = await User.find({});
    return users;
}

export default { getUser };