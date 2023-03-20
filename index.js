const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const videosRoute  = require("./routes/videos.js");



app.use(cors())
app.use(express.json()); 
app.use("/videos", videosRoute );
app.use(express.static('public'))

app.listen(PORT, () => {
// console.log('working')
});

