const express = require("express");
const videoRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

const dataFile = "./data/videos.json";

function writeVideos(data) {
    const newData = JSON.stringify(data);
    fs.writeFileSync(dataFile, newData)

}

function readData() {
    const videoFile = fs.readFileSync(dataFile)
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
            image: body.image,
            comments: []
        }

        videoUploadData.push(newVideo);

        writeVideos(videoUploadData);

        response.status(201).json(newVideo);

    })
module.exports = videoRouter