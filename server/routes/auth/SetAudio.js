const fs = require('fs');

function SetAudio(req, res, next) {
    const user = req.user;

    const oldLocation = req.files.audioFile.filepath;

    const uploadDir = `${__dirname}/../../public/audio`;
    const fileName = `${user.id}.mp3`;
    const newLocation = `${uploadDir}/${fileName}`;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.copyFile(oldLocation, newLocation, (err) => {
        if (err) console.log(err);
    });

    res.sendStatus(200);
}

module.exports = SetAudio;
