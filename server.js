require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")


connectToDB()   // function call
app.listen(3000, ()=>{
    console.log("server is  running on port")
})