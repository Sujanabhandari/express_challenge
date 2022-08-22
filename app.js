const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.send("Hello From app");
});

app.listen(port, ()=> console.log(`Server is listening on port ${port}`));

