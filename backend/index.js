const app = require("./app.js")
const dbconnect=require("./db/db.js")
const dotenv=require("dotenv")

dotenv.config({
    path:"./.env"
})

dbconnect()
.then(()=>{
    app.listen(process.env.PORT || 8080,()=>{
        console.log("server is running",process.env.PORT);      
    })
})
.catch((err)=>{
        console.log("mongodb connection failleddd",err);
})
