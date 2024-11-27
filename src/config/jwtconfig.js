const crypto = require("crypto")

//Generate random secretkeys
const secretKey = crypto.randomBytes(32).toString("hex")

module.exports = {secretKey}