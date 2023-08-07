import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

//Import routes
import usersRoutes from './routes/users.route';
import authroutes from './routes/auth.route'

const app = express();

//settings
app.set("port",3000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use("/api/v1/users",usersRoutes);
app.use("/api/v1/auth",authroutes);

export default app;