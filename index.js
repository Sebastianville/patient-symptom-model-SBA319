//! Step 1- 319
import express from "express";

//! Step 4- these are middlewares. 
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'

import mongoose from 'mongoose'

//!step 5- This is the beginning of how we are telling index we have new routers. DOn't forget to add the .js at the end
import { patientRouter } from "./routes/patient.js";
import { symptomsRouter } from "./routes/symptoms.js";

//? Step 4.5- We first created an .env file in our backend-template folder. Created the variable. 
dotenv.config()

//this helps you connect to mongoose. Await it makes the whole application to to wait till there is connection to mongoDB using Mongoose 
await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(e => console.error(e))


//!Step  1
const PORT = process.env.PORT || 4000;

const app = express()

//! Step 2: view engine- we also created a folder and inseted an index.pug in this step
app.set('views', "./views") //setting up views
app.set("view engine", "pug") 



//! Step 3: Middleware- we have to create a file with the name. In this case it is public. We can add logos if we want in this folder. static is built-in react middleware
app.use(express.static('./public'));

//! Step 4- these are middlewares as well. You want the middlewares to be activated first before it reaches the Routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
//both helmet and cors can be customized 
app.use(helmet());
app.use(cors());


//!Step  1- These are the routes
app.get('/', (req, res) => {
    res.render("index")
})

//! API Routes: Step 6- We want to tell the app that we have this new router which is coming from health.js. This is the path we are going to send the request to healthRouter. 
//todo We use the api because of the documentation in our index.pug. It states that if we want to use their code we need to add api to our endpoint.
app.use('/api/patients', patientRouter)
app.use('/api/symptoms', symptomsRouter)



//!Step  1
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));