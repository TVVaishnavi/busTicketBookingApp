import crypto from 'crypto';

const secretKey: string = crypto.randomBytes(32).toString("hex");

export default{ secretKey };