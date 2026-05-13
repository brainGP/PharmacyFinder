const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send("running");

});

app.listen(3000, ()=>{
    console.log("server running on 3000");
})
