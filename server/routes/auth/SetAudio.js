const fs = require('fs');

function SetAudio(req, res, next) {
    const user = req.user;

    const oldLocation = req.files.audioFile.filepath;

    const uploadDir = `${__dirname}/../../public/audio`;
    const fileName = `${user.userID}.mp3`;
    const newLocation = `${uploadDir}/${fileName}`;

    fs.rename(oldLocation, newLocation, function (err) {
        if (err) {
            console.log(err);
        }
    });

    res.send('File saved');
}

module.exports = SetAudio;
