const express = require("express");
const videoRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

function writeVideos () {
    const newData = JSON.stringify("./data/videosCopy.json")
    fs.writeFileSync("./data/videosCopy.json", newData)

}

function readData() {
    const videoFile = fs.readFileSync("./data/videosCopy.json")
    const videosData = JSON.parse(videoFile)
    return videosData;
}

videoRouter.get("/", (request, response) => {
    const videosData = readData();
    const videos = videosData.map((video)=>{
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        }
    })

    response.status(200).json(videos);
})

    videoRouter.get("/:videoId", (request, response) => {
       const videoData = readData();
       console.log("getting single video")
       const selectedVideo = videoData.find((video) => video.id === request.params.videoId)

       response.status(200).json(selectedVideo);
       

    })

    videoRouter.post("/", (request, response) => {
        const videoUploadData = readData();
        const body = request.body;
        const newVideo = {
            id: uuid(),
            title: body.title,
            description: body.description,
            channel: "My Super Cool Channel",
            timestamp: Date.now(),
            image:  "",
            comments: []
        }

        console.log("request body ", body);
        videoUploadData.push(newVideo);

        writeVideos(videoUploadData);

        response.status(201).json(videoUploadData);

    })
module.exports = videoRouter