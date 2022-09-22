const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const ytdl = require("ytdl-core")
app.use(express.json());
var youtubeThumbnail = require('youtube-thumbnail');
app.get("/", (req, res) => {
    res.json({ message: "Youtube downloader api is working " })
})

const allowedOrigins = ["http://localhost:3001", "http://localhost:3000", "http://localhost:4000","http://127.0.0.1:5500"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.get("/download", async (req, res) => {
    try {
        const url = req.query.url;
        const video_Id = await ytdl.getURLVideoID(url)
        const getinfo = await ytdl.getInfo(url)
        const thumbnail = await youtubeThumbnail(url);


        let data = {
            url: "https://www.youtube.com/embed/" + video_Id,
            info: getinfo.formats,
            thumb: thumbnail
        };
        return res.send(data)

    } catch (error) {
        return res.status(500)
    }
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})