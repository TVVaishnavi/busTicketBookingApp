const crypto=require("crypto")

//Generate random secretkey
const secretkey=crypto.randomBytes(32).toString("hex")

module.exports={
    secretkey:secretkey
}