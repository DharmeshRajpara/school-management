const  express= require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true ,limit:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const admin= require("./routes/admin.routes")
const student=require("./routes/student.routes")
const faculty = require("./routes/faculty.routes")

app.use("/api/v1/user",admin)
app.use("/api/v1/student",student)
app.use("/api/v1/faculty",faculty)





module.exports=app
