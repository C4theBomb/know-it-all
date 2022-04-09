const fs = require('fs');

function SetAudio(req, res, next) {
    const user = req.user;

    const oldLocation = req.files.audioFile.filepath;

    // Set new auto file location to static asset folder
    const uploadDir = `${__dirname}/../../public/audio`;
    const fileName = `${user.id}.mp3`;
    const newLocation = `${uploadDir}/${fileName}`;

    // Move file from public to folder
    fs.rename(oldLocation, newLocation, (err) => {
        if (err) console.log(err);
    });

    res.send('File saved');
}

module.exports = SetAudio;
