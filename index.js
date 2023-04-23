const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const dbconnect = require('./connection');
const port = 8080 || process.env.PORT;
dbconnect();
const loginRoute = require("./routes/loginResistraion");
const PostRoute = require("./routes/postroute");
const CheckToken = require('./helper/VerifyToken');
app.use(loginRoute);
app.use(CheckToken, PostRoute);

app.listen(port, () => {
    console.log(`server is connected to posrt ${port}}`);
})