const express=require("express")
const cors = require("cors");

const studentRouter = require("./src/routes/studentsRouter")
 const projectRouter = require ("./src/routes/projectsRouter.js")
const db = require("./db")
const listendpoints = require("express-list-endpoints");



const server = express()



server.use(express.json())


server.use(cors());


 server.use("/students", studentRouter)
server.use("/projects", projectRouter)

// server.get("/", async (req,res)=>{
//    const {rows} = await db.query("SELECT * FROM project")
//    //const response = await db.query("SELECT * FROM students") res.send(response.rows)
//    res.send(rows)
// })




console.log(listendpoints(server));

server.listen(process.env.PORT, ()=>
console.log(`Server is listening to ${process.env.PORT}`))