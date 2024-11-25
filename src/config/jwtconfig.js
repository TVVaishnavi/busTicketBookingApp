const crypto=require("crypto")

//Generate random secretkeys
const secretkey=crypto.randomBytes(32).toString("hex")

module.exports={
    secretkey:secretkey
}