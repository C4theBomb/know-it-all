const fs = require('fs');

function SetAudio(req, res) {
    const { user } = req;

    const oldLocation = req.files.audioFile.filepath;

    // Set new auto file location to static asset folder
    const uploadDir = `${__dirname}/../../public/audio`;
    const fileName = `${user.id}.mp3`;
    const newLocation = `${uploadDir}/${fileName}`;

    // Move file from public to folder
    fs.rename(oldLocation, newLocation);

    res.sendStatus(200);
}

module.exports = SetAudio;
