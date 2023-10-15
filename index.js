const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const jobRouter = require('./routes/jobs');
const bookmarkRouter = require('./routes/bookmarks');
const dotenv = require('dotenv');



dotenv.config();
//process.env.VARIABLE_NAME


mongoose.connect(process.env.MONGOURL).then(() => console.log("Db connected")).catch((console.error()))


app.use(express.json());

app.use("/api/", authRouter);

app.use("/api/users", userRouter);

app.use("/api/jobs", jobRouter);

app.use("/api/bookmarks", bookmarkRouter);

// app.get("/api/get", (req, res) => res.send("hello Abdul!"))
app.listen(process.env.PORT, console.log("connected at 5000"));











