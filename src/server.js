const express = require("express")
const app = express()
const PORT = process.env.PORT||3000
const cors = require("cors")
const signUpRouter = require("./Routes/signup")
const bodyParser = require("body-parser")
const createAdminAccount = require("./admin")
const loginRouter = require("./Routes/login")
const userRouter = require("./Routes/user")
const busRouter = require("./Routes/bus")
const {logger} = require("./middlewares/handlelog")
const {blocker} = require("./middlewares/handlerror")

app.use(bodyParser.json())
app.use(cors())
app.use(logger)

createAdminAccount()

app.use("/",signUpRouter)
app.use("/auth", loginRouter, userRouter, busRouter)


app.use(blocker)
app.listen(PORT,  ()=>{
    console.log('server is running')
})