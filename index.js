const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const videosRoute  = require("./routes/videos.js");


// app.use(express.static('public'));
app.use(cors())
app.use(express.json()); 
app.use("/videos", videosRoute );

app.listen(PORT, () => {
// console.log('working')
})

// app.get("/", (request, response) => {

// })