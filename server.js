const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path')

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
const dbo = require("./db/conn");

// app.use(express.static(__dirname + "/build"));

const authRouter = require("./api/auth/auth");
const customerRouter = require("./api/customer/customer")
const projectRouter = require("./api/project/project")
const estateRouter = require("./api/estate/estate")
// const projectRouter = require("./api/project/project")
// app.use(require("./routes/record"));

app.use("/api/auth", authRouter);
app.use("/api/customers", customerRouter)
app.use("/api/project", projectRouter)
app.use("/api/estate", estateRouter)

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
