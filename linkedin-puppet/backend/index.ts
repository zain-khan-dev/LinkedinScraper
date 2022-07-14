import express from "express"
import LinkedinFetch from "./linkedin"
import {buildURL} from "./utils"
import cors from "cors"


const app = express()

const PORT = 8080

app.use(cors())

app.use(express.json())
const linkedin = new LinkedinFetch()


app.use(express.urlencoded({"extended":false}))

app.post("/login", async (req , res)=>{

    const {username, password} = req.body
    console.log(req.body)
    console.log(username, password)
    try {
        await linkedin.login(username, password)
    }
    catch {
        return res.status(401).send("Failed to authenticate")
    }
    
    return res.send("Logged In")
})


app.post("/fetchCompany", async (req, res)=> {

    const {keyword} = req.body
    const info = await linkedin.fetchInfo(buildURL("COMPANIES",keyword), "COMPANIES")
    res.json({"result":info})
    
})

app.post("/fetchPerson", async (req, res)=>{

    const {keyword} = req.body

    const info = await linkedin.fetchInfo(buildURL("PEOPLE",keyword), "PEOPLE")
    return res.json({"result":info})

})

app.get("/close", async (req, res)=>{
    linkedin.closeBrowser()
})



app.listen(PORT, ()=>{
    console.log(`The server is running at port ${PORT}`)
})